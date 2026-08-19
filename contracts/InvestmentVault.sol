// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// NOTE: This contract is STANDALONE and is NOT imported or used by the Next.js
// web application.  It is intended for future on-chain deployment only.

import "./interfaces/IPropertyToken.sol";

/// @title InvestmentVault
/// @author PropChain
/// @notice Central vault that
///           1. Accepts investor funds and forwards them to the correct PropertyToken
///           2. Receives rental income from property managers and distributes it
///           3. Handles full or partial redemptions after the lock-up period
///
///         Flow
///         ─────
///         Investor ──invest()──► Vault ──invest()──► PropertyToken (mints tokens)
///         Manager  ──depositRental()──► Vault ──depositYield()──► PropertyToken
///         Investor ──redeem()──► Vault ──burns tokens──► returns ETH/stablecoin
///
///         Lock-up
///         ────────
///         Each investment records a `lockedUntil` timestamp.  Redemptions are
///         blocked until the lock-up expires (default: 12 months).

contract InvestmentVault {
    // -------------------------------------------------------------------------
    // Data structures
    // -------------------------------------------------------------------------

    struct Investment {
        string  propertyId;
        address tokenAddress;
        uint256 tokenAmount;
        uint256 amountPaid;      // ETH / stablecoin paid at time of investment
        uint256 lockedUntil;     // unix timestamp after which redemption is allowed
        bool    redeemed;
    }

    // -------------------------------------------------------------------------
    // Constants & state
    // -------------------------------------------------------------------------

    uint256 public constant DEFAULT_LOCKUP = 365 days;

    address public owner;

    /// @dev investor address → list of investments
    mapping(address => Investment[]) private _investments;

    /// @dev propertyId → IPropertyToken contract
    mapping(string => IPropertyToken) private _tokens;

    /// @dev registered property IDs
    string[] private _registeredProperties;

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

    event Invested(
        address indexed investor,
        string  indexed propertyId,
        uint256 tokenAmount,
        uint256 amountPaid,
        uint256 lockedUntil
    );

    event RentalDeposited(
        string  indexed propertyId,
        address indexed manager,
        uint256 amount
    );

    event Redeemed(
        address indexed investor,
        string  indexed propertyId,
        uint256 tokenAmount,
        uint256 amountReturned
    );

    event PropertyRegistered(string indexed propertyId, address tokenAddress);

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor() {
        owner = msg.sender;
    }

    // -------------------------------------------------------------------------
    // Modifiers
    // -------------------------------------------------------------------------

    modifier onlyOwner() {
        require(msg.sender == owner, "InvestmentVault: not owner");
        _;
    }

    modifier propertyRegistered(string calldata propertyId) {
        require(
            address(_tokens[propertyId]) != address(0),
            "InvestmentVault: property not registered"
        );
        _;
    }

    // -------------------------------------------------------------------------
    // Owner / admin functions
    // -------------------------------------------------------------------------

    /// @notice Link a property ID to its already-deployed PropertyToken contract
    function registerProperty(string calldata propertyId, address tokenAddress)
        external
        onlyOwner
    {
        require(
            address(_tokens[propertyId]) == address(0),
            "InvestmentVault: already registered"
        );
        require(tokenAddress != address(0), "InvestmentVault: zero address");

        _tokens[propertyId] = IPropertyToken(tokenAddress);
        _registeredProperties.push(propertyId);

        emit PropertyRegistered(propertyId, tokenAddress);
    }

    // -------------------------------------------------------------------------
    // Investor functions
    // -------------------------------------------------------------------------

    /// @notice Invest in a property.  Send exactly `tokenAmount * tokenPrice` wei.
    /// @param propertyId   Property to invest in
    /// @param tokenAmount  Number of tokens to purchase
    function invest(string calldata propertyId, uint256 tokenAmount)
        external
        payable
        propertyRegistered(propertyId)
    {
        IPropertyToken token = _tokens[propertyId];

        require(token.isAllowed(msg.sender), "InvestmentVault: investor not KYC-approved");
        require(token.fundingOpen(), "InvestmentVault: funding round closed");

        uint256 required = tokenAmount * token.tokenPrice();
        require(msg.value == required, "InvestmentVault: incorrect payment");

        // Forward funds and mint tokens directly on the PropertyToken
        token.invest{value: msg.value}(tokenAmount);

        uint256 lockedUntil = block.timestamp + DEFAULT_LOCKUP;

        _investments[msg.sender].push(Investment({
            propertyId:   propertyId,
            tokenAddress: address(token),
            tokenAmount:  tokenAmount,
            amountPaid:   msg.value,
            lockedUntil:  lockedUntil,
            redeemed:     false
        }));

        emit Invested(msg.sender, propertyId, tokenAmount, msg.value, lockedUntil);
    }

    /// @notice Redeem a specific investment by index (after lock-up expires)
    /// @dev    A production contract would burn the ERC-20 tokens and return funds
    ///         from a liquidity reserve; here we return the original principal as
    ///         a simplified model.
    function redeem(uint256 investmentIndex) external {
        require(
            investmentIndex < _investments[msg.sender].length,
            "InvestmentVault: invalid index"
        );

        Investment storage inv = _investments[msg.sender][investmentIndex];

        require(!inv.redeemed, "InvestmentVault: already redeemed");
        require(
            block.timestamp >= inv.lockedUntil,
            "InvestmentVault: still in lock-up period"
        );

        inv.redeemed = true;

        uint256 returnAmount = inv.amountPaid;

        (bool success, ) = payable(msg.sender).call{value: returnAmount}("");
        require(success, "InvestmentVault: redemption transfer failed");

        emit Redeemed(msg.sender, inv.propertyId, inv.tokenAmount, returnAmount);
    }

    // -------------------------------------------------------------------------
    // Property manager functions
    // -------------------------------------------------------------------------

    /// @notice Property manager deposits rental income for a given property.
    ///         Funds are forwarded to the PropertyToken's `depositYield()`.
    /// @param propertyId  Property the income belongs to
    function depositRental(string calldata propertyId)
        external
        payable
        propertyRegistered(propertyId)
    {
        require(msg.value > 0, "InvestmentVault: zero rental deposit");

        IPropertyToken token = _tokens[propertyId];

        // Forward rental income to PropertyToken for pro-rata distribution
        // PropertyToken.depositYield() is payable and onlyOwner — vault must
        // be set as owner of the token, OR the token exposes a public deposit.
        // Here we call the low-level transfer pattern assumed by PropertyToken.
        (bool success, ) = address(token).call{value: msg.value}(
            abi.encodeWithSignature("depositYield()")
        );
        require(success, "InvestmentVault: yield deposit failed");

        emit RentalDeposited(propertyId, msg.sender, msg.value);
    }

    // -------------------------------------------------------------------------
    // View functions
    // -------------------------------------------------------------------------

    /// @notice Get all investments for a given investor
    function getInvestments(address investor)
        external
        view
        returns (Investment[] memory)
    {
        return _investments[investor];
    }

    /// @notice Get a specific investment by investor and index
    function getInvestment(address investor, uint256 index)
        external
        view
        returns (Investment memory)
    {
        require(index < _investments[investor].length, "InvestmentVault: invalid index");
        return _investments[investor][index];
    }

    /// @notice Number of investments made by an investor
    function investmentCount(address investor) external view returns (uint256) {
        return _investments[investor].length;
    }

    /// @notice List all registered property IDs
    function registeredProperties() external view returns (string[] memory) {
        return _registeredProperties;
    }

    /// @notice Get the token contract address for a registered property
    function tokenOf(string calldata propertyId)
        external
        view
        propertyRegistered(propertyId)
        returns (address)
    {
        return address(_tokens[propertyId]);
    }

    // -------------------------------------------------------------------------
    // Receive ETH (in case of direct transfers from property managers)
    // -------------------------------------------------------------------------

    receive() external payable {}
}
