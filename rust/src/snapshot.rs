//! # snapshot
//!
//! On-chain holder snapshot tool for PropChain.
//!
//! ## Purpose
//!
//! Reads all `Transfer` events emitted by a `PropertyToken` ERC-20 contract
//! and reconstructs the current token balances for every holder.  The
//! resulting snapshot is used to:
//!
//! - Verify the rental yield distribution produced by `PropertyToken.depositYield()`
//! - Generate CSV reports for the property manager / compliance team
//! - Produce an off-chain allowlist diff (new addresses that need KYC approval)
//!
//! ## Usage
//!
//! ```bash
//! propchain-tools snapshot \
//!     --contract 0xYourTokenAddress \
//!     --rpc      https://polygon-rpc.com \
//!     --output   snapshot.json
//! ```
//!
//! ## Configuration (environment variables)
//!
//! | Variable | Description |
//! |---|---|
//! | `RPC_URL` | EVM JSON-RPC endpoint (overridden by `--rpc` flag) |

use std::collections::HashMap;

use ethers::{
    contract::abigen,
    providers::{Http, Middleware, Provider},
    types::{Address, Filter, H256, U256},
};
use serde::{Deserialize, Serialize};
use tracing::{info, warn};

use crate::{PropchainError, Result};

// ---------------------------------------------------------------------------
// ABI binding — ERC-20 Transfer event
// ---------------------------------------------------------------------------

abigen!(
    ERC20Token,
    r#"[
        event Transfer(address indexed from, address indexed to, uint256 value)
        function totalSupply() external view returns (uint256)
        function balanceOf(address account) external view returns (uint256)
        function decimals() external view returns (uint8)
        function symbol() external view returns (string)
    ]"#
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/// A single holder entry in the snapshot
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HolderEntry {
    /// Holder's Ethereum address (checksummed hex)
    pub address: String,

    /// Token balance as a raw integer (no decimals applied)
    pub balance: String,

    /// Human-readable balance (balance / 10^decimals)
    pub balance_formatted: String,

    /// Percentage of total supply held (0–100, 2 dp)
    pub share_pct: f64,
}

/// Full snapshot output
#[derive(Debug, Serialize, Deserialize)]
pub struct Snapshot {
    /// Token contract address
    pub contract_address: String,

    /// ERC-20 token symbol
    pub symbol: String,

    /// Total supply (raw integer string)
    pub total_supply: String,

    /// Block number at which the snapshot was taken
    pub snapshot_block: u64,

    /// All non-zero holders, sorted descending by balance
    pub holders: Vec<HolderEntry>,

    /// Total number of unique holders
    pub holder_count: usize,
}

// ---------------------------------------------------------------------------
// Snapshot builder
// ---------------------------------------------------------------------------

/// Build a full holder snapshot by replaying Transfer events
///
/// # Arguments
///
/// * `rpc_url`         – JSON-RPC endpoint URL
/// * `token_address`   – Deployed `PropertyToken` contract address
/// * `from_block`      – Start block for the event scan (use 0 for genesis)
pub async fn build_snapshot(
    rpc_url: &str,
    token_address: Address,
    from_block: u64,
) -> Result<Snapshot> {
    let provider = Provider::<Http>::try_from(rpc_url)
        .map_err(|e| PropchainError::Evm(e.to_string()))?;

    let latest_block = provider
        .get_block_number()
        .await
        .map_err(|e| PropchainError::Evm(e.to_string()))?
        .as_u64();

    info!(
        contract  = ?token_address,
        from      = from_block,
        to        = latest_block,
        "Scanning Transfer events"
    );

    // Fetch all Transfer events in one query (chunk for large ranges in production)
    let filter = Filter::new()
        .address(token_address)
        .event("Transfer(address,address,uint256)")
        .from_block(from_block)
        .to_block(latest_block);

    let logs = provider
        .get_logs(&filter)
        .await
        .map_err(|e| PropchainError::Evm(e.to_string()))?;

    info!(log_count = logs.len(), "Transfer events found");

    // Replay events to reconstruct balances
    let mut balances: HashMap<Address, U256> = HashMap::new();

    // Zero address used as "mint" source in ERC-20
    let zero_address = Address::zero();

    for log in &logs {
        // topics: [event_signature, from (indexed), to (indexed)]
        if log.topics.len() < 3 {
            warn!("Malformed Transfer log, skipping");
            continue;
        }

        let from = address_from_topic(log.topics[1]);
        let to   = address_from_topic(log.topics[2]);

        // Decode value from log data (32-byte big-endian)
        let value = if log.data.len() >= 32 {
            U256::from_big_endian(&log.data.0[..32])
        } else {
            warn!("Could not decode Transfer value, skipping");
            continue;
        };

        // Debit sender (skip for mint events where from == 0x0)
        if from != zero_address {
            let entry = balances.entry(from).or_insert(U256::zero());
            *entry = entry.saturating_sub(value);
        }

        // Credit recipient (skip burn events where to == 0x0)
        if to != zero_address {
            *balances.entry(to).or_insert(U256::zero()) += value;
        }
    }

    // Remove zero-balance entries (sold all tokens)
    balances.retain(|_, v| !v.is_zero());

    // Fetch total supply and token metadata from contract
    let token    = ERC20Token::new(token_address, std::sync::Arc::new(provider));
    let total_supply = token.total_supply().call().await
        .map_err(|e| PropchainError::Evm(e.to_string()))?;
    let decimals = token.decimals().call().await
        .map_err(|e| PropchainError::Evm(e.to_string()))
        .unwrap_or(18u8);
    let symbol = token.symbol().call().await
        .map_err(|e| PropchainError::Evm(e.to_string()))
        .unwrap_or_else(|_| "PCX".into());

    let decimal_factor = U256::exp10(decimals as usize);
    let total_supply_f = u256_to_f64(total_supply);

    // Build sorted holder list
    let mut holders: Vec<HolderEntry> = balances
        .into_iter()
        .map(|(addr, balance)| {
            let balance_formatted = format_balance(balance, decimal_factor);
            let share_pct = if total_supply_f > 0.0 {
                (u256_to_f64(balance) / total_supply_f * 100.0 * 100.0).round() / 100.0
            } else {
                0.0
            };

            HolderEntry {
                address: format!("{addr:?}"),
                balance: balance.to_string(),
                balance_formatted,
                share_pct,
            }
        })
        .collect();

    // Sort descending by raw balance (largest holder first)
    holders.sort_by(|a, b| {
        let ba = a.balance.parse::<u128>().unwrap_or(0);
        let bb = b.balance.parse::<u128>().unwrap_or(0);
        bb.cmp(&ba)
    });

    let holder_count = holders.len();

    Ok(Snapshot {
        contract_address: format!("{token_address:?}"),
        symbol,
        total_supply: total_supply.to_string(),
        snapshot_block: latest_block,
        holders,
        holder_count,
    })
}

/// Write a snapshot to a JSON file
pub fn save_snapshot(snapshot: &Snapshot, path: &str) -> Result<()> {
    let json = serde_json::to_string_pretty(snapshot)?;
    std::fs::write(path, json)
        .map_err(|e| PropchainError::Config(format!("Failed to write snapshot: {e}")))?;
    info!(path, "Snapshot saved");
    Ok(())
}

/// Print a summary table of the top N holders
pub fn print_summary(snapshot: &Snapshot, top_n: usize) {
    println!("\n📊  Snapshot — {} ({})", snapshot.symbol, snapshot.contract_address);
    println!("    Block:        {}", snapshot.snapshot_block);
    println!("    Total supply: {}", snapshot.total_supply);
    println!("    Holders:      {}", snapshot.holder_count);
    println!("\n    Top {} holders:", top_n.min(snapshot.holder_count));
    println!("    {:<44}  {:>16}  {:>8}", "Address", "Balance", "Share%");
    println!("    {}", "-".repeat(72));

    for entry in snapshot.holders.iter().take(top_n) {
        println!(
            "    {:<44}  {:>16}  {:>7.2}%",
            entry.address,
            entry.balance_formatted,
            entry.share_pct
        );
    }
    println!();
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

fn address_from_topic(topic: H256) -> Address {
    // The last 20 bytes of the 32-byte topic are the address
    Address::from_slice(&topic.as_bytes()[12..])
}

fn format_balance(raw: U256, decimal_factor: U256) -> String {
    let whole = raw / decimal_factor;
    let frac  = raw % decimal_factor;
    if frac.is_zero() {
        whole.to_string()
    } else {
        format!("{}.{:0>18}", whole, frac)
            .trim_end_matches('0')
            .to_string()
    }
}

fn u256_to_f64(v: U256) -> f64 {
    // Safe for values up to ~2^53 — sufficient for token balances
    v.low_u128() as f64
}
