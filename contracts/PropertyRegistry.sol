// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// NOTE: This contract is STANDALONE and is NOT imported or used by the Next.js
// web application.  It is intended for future on-chain deployment only.

/// @title PropertyRegistry
/// @author PropChain
/// @notice On-chain registry that maps every PropChain property to its deployed
///         `PropertyToken` contract address and stores immutable metadata hashes.
///
///         Roles
///         ──────
///         • owner     – can register new properties and update the oracle address
///         • oracle    – off-chain Rust service that pushes periodic price updates
///
///         Data stored per property
///         ─────────────────────────
///         • tokenAddress   – deployed PropertyToken contract
///         • metadataHash   – IPFS CID / SHA-256 of the legal + property JSON
///         • currentPrice   – latest USD/AED valuation (18-decimal fixed point)
///         • lastPriceAt    – block timestamp of the last oracle update
///         • active         – whether the property is live on the platform

contract PropertyRegistry {
    // -------------------------------------------------------------------------
    // Data structures
    // -------------------------------------------------------------------------

    struct PropertyRecord {
        string  propertyId;      // matches PropChain DB id, e.g. "marina-heights-tower"
        address tokenAddress;    // deployed PropertyToken contract
        bytes32 metadataHash;    // IPFS / SHA-256 hash of off-chain metadata
        uint256 totalValue;      // total property valuation (18-decimal, AED)
        uint256 currentPrice;    // latest oracle price per token (18-decimal, AED)
        uint256 lastPriceAt;     // block.timestamp of last oracle update
        bool    active;          // true = live on platform
    }

    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------

    address public owner;
    address public oracle;

    /// @dev propertyId (string) → record
    mapping(string => PropertyRecord) private _records;

    /// @dev ordered list of all registered property IDs
    string[] private _propertyIds;

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

    event PropertyRegistered(
        string indexed propertyId,
        address indexed tokenAddress,
        uint256 totalValue
    );

    event PriceUpdated(
        string indexed propertyId,
        uint256 oldPrice,
        uint256 newPrice,
        uint256 timestamp
    );

    event PropertyStatusChanged(string indexed propertyId, bool active);

    event OracleUpdated(address indexed oldOracle, address indexed newOracle);

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
        require(msg.sender == owner, "PropertyRegistry: not owner");
        _;
    }

    modifier onlyOracle() {
        require(
            msg.sender == oracle || msg.sender == owner,
            "PropertyRegistry: not oracle"
        );
        _;
    }

    modifier propertyExists(string calldata propertyId) {
        require(
            _records[propertyId].tokenAddress != address(0),
            "PropertyRegistry: property not found"
        );
        _;
    }

    // -------------------------------------------------------------------------
    // Owner functions
    // -------------------------------------------------------------------------

    /// @notice Register a new property and its deployed token contract
    /// @param propertyId_    Unique string key (must match off-chain DB id)
    /// @param tokenAddress_  Address of the already-deployed PropertyToken contract
    /// @param metadataHash_  IPFS CID or SHA-256 hash of property legal docs
    /// @param totalValue_    Total property valuation in AED (18-decimal)
    /// @param initialPrice_  Starting token price in AED (18-decimal)
    function registerProperty(
        string calldata propertyId_,
        address tokenAddress_,
        bytes32 metadataHash_,
        uint256 totalValue_,
        uint256 initialPrice_
    ) external onlyOwner {
        require(
            _records[propertyId_].tokenAddress == address(0),
            "PropertyRegistry: already registered"
        );
        require(tokenAddress_ != address(0), "PropertyRegistry: zero address");
        require(totalValue_ > 0, "PropertyRegistry: invalid total value");

        _records[propertyId_] = PropertyRecord({
            propertyId:   propertyId_,
            tokenAddress: tokenAddress_,
            metadataHash: metadataHash_,
            totalValue:   totalValue_,
            currentPrice: initialPrice_,
            lastPriceAt:  block.timestamp,
            active:       true
        });

        _propertyIds.push(propertyId_);

        emit PropertyRegistered(propertyId_, tokenAddress_, totalValue_);
    }

    /// @notice Set the oracle address that is permitted to push price updates
    function setOracle(address oracle_) external onlyOwner {
        emit OracleUpdated(oracle, oracle_);
        oracle = oracle_;
    }

    /// @notice Activate or deactivate a property listing
    function setPropertyActive(string calldata propertyId_, bool active_)
        external
        onlyOwner
        propertyExists(propertyId_)
    {
        _records[propertyId_].active = active_;
        emit PropertyStatusChanged(propertyId_, active_);
    }

    /// @notice Update the off-chain metadata hash (e.g. after legal doc refresh)
    function updateMetadataHash(string calldata propertyId_, bytes32 hash_)
        external
        onlyOwner
        propertyExists(propertyId_)
    {
        _records[propertyId_].metadataHash = hash_;
    }

    // -------------------------------------------------------------------------
    // Oracle functions
    // -------------------------------------------------------------------------

    /// @notice Push a new token price from the off-chain Rust oracle
    /// @param propertyId_  Property to update
    /// @param newPrice_    New price per token in AED (18-decimal)
    function updatePrice(string calldata propertyId_, uint256 newPrice_)
        external
        onlyOracle
        propertyExists(propertyId_)
    {
        require(newPrice_ > 0, "PropertyRegistry: invalid price");

        PropertyRecord storage rec = _records[propertyId_];
        uint256 oldPrice = rec.currentPrice;

        rec.currentPrice = newPrice_;
        rec.lastPriceAt  = block.timestamp;

        emit PriceUpdated(propertyId_, oldPrice, newPrice_, block.timestamp);
    }

    // -------------------------------------------------------------------------
    // View functions
    // -------------------------------------------------------------------------

    /// @notice Fetch the full record for a single property
    function getProperty(string calldata propertyId_)
        external
        view
        propertyExists(propertyId_)
        returns (PropertyRecord memory)
    {
        return _records[propertyId_];
    }

    /// @notice Fetch records for all registered properties
    /// @dev Paginate on the caller side for large registries
    function getAllProperties() external view returns (PropertyRecord[] memory) {
        uint256 len = _propertyIds.length;
        PropertyRecord[] memory result = new PropertyRecord[](len);
        for (uint256 i = 0; i < len; i++) {
            result[i] = _records[_propertyIds[i]];
        }
        return result;
    }

    /// @notice Total number of registered properties
    function propertyCount() external view returns (uint256) {
        return _propertyIds.length;
    }

    /// @notice Get the token contract address for a property
    function tokenOf(string calldata propertyId_)
        external
        view
        propertyExists(propertyId_)
        returns (address)
    {
        return _records[propertyId_].tokenAddress;
    }
}
