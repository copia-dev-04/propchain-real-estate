// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// NOTE: This contract is STANDALONE and is NOT imported or used by the Next.js
// web application.  It is intended for future on-chain deployment only.
//
// Compile with Hardhat or Foundry (see README.md → Smart Contracts section).

import "./interfaces/IPropertyToken.sol";

/// @title PropertyToken
/// @author PropChain
/// @notice ERC-20-compatible token representing fractional ownership of a single
///         real estate property.  Each token equals one share (denominated in the
///         payment currency, e.g. AED-pegged stablecoin or native ETH/MATIC).
///
///         Key design decisions
///         ─────────────────────
///         • KYC allowlist  – only approved addresses may hold or transfer tokens,
///           satisfying typical real-estate regulatory requirements.
///         • Yield tracking – a simple "debt-per-share" pattern (inspired by
///           Synthetix StakingRewards) distributes rental income proportionally
///           without iterating over all holders.
///         • Funding round  – minting is only allowed while `fundingOpen` is true;
///           the owner calls `closeFunding()` once the raise completes.
///
/// @dev This is intentionally self-contained (no OpenZeppelin import) so that the
///      file compiles without external dependencies for review purposes.
///      A production deployment should use `@openzeppelin/contracts` for battle-
///      tested ERC-20/Ownable/ReentrancyGuard implementations.

contract PropertyToken is IPropertyToken {
    // -------------------------------------------------------------------------
    // ERC-20 storage
    // -------------------------------------------------------------------------

    string public name;
    string public symbol;
    uint8  public constant decimals = 18;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // -------------------------------------------------------------------------
    // PropChain-specific storage
    // -------------------------------------------------------------------------

    address public owner;

    string  private _propertyId;
    uint256 private _tokenPrice;   // payment units per token (e.g. wei or μAED)
    uint256 private _maxSupply;
    bool    private _fundingOpen;

    /// @dev KYC allowlist
    mapping(address => bool) private _allowed;

    /// @dev Yield-per-token scaled by PRECISION to avoid integer truncation
    uint256 private constant PRECISION = 1e18;
    uint256 private _yieldPerTokenStored;
    mapping(address => uint256) private _yieldPerTokenPaid;
    mapping(address => uint256) private _pendingYield;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    /// @param propertyId_  Off-chain property identifier (e.g. "marina-heights-tower")
    /// @param name_        Human-readable token name (e.g. "PropChain Marina Heights")
    /// @param symbol_      Token symbol (e.g. "PCM")
    /// @param tokenPrice_  Price per token in payment units
    /// @param maxSupply_   Hard cap on total tokens that can be minted
    constructor(
        string memory propertyId_,
        string memory name_,
        string memory symbol_,
        uint256 tokenPrice_,
        uint256 maxSupply_
    ) {
        owner        = msg.sender;
        _propertyId  = propertyId_;
        name         = name_;
        symbol       = symbol_;
        _tokenPrice  = tokenPrice_;
        _maxSupply   = maxSupply_;
        _fundingOpen = true;
    }

    // -------------------------------------------------------------------------
    // Modifiers
    // -------------------------------------------------------------------------

    modifier onlyOwner() {
        require(msg.sender == owner, "PropertyToken: not owner");
        _;
    }

    modifier onlyAllowed(address account) {
        require(_allowed[account], "PropertyToken: address not KYC-approved");
        _;
    }

    modifier updateYield(address account) {
        _yieldPerTokenStored = yieldPerToken();
        if (account != address(0)) {
            _pendingYield[account]      = claimableYield(account);
            _yieldPerTokenPaid[account] = _yieldPerTokenStored;
        }
        _;
    }

    // -------------------------------------------------------------------------
    // IPropertyToken — view functions
    // -------------------------------------------------------------------------

    function propertyId()  external view override returns (string memory) { return _propertyId; }
    function tokenPrice()  external view override returns (uint256)        { return _tokenPrice; }
    function maxSupply()   external view override returns (uint256)        { return _maxSupply; }
    function fundingOpen() external view override returns (bool)           { return _fundingOpen; }
    function isAllowed(address account) external view override returns (bool) { return _allowed[account]; }

    /// @notice Accumulated yield claimable by `holder`
    function claimableYield(address holder) public view override returns (uint256) {
        return (
            _balances[holder] * (yieldPerToken() - _yieldPerTokenPaid[holder]) / PRECISION
        ) + _pendingYield[holder];
    }

    /// @notice Current yield-per-token (scaled by PRECISION)
    function yieldPerToken() public view returns (uint256) {
        if (_totalSupply == 0) return _yieldPerTokenStored;
        return _yieldPerTokenStored;
    }

    // -------------------------------------------------------------------------
    // IPropertyToken — state-changing functions
    // -------------------------------------------------------------------------

    /// @notice Purchase `amount` tokens.  Caller must send exactly `amount * tokenPrice` wei.
    function invest(uint256 amount)
        external
        payable
        override
        onlyAllowed(msg.sender)
        updateYield(msg.sender)
    {
        require(_fundingOpen, "PropertyToken: funding round closed");
        require(amount > 0, "PropertyToken: amount must be > 0");
        require(
            _totalSupply + amount <= _maxSupply,
            "PropertyToken: exceeds max supply"
        );
        require(
            msg.value == amount * _tokenPrice,
            "PropertyToken: incorrect payment"
        );

        _mint(msg.sender, amount);
        emit TokensMinted(msg.sender, amount, msg.value);
    }

    /// @notice Claim all accrued rental yield for the caller
    function claimYield()
        external
        override
        onlyAllowed(msg.sender)
        updateYield(msg.sender)
    {
        uint256 yield_ = _pendingYield[msg.sender];
        require(yield_ > 0, "PropertyToken: nothing to claim");

        _pendingYield[msg.sender] = 0;

        // Transfer yield in native currency; a production contract would use
        // a stablecoin transferFrom instead.
        (bool success, ) = payable(msg.sender).call{value: yield_}("");
        require(success, "PropertyToken: yield transfer failed");

        emit YieldDistributed(msg.sender, yield_);
    }

    /// @notice Add or remove `account` from the KYC allowlist
    function setAllowlist(address account, bool allowed)
        external
        override
        onlyOwner
    {
        _allowed[account] = allowed;
        emit AllowlistUpdated(account, allowed);
    }

    /// @notice Close the funding round — no more tokens can be minted after this
    function closeFunding() external override onlyOwner {
        require(_fundingOpen, "PropertyToken: already closed");
        _fundingOpen = false;
        emit FundingClosed(_totalSupply);
    }

    /// @notice Deposit rental income — split proportionally across all token holders
    /// @dev Called by the property manager / InvestmentVault on a monthly schedule
    function depositYield() external payable onlyOwner updateYield(address(0)) {
        require(msg.value > 0, "PropertyToken: zero yield deposit");
        require(_totalSupply > 0, "PropertyToken: no token holders yet");

        _yieldPerTokenStored += (msg.value * PRECISION) / _totalSupply;
    }

    // -------------------------------------------------------------------------
    // ERC-20 standard functions
    // -------------------------------------------------------------------------

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount)
        external
        onlyAllowed(msg.sender)
        onlyAllowed(to)
        updateYield(msg.sender)
        updateYield(to)
        returns (bool)
    {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address tokenOwner, address spender)
        external
        view
        returns (uint256)
    {
        return _allowances[tokenOwner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    )
        external
        onlyAllowed(from)
        onlyAllowed(to)
        updateYield(from)
        updateYield(to)
        returns (bool)
    {
        require(
            _allowances[from][msg.sender] >= amount,
            "PropertyToken: insufficient allowance"
        );
        _allowances[from][msg.sender] -= amount;
        _transfer(from, to, amount);
        return true;
    }

    // -------------------------------------------------------------------------
    // Internal helpers
    // -------------------------------------------------------------------------

    function _mint(address to, uint256 amount) internal {
        _totalSupply      += amount;
        _balances[to]     += amount;
        emit Transfer(address(0), to, amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(_balances[from] >= amount, "PropertyToken: insufficient balance");
        _balances[from] -= amount;
        _balances[to]   += amount;
        emit Transfer(from, to, amount);
    }

    // -------------------------------------------------------------------------
    // ERC-20 events (re-declared for completeness without OZ dependency)
    // -------------------------------------------------------------------------

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner_, address indexed spender, uint256 value);

    // -------------------------------------------------------------------------
    // Receive ETH (rental income forwarded from vault)
    // -------------------------------------------------------------------------

    receive() external payable {}
}
