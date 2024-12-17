// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TokenTransfer {
    // Mapping to store balances of each address
    mapping(address => uint256) public balances;

    // Event to log transfers
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Constructor to initialize the contract, assigning the sender's balance as the initial token supply
    constructor() {
        uint256 initialSupply = msg.sender.balance; // Use the sender's balance in wei
        balances[msg.sender] = initialSupply;
    }

    // Function to transfer tokens from the sender to the receiver
    function transfer(address receiver, uint256 amount) public returns (bool) {
        require(receiver != address(0), "Invalid receiver address");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Deduct tokens from sender
        balances[msg.sender] -= amount;

        // Add tokens to receiver
        balances[receiver] += amount;

        // Emit transfer event
        emit Transfer(msg.sender, receiver, amount);

        return true;
    }

    // Function to check the balance of a given address
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}
