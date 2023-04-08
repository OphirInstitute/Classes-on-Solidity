//SPDX-License-Identifier: MIT

/* ============== NOTES ==================== //
 * Visibility of a function
 * public, private, external, internal
 * msg.sender
 * alt + arrow up/down
 * shortcut to comment a line: ctrl + /
 * TWO TYPES OF FUNCTIONS: 1. WRITABLE FUNCTIONS 2. READABLE FUNCTIONS
 */

pragma solidity ^0.8.0;

contract OphirArbitrum {
    // 1. Create our token's total Supply
    uint256 public maxSupply = 210000000;
    uint256 public totalAvailableSupply = 21000000;

    mapping(address => uint256) balance;

    // 2. The minting function
    function mintToken(address receiver, uint256 amount) public {
        totalAvailableSupply = totalAvailableSupply - amount;
        balance[receiver] = balance[receiver] + amount;
    }

    //balance[location]

    // 3. A function to check to checkBalance
    function checkBalance(address account) public view returns (uint256) {
        return balance[account];
    }

    // 4. Create the transfer function
    // Send some amount of tokens from one account to another account
    function transfer(address sender, address receiver, uint256 amount) public {
        balance[sender] = balance[sender] - amount;
        balance[receiver] = balance[receiver] + amount;
    }
}
