// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

/// @title TestNFT Collection
/// @author Howard Lee
/// @notice Base Collection Contract handles mainly NFTs
/// @custom:version 1.0.0

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BaseCollection is ERC721URIStorage {

using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    uint256 immutable public MAX_SUPPLY;
    string private BaseURI;

    event Minted(address indexed _minter, uint256 indexed _tokenId);
    event URIChanged(string _newURI);

    constructor() ERC721("Test NFT", "TEST") {
        MAX_SUPPLY = 200;
        BaseURI = "https://www.google.com/";
    }

    function getBalance() external view returns (uint256) {
        return MAX_SUPPLY - _tokenIds.current();
    }

    function _mint(address _owner) internal {
        _tokenIds.increment();
        require(_tokenIds.current() <= MAX_SUPPLY, "fully minted");
        uint256 newItemId = _tokenIds.current();
        _safeMint(_owner, newItemId);

        emit Minted(msg.sender, newItemId);
    }

    function _setNewBaseURI(string calldata _newURI) internal {
        BaseURI = _newURI;
        emit URIChanged(_newURI);
    }

    function _baseURI() internal override view returns (string memory) {
        return BaseURI;
    }

    function _getBalance() internal view returns (uint256) {
        return MAX_SUPPLY - _tokenIds.current();
    }
}