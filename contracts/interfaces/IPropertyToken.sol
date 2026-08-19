// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IPropertyToken
/// @notice Interface for a PropChain property token (ERC-20 share in a real estate asset)
interface IPropertyToken {
    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

    /// @notice Emitted when new tokens are minted for an investor
    event TokensMinted(address indexed to, uint256 amount, uint256 amountPaid);

    /// @notice Emitted when rental yield is distributed to a holder
    event YieldDistributed(address indexed holder, uint256 amount);

    /// @notice Emitted when an address is added to / removed from the KYC allowlist
    event AllowlistUpdated(address indexed account, bool allowed);

    /// @notice Emitted when the property funding round is closed
    event FundingClosed(uint256 totalRaised);

    // -------------------------------------------------------------------------
    // View functions
    // -------------------------------------------------------------------------

    /// @return The unique property identifier (matches PropChain DB id)
    function propertyId() external view returns (string memory);

    /// @return Price in wei (or stablecoin units) per single token
    function tokenPrice() external view returns (uint256);

    /// @return Maximum number of tokens that can ever be minted for this property
    function maxSupply() external view returns (uint256);

    /// @return Whether the funding round is still open
    function fundingOpen() external view returns (bool);

    /// @return Whether `account` has passed KYC and is allowed to hold tokens
    function isAllowed(address account) external view returns (bool);

    /// @return Accumulated yield (in payment-token units) claimable by `holder`
    function claimableYield(address holder) external view returns (uint256);

    // -------------------------------------------------------------------------
    // State-changing functions
    // -------------------------------------------------------------------------

    /// @notice Invest in the property — caller receives tokens proportional to `msg.value`
    /// @param amount Number of tokens to purchase
    function invest(uint256 amount) external payable;

    /// @notice Claim accrued rental yield for the caller
    function claimYield() external;

    /// @notice Add or remove `account` from the KYC allowlist (owner only)
    function setAllowlist(address account, bool allowed) external;

    /// @notice Close the funding round and lock the token supply (owner only)
    function closeFunding() external;
}
