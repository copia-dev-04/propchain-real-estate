//! # oracle
//!
//! Token price oracle for PropChain.
//!
//! ## Responsibilities
//!
//! 1. Fetch the latest property valuation for each registered property from an
//!    off-chain REST API (configurable via `VALUATION_API_URL`).
//! 2. Compute the new token price: `price = total_value / total_tokens`.
//! 3. Submit a `updatePrice(propertyId, newPrice)` transaction to the
//!    `PropertyRegistry` smart contract on-chain.
//!
//! ## Configuration (environment variables)
//!
//! | Variable | Description |
//! |---|---|
//! | `RPC_URL` | EVM JSON-RPC endpoint (e.g. Polygon, Base, or local Hardhat node) |
//! | `DEPLOYER_PRIVATE_KEY` | Hex-encoded private key of the oracle wallet |
//! | `REGISTRY_CONTRACT_ADDRESS` | Deployed `PropertyRegistry` contract address |
//! | `VALUATION_API_URL` | Base URL of the property valuation REST API |
//!
//! ## Usage
//!
//! ```bash
//! propchain-tools oracle --interval 3600
//! propchain-tools oracle --once
//! ```

use std::time::Duration;

use ethers::{
    contract::abigen,
    middleware::SignerMiddleware,
    providers::{Http, Provider},
    signers::{LocalWallet, Signer},
    types::{Address, U256},
};
use reqwest::Client;
use rust_decimal::Decimal;
use rust_decimal_macros::dec;
use serde::{Deserialize, Serialize};
use tracing::{error, info, warn};

use crate::{PropchainError, Result};

// ---------------------------------------------------------------------------
// ABI binding for PropertyRegistry (minimal — only the functions we call)
// ---------------------------------------------------------------------------

// Generates a type-safe Rust binding for the updatePrice function.
// In a real project this would point to the compiled ABI JSON artifact.
abigen!(
    PropertyRegistry,
    r#"[
        function updatePrice(string calldata propertyId, uint256 newPrice) external
        function getAllProperties() external view returns ((string,address,bytes32,uint256,uint256,uint256,bool)[])
    ]"#
);

// ---------------------------------------------------------------------------
// API types
// ---------------------------------------------------------------------------

/// Response shape from the valuation API
#[derive(Debug, Deserialize)]
pub struct ValuationResponse {
    /// Off-chain property ID matching PropChain's DB (e.g. "marina-heights-tower")
    pub property_id: String,

    /// Current total valuation in AED (decimal string to avoid float precision issues)
    pub total_value_aed: String,

    /// Total number of tokens issued for this property
    pub total_tokens: u64,

    /// ISO-8601 timestamp of the valuation
    pub valued_at: String,
}

/// A single price update ready to be submitted on-chain
#[derive(Debug, Clone, Serialize)]
pub struct PriceUpdate {
    pub property_id: String,
    pub new_price_aed: Decimal,
    /// Price scaled to 18-decimal wei-like units for the contract
    pub new_price_wei: U256,
}

// ---------------------------------------------------------------------------
// Oracle client
// ---------------------------------------------------------------------------

/// Stateful oracle client — holds HTTP and EVM connections
pub struct OracleClient {
    http:             Client,
    valuation_api_url: String,
    rpc_url:          String,
    private_key:      String,
    registry_address: Address,
}

impl OracleClient {
    /// Create a new oracle client from environment variables.
    ///
    /// Reads: `RPC_URL`, `DEPLOYER_PRIVATE_KEY`, `REGISTRY_CONTRACT_ADDRESS`,
    /// `VALUATION_API_URL`.
    pub fn from_env() -> Result<Self> {
        let rpc_url = std::env::var("RPC_URL")
            .map_err(|_| PropchainError::Config("RPC_URL not set".into()))?;

        let private_key = std::env::var("DEPLOYER_PRIVATE_KEY")
            .map_err(|_| PropchainError::Config("DEPLOYER_PRIVATE_KEY not set".into()))?;

        let registry_raw = std::env::var("REGISTRY_CONTRACT_ADDRESS")
            .map_err(|_| PropchainError::Config("REGISTRY_CONTRACT_ADDRESS not set".into()))?;

        let registry_address: Address = registry_raw
            .parse()
            .map_err(|_| PropchainError::Config("Invalid REGISTRY_CONTRACT_ADDRESS".into()))?;

        let valuation_api_url = std::env::var("VALUATION_API_URL")
            .unwrap_or_else(|_| "https://api.propchain.io/v1/valuations".into());

        Ok(Self {
            http: Client::builder()
                .timeout(Duration::from_secs(30))
                .build()
                .map_err(PropchainError::Http)?,
            valuation_api_url,
            rpc_url,
            private_key,
            registry_address,
        })
    }

    // -----------------------------------------------------------------------
    // Step 1 — fetch valuations from REST API
    // -----------------------------------------------------------------------

    /// Fetch the latest valuations for all properties from the off-chain API
    pub async fn fetch_valuations(&self) -> Result<Vec<ValuationResponse>> {
        let url = format!("{}/all", self.valuation_api_url);
        info!(url = %url, "Fetching property valuations");

        let response = self
            .http
            .get(&url)
            .send()
            .await?
            .error_for_status()?
            .json::<Vec<ValuationResponse>>()
            .await?;

        info!(count = response.len(), "Received valuation data");
        Ok(response)
    }

    // -----------------------------------------------------------------------
    // Step 2 — compute new on-chain prices
    // -----------------------------------------------------------------------

    /// Convert raw valuation API responses into on-chain price updates
    pub fn compute_price_updates(&self, valuations: &[ValuationResponse]) -> Vec<PriceUpdate> {
        valuations
            .iter()
            .filter_map(|v| {
                let total_value: Decimal = v.total_value_aed.parse().ok()?;
                if v.total_tokens == 0 {
                    warn!(property_id = %v.property_id, "Skipping — total_tokens is 0");
                    return None;
                }

                let price_aed = (total_value / Decimal::from(v.total_tokens)).round_dp(2);

                // Scale to 18 decimal places for the Solidity contract
                // e.g. AED 1000.00 → 1_000_000_000_000_000_000_000 (1000 × 10^18)
                let scale    = dec!(1_000_000_000_000_000_000); // 10^18
                let price_scaled = price_aed * scale;
                let price_str    = price_scaled.to_string();
                // Strip decimal portion (Decimal type may add ".00…")
                let price_int_str = price_str.split('.').next().unwrap_or("0");
                let new_price_wei = U256::from_dec_str(price_int_str).ok()?;

                Some(PriceUpdate {
                    property_id:   v.property_id.clone(),
                    new_price_aed: price_aed,
                    new_price_wei,
                })
            })
            .collect()
    }

    // -----------------------------------------------------------------------
    // Step 3 — submit on-chain transactions
    // -----------------------------------------------------------------------

    /// Submit all price updates to the `PropertyRegistry` contract
    pub async fn submit_price_updates(&self, updates: &[PriceUpdate]) -> Result<()> {
        if updates.is_empty() {
            info!("No price updates to submit");
            return Ok(());
        }

        // Connect to RPC
        let provider = Provider::<Http>::try_from(self.rpc_url.as_str())
            .map_err(|e| PropchainError::Evm(e.to_string()))?;

        let chain_id = provider
            .get_chainid()
            .await
            .map_err(|e| PropchainError::Evm(e.to_string()))?
            .as_u64();

        // Load signing wallet
        let wallet: LocalWallet = self
            .private_key
            .parse::<LocalWallet>()
            .map_err(|e| PropchainError::Evm(e.to_string()))?
            .with_chain_id(chain_id);

        let client = std::sync::Arc::new(SignerMiddleware::new(provider, wallet));
        let registry = PropertyRegistry::new(self.registry_address, client);

        for update in updates {
            info!(
                property_id = %update.property_id,
                price_aed   = %update.new_price_aed,
                "Submitting price update"
            );

            match registry
                .update_price(update.property_id.clone(), update.new_price_wei)
                .send()
                .await
            {
                Ok(pending_tx) => {
                    match pending_tx.await {
                        Ok(Some(receipt)) => {
                            info!(
                                property_id = %update.property_id,
                                tx_hash     = ?receipt.transaction_hash,
                                "Price updated on-chain"
                            );
                        }
                        Ok(None) => {
                            warn!(property_id = %update.property_id, "Transaction dropped from mempool");
                        }
                        Err(e) => {
                            error!(property_id = %update.property_id, error = %e, "Transaction failed");
                        }
                    }
                }
                Err(e) => {
                    error!(property_id = %update.property_id, error = %e, "Failed to send transaction");
                }
            }
        }

        Ok(())
    }

    // -----------------------------------------------------------------------
    // Convenience: run one full cycle
    // -----------------------------------------------------------------------

    /// Fetch → compute → submit in a single call
    pub async fn run_once(&self) -> Result<()> {
        let valuations = self.fetch_valuations().await?;
        let updates    = self.compute_price_updates(&valuations);
        self.submit_price_updates(&updates).await?;
        Ok(())
    }

    /// Run the oracle on a repeating interval (seconds)
    pub async fn run_loop(&self, interval_secs: u64) -> Result<()> {
        info!(interval_secs, "Starting oracle loop");
        loop {
            if let Err(e) = self.run_once().await {
                error!(error = %e, "Oracle cycle failed — will retry next interval");
            }
            tokio::time::sleep(Duration::from_secs(interval_secs)).await;
        }
    }
}
