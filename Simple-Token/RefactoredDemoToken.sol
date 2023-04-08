//SPDX-License-Identifier: MIT

/** ============ NOTES =============== //
 * Visibility of a function
 * public, private, external, internal
 * msg.sender is the address calling the function
 * alt + arrow up/down
 * shortcut to comment a line: ctrl + /
 * TWO TYPES OF FUNCTIONS: 1. WRITABLE FUNCTIONS 2. READABLE FUNCTIONS
 * The DRY principle: Don't Repeat Yourself
 * "require" keyword in solidity is used to check conditions
 */

pragma solidity ^0.8.0;

contract OphirToken {
    // 1. Create our token's total Supply
    uint256 public maxSupply = 210000000;
    uint256 public totalAvailableSupply = 21000000;

    mapping(address => uint256) balance;

    // 2. The minting function
    function mintToken(address receiver, uint256 amount) public {
        //totalAvailableSupply = totalAvailableSupply + amount;
        totalAvailableSupply += amount;
        balance[receiver] += amount;
    }

    //balance[location]

    // 3. A function to check to checkBalance
    function checkBalance(address account) public view returns (uint256) {
        return balance[account];
    }

    // 4. Create the transfer function
    // Send some amount of tokens from one account to another account
    function transfer(address receiver, uint256 amount) public {
        // Check the sender's balance is greater > 0
        require(balance[msg.sender] > 0, "Insufficient balance");
        // sender = msg.sender;
        balance[msg.sender] -= amount;
        balance[receiver] += amount;
    }
}
