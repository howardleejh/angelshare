// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

/// @title TestNFT Drop Collection
/// @author Howard Lee
/// @notice Drop Contract handles whitelisting and other sale features
/// @custom:version 1.0.0

import "./BaseCollection.sol";
import "./Treasury.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DropCollection is BaseCollection, Ownable, ReentrancyGuard {

    bool private reservesTransferred;
    uint256 private reservedCount;
    address[] private reserveList;
    mapping(address => bool) private reserved;
    mapping(address => uint256) private isReserved;
    mapping(uint256 => bool) public isTokenClaimed;
    mapping(uint256 => bool) public isProductClaimed;
    Treasury public immutable treasury;
    uint256 public immutable MINT_PRICE;
    bool public publicSale;

    event AddedReserve(address indexed _address, uint256 indexed tokenId);
    event SetTokenClaimed(address _address, uint256 _tokenId);
    event SetProductClaimed(uint256 indexed _tokenId, string _message);
    event FundsWithdrawn(address indexed _admin, uint256 _amount);

    modifier isPublicSale {
        require(publicSale == true, "publicSale: false");
        _;
    }

    receive() external payable {}

    constructor() {
        MINT_PRICE = 0.1 * 10**18;
        treasury = new Treasury(address(this));
        reservedCount = 1;
    }

    function addReserve(address _address) external onlyOwner {
        require(publicSale == false, "publicSale: true");
        require(reserved[_address] == false, "reserved: true");
        reserved[_address] = true;
        uint256 currentToken = reservedCount;
        isReserved[_address] = currentToken;
        reservedCount += 1;
        reserveList.push(_address);
        emit AddedReserve(_address, currentToken);
    }

    function batchReserve(address[] calldata _reserves) external onlyOwner {
        require(publicSale == false, "publicSale: true");
        require(_reserves.length > 0, "emptyList: true");
        for(uint256 i = 0; i < _reserves.length;i++) {
            require(reserved[_reserves[i]] == false, "reserved: true");
            reserved[_reserves[i]] = true;
            uint256 currentToken = reservedCount;
            isReserved[_reserves[i]] = currentToken;
            reservedCount += 1;
            reserveList.push(_reserves[i]);
            emit AddedReserve( _reserves[i], currentToken);
        }
    }
    
    function saleMint() external payable isPublicSale nonReentrant {
        require(msg.value >= MINT_PRICE, "insufficient funds");
        (bool success, ) = address(this).call{value: MINT_PRICE}("");
        require(success, "Amount: insufficient");

        (bool refundSuccess, ) = msg.sender.call{value: msg.value - MINT_PRICE}("");
        require(refundSuccess, "Amount: insufficient");
        _mint(msg.sender);
    }

    function tokenClaim() external isPublicSale nonReentrant {
        require(reserved[msg.sender] == true, "reserved: false");
        uint256 token = isReserved[msg.sender];
        require(isTokenClaimed[token] == false, "tokenClaimed: true");
        isTokenClaimed[token] = true;
        treasury.withdraw(msg.sender, token);
        emit SetTokenClaimed(msg.sender, token);
    }

    function setPublicSale() external onlyOwner {
        require(publicSale == false, "publicSale: true");
        publicSale = true;
        _transferReserves();
    }

    function setProductClaim(uint256 _tokenId) external onlyOwner {
        require(_exists(_tokenId) == true, "token: doesn't exist");
        require(ownerOf(_tokenId) != address(treasury), "tokenClaimed: false");
        require(isProductClaimed[_tokenId] == false, "productClaimed: true");
        isProductClaimed[_tokenId] = true;
        emit SetProductClaimed(_tokenId, "Product claimed");
    }

    function reveal(string calldata _newBaseURI) external onlyOwner {
        _setNewBaseURI(_newBaseURI);
    }

    function AdminWithdrawFunds(address _admin) external onlyOwner {
        require(address(this).balance > 0, "insufficient amount");
        uint256 funds = address(this).balance;
        (bool success, ) = _admin.call{value: funds}("");
        require(success, "Amount: insufficient");
        emit FundsWithdrawn(_admin, funds);
    }

    function emergencyWithdraw(address _admin, uint256[] calldata _tokenIds) external onlyOwner {
        treasury.emergencyWithdraw(_admin, _tokenIds);
    }

    function getBaseUri() external view onlyOwner returns (string memory) {
        return _baseURI();
    }

    function getReserveList() external view onlyOwner returns (address[] memory) {
        return reserveList;
    }

    function _transferReserves() private {
        require(reserveList.length > 0, "reserveList: empty");
        require(reservesTransferred == false,"reservesTransferred: true");
        reservesTransferred = true;
        for(uint256 i = 0; i < reserveList.length;i++) {
            _mint(address(treasury));
        }
    }
}