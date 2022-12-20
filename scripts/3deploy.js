//import ethers
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

//create the async function
async function main() {
  const safeLunaFactory = await ethers.getContractFactory("SAFELUNA");
  console.log("Deploying Contract.......");

  const safeLuna = await safeLunaFactory.deploy();
  console.log(`Deployed At: ${safeLuna.address}`);

  //Interacting with the contract
  const account1 = "0x1339514086Fc15C5e38AF4E0407C469Ca3911992";
  const account2 = "0xaA96052CbEFc4d9c8daEB069884A99E2cEFFB371";
  const account3 = "0x5312296ad75C7f95A9e19bD8adF1617402b3e703";

  //check token supply
  const checkTotalSupply = await safeLuna.totalSupply();
  console.log(`Token TotalSupply is: ${checkTotalSupply}`);

  const checkAccount1Balance1 = await safeLuna.checkbalance(account1);
  console.log(`Account1 Balance before mint is: ${checkAccount1Balance1}`);

  //lets mint some tokens
  const mintTokens = await safeLuna.mint(account1, 5000000);

  //checkTokenBalance for Account 1
  const checkAccount1Balance = await safeLuna.checkbalance(account1);
  console.log(`Account1 Balance after mint is: ${checkAccount1Balance}`);

  //checkTokenBalance for Account 2
  const checkAccount2Balance = await safeLuna.checkbalance(account2);
  console.log(`Account2 Balance is: ${checkAccount2Balance}`);

  // //Transfer tokens to account 2
  // const transferTokensTo2 = await safeLuna.transfer(account1, account2, 200000);

  // //Transfer tokens to account 3
  // const transferTokensTo3 = await safeLuna.transfer(account1, account3, 200000);

  //check the updated balances
  const updatedAccount2Balance = await safeLuna.checkbalance(account2);
  const updatedAccount1Balance = await safeLuna.checkbalance(account1);
  const updatedAccount3Balance = await safeLuna.checkbalance(account3);
  console.log(`Account2 new Balance is: ${updatedAccount2Balance}`);
  console.log(`Account1 new Balance is: ${updatedAccount1Balance}`);
  console.log(`Account3 new balance is: ${updatedAccount3Balance}`);

  //verifying the contract on etherscan
  console.log("Confirming Transaction........");

  //Auto-verifying the Contract on Etherscan
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await safeLuna.deployTransaction.wait(6);
    await verify(safeLuna.address, []);
  }

  const updatedTotalSupply = await safeLuna.totalSupply();
  console.log(`Updated TotalSupply is: ${updatedTotalSupply}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract.....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already Verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

//call the function
main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
