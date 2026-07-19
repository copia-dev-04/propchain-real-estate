# PropChain

**Fractional Real Estate Investment via Blockchain Tokenization**

PropChain lets anyone invest in premium real estate — Dubai Marina, Palm Jumeirah, DIFC, and emerging markets like Hyderabad — starting from as little as AED 500. Each property is represented as on-chain tokens backed by a legal SPV (Special Purpose Vehicle), delivering rental income and capital appreciation to token holders.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Smart Contracts](#smart-contracts)
- [Rust Tooling](#rust-tooling)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

| Feature | Description |
|---|---|
| Fractional Ownership | Buy tokens representing a share of a real property |
| Rental Income | Monthly AED distributions proportional to token holdings |
| Liquidity | Secondary token market for buying/selling positions |
| Transparency | All property data and transactions recorded on-chain |
| KYC/AML | Firebase Auth + on-chain allowlist enforced by contracts |

---

## Tech Stack

### Frontend / Backend (Main App)
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Framer Motion |
| State | Zustand + TanStack Query |
| Auth | Firebase Authentication |
| Database | MongoDB (via Mongoose) |
| API Server | Express.js (Node) |
| Realtime | Socket.IO |

### Blockchain Layer (standalone — see `/contracts`)
| Layer | Technology |
|---|---|
| Language | Solidity ^0.8.24 |
| Token Standard | ERC-20 (property tokens) |
| Framework | Hardhat / Foundry compatible |
| Network | EVM-compatible (Polygon, Base, or private chain) |

### Off-chain Tooling (standalone — see `/rust`)
| Layer | Technology |
|---|---|
| Language | Rust (edition 2021) |
| Purpose | Token price oracle, yield calculator, snapshot tool |
| Runtime | Standalone binary — not imported by the web app |

---

## Project Structure

```
propchain/
├── app/                    # Next.js App Router pages
├── components/             # React components (layouts, sections, ui)
├── lib/                    # Hooks, API client, data models, utilities
├── server/                 # Express.js API server
├── public/                 # Static assets
│
├── contracts/              # ⛓  Solidity smart contracts (standalone)
│   ├── PropertyToken.sol       # ERC-20 token representing property shares
│   ├── PropertyRegistry.sol    # On-chain property metadata registry
│   ├── InvestmentVault.sol     # Handles investments, distributions, redemptions
│   └── interfaces/
│       └── IPropertyToken.sol  # Shared interface
│
├── rust/                   # 🦀  Off-chain Rust tooling (standalone)
│   ├── Cargo.toml
│   └── src/
│       ├── main.rs             # CLI entry point
│       ├── lib.rs              # Library root
│       ├── oracle.rs           # Token price oracle (fetches + pushes on-chain)
│       ├── yield_calc.rs       # Yield and ROI calculations
│       └── snapshot.rs         # On-chain holder snapshot for distributions
│
├── README.md
├── package.json
└── .env.example
```

> **Important:** The `contracts/` and `rust/` directories are completely independent of the Next.js application. They do not affect `npm run dev`, `npm run build`, or any other app scripts.

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB instance (local or Atlas)
- Firebase project credentials

### Install & Run

```bash
# Install dependencies
npm install

# Copy environment file and fill in values
cp .env.example .env

# Start development server (Next.js + Express concurrently)
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Smart Contracts

> Located in `/contracts` — independent of the web app.

### Contracts Overview

| Contract | Purpose |
|---|---|
| `PropertyToken.sol` | ERC-20 token for a single property. Each token = 1 share (1 AED min denomination). Includes allowlist for KYC compliance. |
| `PropertyRegistry.sol` | Registry mapping property IDs to their token contract addresses and metadata hashes. |
| `InvestmentVault.sol` | Accepts investments, mints tokens, collects rental income, and distributes yield to holders. |

### Compile & Test (Hardhat)

```bash
cd contracts

# Install Hardhat (one-time)
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Compile
npx hardhat compile

# Run tests
npx hardhat test
```

### Compile & Test (Foundry)

```bash
cd contracts

# Install Foundry (one-time)
curl -L https://foundry.paradigm.xyz | bash && foundryup

# Build
forge build

# Test
forge test -vvv
```

---

## Rust Tooling

> Located in `/rust` — independent of the web app.

### Tools Overview

| Binary / Module | Purpose |
|---|---|
| `oracle` | Fetches property valuation data from off-chain APIs and submits price updates to the `PropertyRegistry` contract |
| `yield_calc` | Computes annualised yield, ROI, and token price based on rental income and total property value |
| `snapshot` | Takes a holder snapshot from the ERC-20 contract for use in pro-rata rental distribution |

### Build & Run

```bash
cd rust

# Build release binary
cargo build --release

# Run the CLI
./target/release/propchain-tools --help

# Example: calculate yield
./target/release/propchain-tools yield --value 2800000 --rental 19133 --tokens 2800

# Example: take holder snapshot
./target/release/propchain-tools snapshot --contract 0xYourTokenAddress --rpc https://polygon-rpc.com
```

---

## Environment Variables

Copy `.env.example` to `.env` and populate:

```
# App
NEXT_PUBLIC_API_URL=http://localhost:4000

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# MongoDB
MONGODB_URI=mongodb://localhost:27017/propchain

# JWT
JWT_SECRET=

# Blockchain (used by Rust tooling only — not the web app)
RPC_URL=https://polygon-rpc.com
DEPLOYER_PRIVATE_KEY=
REGISTRY_CONTRACT_ADDRESS=
```

---

## Deployment

### Web App

The app targets Google Cloud Run via `cloudbuild.yaml`. See `.github/workflows/deploy-frontend.yml` and `.github/workflows/deploy-backend.yml` for CI/CD pipelines.

### Smart Contracts

Deploy to your target EVM network using Hardhat or Foundry deploy scripts. Store the deployed contract addresses in `.env` for the Rust tooling.

### Rust Tooling

Build a release binary and schedule it (e.g., via cron or Cloud Scheduler) to run the oracle and snapshot jobs:

```bash
cargo build --release
# Schedule: ./target/release/propchain-tools oracle --interval 3600
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow the existing code style. Run `npm run lint` before submitting.

---

## License

MIT — see [LICENSE](LICENSE) for details.
