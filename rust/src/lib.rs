//! # propchain-tools
//!
//! Off-chain Rust tooling for the PropChain platform.
//!
//! This crate is **completely standalone** — it does not interact with the
//! Next.js / Express web application at all.  It communicates exclusively with:
//!
//! - EVM-compatible RPC endpoints (read/write smart contract state)
//! - External property valuation REST APIs
//!
//! ## Modules
//!
//! | Module | Purpose |
//! |---|---|
//! | [`oracle`] | Fetches latest property valuations and pushes price updates to `PropertyRegistry` |
//! | [`yield_calc`] | Pure financial calculations: annualised yield, ROI, token price |
//! | [`snapshot`] | Reads ERC-20 Transfer events to build a holder → balance map |
//!
//! ## Example
//!
//! ```no_run
//! use propchain_tools::yield_calc::{YieldInput, calculate_yield};
//! use rust_decimal_macros::dec;
//!
//! let input = YieldInput {
//!     total_value_aed:  dec!(2_800_000),
//!     monthly_rental:   dec!(19_133),
//!     total_tokens:     2_800,
//!     funded_pct:       dec!(73),
//! };
//!
//! let result = calculate_yield(&input);
//! println!("Annual yield: {}%", result.annual_yield_pct);
//! println!("Token price:  AED {}", result.token_price_aed);
//! ```

pub mod oracle;
pub mod snapshot;
pub mod yield_calc;

/// Shared error type used across all modules
#[derive(Debug, thiserror::Error)]
pub enum PropchainError {
    #[error("HTTP request failed: {0}")]
    Http(#[from] reqwest::Error),

    #[error("JSON parse error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("EVM error: {0}")]
    Evm(String),

    #[error("Configuration error: {0}")]
    Config(String),

    #[error("Calculation error: {0}")]
    Calc(String),
}

pub type Result<T> = std::result::Result<T, PropchainError>;
