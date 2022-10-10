// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

/// @title NFT Treasury Contract
/// @author Howard Lee
/// @notice Stores all the reserved NFTs for claims
/// @custom:version 1.0.0

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Treasury is ERC721Holder, Ownable, ReentrancyGuard { 

    IERC721 public collection;

    event Withdrawn(address _receiver, uint256 _tokenId);

    constructor(address _address) {
        collection = IERC721(_address);
    }

    function withdraw(address _receiver, uint256 _tokenId) external onlyOwner nonReentrant {
        require(collection.ownerOf(_tokenId) == address(this), "token: non-existent");
        collection.safeTransferFrom(address(this), _receiver, _tokenId);
        emit Withdrawn(_receiver, _tokenId);
    }

    function emergencyWithdraw(address _receiver, uint256[] calldata _tokenIds) external onlyOwner nonReentrant {
        require(_tokenIds.length > 0,"emptyList: true");
        for(uint256 i = 0; i < _tokenIds.length;i++) {
            require(collection.ownerOf(_tokenIds[i]) == address(this), "exists: false");
            collection.safeTransferFrom(address(this), _receiver, _tokenIds[i]);
            emit Withdrawn(_receiver, _tokenIds[i]);
        }
    }
}