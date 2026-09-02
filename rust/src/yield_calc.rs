//! # yield_calc
//!
//! Pure, dependency-free financial calculations for PropChain properties.
//!
//! All arithmetic uses [`rust_decimal::Decimal`] to avoid floating-point
//! rounding errors when dealing with currency values.
//!
//! ## Formulas used
//!
//! ```text
//! annual_rental     = monthly_rental × 12
//! annual_yield_pct  = (annual_rental / total_value) × 100
//! token_price_aed   = total_value / total_tokens
//! funded_value      = total_value × (funded_pct / 100)
//! unfunded_value    = total_value − funded_value
//! roi_at_exit(yrs)  = annual_yield_pct × years
//! ```

use rust_decimal::Decimal;
use rust_decimal_macros::dec;
use serde::{Deserialize, Serialize};

use crate::{PropchainError, Result};

// ---------------------------------------------------------------------------
// Input / Output types
// ---------------------------------------------------------------------------

/// All inputs required to compute yield metrics for a single property
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct YieldInput {
    /// Total property valuation in AED (e.g. 2_800_000)
    pub total_value_aed: Decimal,

    /// Gross monthly rental income in AED (e.g. 19_133)
    pub monthly_rental: Decimal,

    /// Total number of tokens for this property (e.g. 2_800)
    pub total_tokens: u64,

    /// Percentage of tokens already sold, 0–100 (e.g. 73)
    pub funded_pct: Decimal,
}

/// Computed yield metrics
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct YieldResult {
    /// Gross annual rental income in AED
    pub annual_rental_aed: Decimal,

    /// Gross annual yield as a percentage (e.g. 8.20)
    pub annual_yield_pct: Decimal,

    /// Price per token in AED
    pub token_price_aed: Decimal,

    /// Value of tokens already sold
    pub funded_value_aed: Decimal,

    /// Value of tokens still available
    pub unfunded_value_aed: Decimal,

    /// Number of tokens already sold
    pub tokens_sold: u64,

    /// Number of tokens still available
    pub tokens_available: u64,
}

// ---------------------------------------------------------------------------
// Core calculation
// ---------------------------------------------------------------------------

/// Calculate all yield metrics for a property.
///
/// Returns `Err` if any input value is zero or negative.
pub fn calculate_yield(input: &YieldInput) -> Result<YieldResult> {
    if input.total_value_aed <= dec!(0) {
        return Err(PropchainError::Calc("total_value_aed must be > 0".into()));
    }
    if input.monthly_rental < dec!(0) {
        return Err(PropchainError::Calc("monthly_rental cannot be negative".into()));
    }
    if input.total_tokens == 0 {
        return Err(PropchainError::Calc("total_tokens must be > 0".into()));
    }
    if input.funded_pct < dec!(0) || input.funded_pct > dec!(100) {
        return Err(PropchainError::Calc("funded_pct must be in range 0–100".into()));
    }

    let annual_rental_aed = input.monthly_rental * dec!(12);

    let annual_yield_pct = (annual_rental_aed / input.total_value_aed * dec!(100))
        .round_dp(2);

    let total_tokens_dec = Decimal::from(input.total_tokens);
    let token_price_aed  = (input.total_value_aed / total_tokens_dec).round_dp(2);

    let funded_value_aed   = (input.total_value_aed * input.funded_pct / dec!(100)).round_dp(2);
    let unfunded_value_aed = input.total_value_aed - funded_value_aed;

    let tokens_sold      = (total_tokens_dec * input.funded_pct / dec!(100))
        .round()
        .to_u64()
        .unwrap_or(0);
    let tokens_available = input.total_tokens.saturating_sub(tokens_sold);

    Ok(YieldResult {
        annual_rental_aed,
        annual_yield_pct,
        token_price_aed,
        funded_value_aed,
        unfunded_value_aed,
        tokens_sold,
        tokens_available,
    })
}

/// Estimate projected ROI after `years` of holding
///
/// Returns the percentage gain assuming the annual yield stays constant.
pub fn projected_roi(annual_yield_pct: Decimal, years: u32) -> Decimal {
    (annual_yield_pct * Decimal::from(years)).round_dp(2)
}

/// Compare two properties and return the one with the higher annual yield
pub fn compare_yields<'a>(a: &'a YieldInput, b: &'a YieldInput) -> Result<&'a YieldInput> {
    let yield_a = calculate_yield(a)?.annual_yield_pct;
    let yield_b = calculate_yield(b)?.annual_yield_pct;
    if yield_a >= yield_b { Ok(a) } else { Ok(b) }
}

// ---------------------------------------------------------------------------
// Helper trait for Decimal → u64 (not in std library)
// ---------------------------------------------------------------------------

trait ToU64 {
    fn to_u64(&self) -> Option<u64>;
}

impl ToU64 for Decimal {
    fn to_u64(&self) -> Option<u64> {
        use std::str::FromStr;
        // Decimal → string → u64 avoids lossy f64 conversion
        u64::from_str(&self.to_string()).ok()
    }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;
    use rust_decimal_macros::dec;

    fn marina_input() -> YieldInput {
        YieldInput {
            total_value_aed: dec!(2_800_000),
            monthly_rental:  dec!(19_133),
            total_tokens:    2_800,
            funded_pct:      dec!(73),
        }
    }

    #[test]
    fn test_annual_yield_calculation() {
        let result = calculate_yield(&marina_input()).unwrap();
        // 19133 * 12 = 229596; 229596 / 2800000 * 100 = 8.20%
        assert_eq!(result.annual_yield_pct, dec!(8.20));
    }

    #[test]
    fn test_token_price() {
        let result = calculate_yield(&marina_input()).unwrap();
        // 2800000 / 2800 = 1000 AED per token
        assert_eq!(result.token_price_aed, dec!(1000));
    }

    #[test]
    fn test_funded_tokens() {
        let result = calculate_yield(&marina_input()).unwrap();
        // 73% of 2800 = 2044 tokens sold
        assert_eq!(result.tokens_sold, 2044);
        assert_eq!(result.tokens_available, 756);
    }

    #[test]
    fn test_projected_roi_3_years() {
        let roi = projected_roi(dec!(8.20), 3);
        assert_eq!(roi, dec!(24.60));
    }

    #[test]
    fn test_zero_total_value_returns_error() {
        let mut input = marina_input();
        input.total_value_aed = dec!(0);
        assert!(calculate_yield(&input).is_err());
    }

    #[test]
    fn test_zero_tokens_returns_error() {
        let mut input = marina_input();
        input.total_tokens = 0;
        assert!(calculate_yield(&input).is_err());
    }
}
