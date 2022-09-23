// SPDX-License-Identifier: MIT LICENSE

import "./SKDPlus.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.4;

contract AirDropNFT is Ownable {
    
    uint256 public airDrop = 10 ether;
    SKDPlus rewards;

    constructor(SKDPlus _rewards) {
        rewards = _rewards;
    }

    function issueAirDropERC20(address[] calldata holder) public onlyOwner {
        rewards.mintAirdrop(holder, airDrop);
    }
}
