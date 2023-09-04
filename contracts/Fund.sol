// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Fund {
    address public owner;
    address[] public funders;
    mapping(address => uint256) public addressToAmounts;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function fund() public payable {
        addressToAmounts[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmounts[funder] = 0;
        }

        funders = new address[](0);

        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getMyFundedAmounts() public view returns (uint256) {
        return addressToAmounts[msg.sender];
    }
}
