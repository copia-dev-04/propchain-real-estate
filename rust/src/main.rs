//! # propchain-tools CLI
//!
//! Entry point for the PropChain off-chain Rust tooling.
//!
//! ## Commands
//!
//! ```
//! propchain-tools oracle   --interval <SECS>          Run price oracle (loop)
//! propchain-tools oracle   --once                     Run price oracle (single pass)
//! propchain-tools yield    --value <AED> --rental <AED> --tokens <N> [--funded <PCT>]
//! propchain-tools snapshot --contract <ADDR> [--rpc <URL>] [--output <FILE>] [--top <N>]
//! ```
//!
//! All long-running network operations are async (Tokio runtime).

use clap::{Parser, Subcommand};
use dotenvy::dotenv;
use rust_decimal::Decimal;
use rust_decimal_macros::dec;
use std::str::FromStr;
use tracing::info;
use tracing_subscriber::{fmt, EnvFilter};

use propchain_tools::{
    oracle::OracleClient,
    snapshot::{build_snapshot, print_summary, save_snapshot},
    yield_calc::{calculate_yield, projected_roi, YieldInput},
};

// ---------------------------------------------------------------------------
// CLI definition
// ---------------------------------------------------------------------------

/// PropChain off-chain tooling: oracle, yield calculator, holder snapshot
#[derive(Parser, Debug)]
#[command(
    name    = "propchain-tools",
    version = "0.1.0",
    author  = "PropChain <dev@propchain.io>",
    about   = "Off-chain CLI tools for the PropChain real estate tokenisation platform"
)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand, Debug)]
enum Commands {
    /// Run the property price oracle
    Oracle {
        /// Run once and exit (default: run in a loop)
        #[arg(long, default_value_t = false)]
        once: bool,

        /// Seconds between oracle cycles when running in loop mode
        #[arg(long, default_value_t = 3600)]
        interval: u64,
    },

    /// Calculate yield metrics for a single property
    Yield {
        /// Total property value in AED (e.g. 2800000)
        #[arg(long)]
        value: String,

        /// Gross monthly rental income in AED (e.g. 19133)
        #[arg(long)]
        rental: String,

        /// Total number of tokens issued for this property
        #[arg(long)]
        tokens: u64,

        /// Percentage already funded, 0–100 (default: 0)
        #[arg(long, default_value = "0")]
        funded: String,

        /// Show projected ROI for this many years (default: 5)
        #[arg(long, default_value_t = 5)]
        years: u32,
    },

    /// Take an on-chain holder snapshot for a PropertyToken contract
    Snapshot {
        /// Deployed PropertyToken contract address (0x…)
        #[arg(long)]
        contract: String,

        /// EVM RPC URL (overrides RPC_URL env var)
        #[arg(long)]
        rpc: Option<String>,

        /// Start block for event scan (default: 0)
        #[arg(long, default_value_t = 0)]
        from_block: u64,

        /// Output JSON file path (default: snapshot.json)
        #[arg(long, default_value = "snapshot.json")]
        output: String,

        /// Print top N holders to stdout (default: 10)
        #[arg(long, default_value_t = 10)]
        top: usize,
    },
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load .env (silently ignored if file is absent)
    let _ = dotenv();

    // Initialise structured logging.
    // Set RUST_LOG=info (or debug) to control verbosity.
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let cli = Cli::parse();

    match cli.command {
        // -------------------------------------------------------------------
        // oracle
        // -------------------------------------------------------------------
        Commands::Oracle { once, interval } => {
            let client = OracleClient::from_env()?;

            if once {
                info!("Running oracle — single pass");
                client.run_once().await?;
                info!("Oracle pass complete");
            } else {
                info!(interval_secs = interval, "Starting oracle loop");
                client.run_loop(interval).await?;
            }
        }

        // -------------------------------------------------------------------
        // yield
        // -------------------------------------------------------------------
        Commands::Yield { value, rental, tokens, funded, years } => {
            let input = YieldInput {
                total_value_aed: Decimal::from_str(&value)
                    .map_err(|_| anyhow::anyhow!("Invalid --value: {value}"))?,
                monthly_rental: Decimal::from_str(&rental)
                    .map_err(|_| anyhow::anyhow!("Invalid --rental: {rental}"))?,
                total_tokens: tokens,
                funded_pct: Decimal::from_str(&funded)
                    .map_err(|_| anyhow::anyhow!("Invalid --funded: {funded}"))?,
            };

            let result = calculate_yield(&input)
                .map_err(|e| anyhow::anyhow!("{e}"))?;

            println!("\n📈  Yield Analysis");
            println!("    Total Value:       AED {}", input.total_value_aed);
            println!("    Monthly Rental:    AED {}", input.monthly_rental);
            println!("    Annual Rental:     AED {}", result.annual_rental_aed);
            println!("    Annual Yield:      {}%", result.annual_yield_pct);
            println!("    Token Price:       AED {}", result.token_price_aed);
            println!("    Total Tokens:      {}", input.total_tokens);
            println!("    Tokens Sold:       {} ({:.1}%)", result.tokens_sold, input.funded_pct);
            println!("    Tokens Available:  {}", result.tokens_available);
            println!("    Funded Value:      AED {}", result.funded_value_aed);
            println!("    Unfunded Value:    AED {}", result.unfunded_value_aed);
            println!(
                "    Projected ROI ({} yrs): {}%",
                years,
                projected_roi(result.annual_yield_pct, years)
            );
            println!();
        }

        // -------------------------------------------------------------------
        // snapshot
        // -------------------------------------------------------------------
        Commands::Snapshot { contract, rpc, from_block, output, top } => {
            let rpc_url = rpc
                .or_else(|| std::env::var("RPC_URL").ok())
                .ok_or_else(|| anyhow::anyhow!("--rpc or RPC_URL env var required"))?;

            let token_address: ethers::types::Address = contract
                .parse()
                .map_err(|_| anyhow::anyhow!("Invalid --contract address: {contract}"))?;

            info!(contract = %contract, rpc = %rpc_url, "Building holder snapshot");

            let snapshot = build_snapshot(&rpc_url, token_address, from_block).await?;
            print_summary(&snapshot, top);
            save_snapshot(&snapshot, &output)?;

            println!("✅  Snapshot written to {output}");
        }
    }

    Ok(())
}
