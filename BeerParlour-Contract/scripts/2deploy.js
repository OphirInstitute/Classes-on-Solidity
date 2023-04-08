//Import Hardhat-Ethers
const { ethers, run } = require("hardhat");

//async function
async function main() {
  //get the contract factory
  const ophirTestFactory = await ethers.getContractFactory("OPHIRCLASSTEST");
  console.log("Deploying contract......");

  //deploy
  const ophirTest = await ophirTestFactory.deploy();
  console.log(`Contract Deployed at: ${ophirTest.address}`);

  //interacting with the smart contract
  const getRequirement = await ophirTest.getMinimum();
  console.log(`Minimum Videos is: ${getRequirement}`);

  const inputTests = await ophirTest.watchedVideos(30);

  const checkStatus = await ophirTest.getResult();
  console.log(`Staus: ${checkStatus}`);

  //verifying the contract on etherscan
  console.log("Confirming Transaction........");

  await ophirTest.deployTransaction.wait(6);
  await verify(ophirTest.address, []);
}

async function verify(contractAddress, args) {
  console.log("verifying contract.....");
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
//call function
