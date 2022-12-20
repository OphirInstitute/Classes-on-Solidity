//Import hardhat-ethers
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

// create the Async function
async function main() {
  //Get contractFactory
  const beerParlourFactory = await ethers.getContractFactory("BeerParlour");
  console.log("Deploying. Please wait.....");

  //deploy contract on hardhat
  const beerParlour = await beerParlourFactory.deploy();
  console.log(`Deployed at ${beerParlour.address}`);

  //Auto-verifying the Contract on Etherscan
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await beerParlour.deployTransaction.wait(6);
    await verify(beerParlour.address, []);
  }

  //   //Checking the Minimum age here
  //   const beerMinimumAge = await beerParlour.getMinimumAge();
  //   console.log(`Minimum Age is ${beerMinimumAge}`);

  //   //submitting age to see if it qualifies - Ade
  //   const inputAge = await beerParlour.age(15);

  //   //Check drinking status
  //   const checkStatus = await beerParlour.beerStatus();
  //   console.log(`Ade is 15: ${checkStatus}`);

  //   //Seyi
  //   const seyi = await beerParlour.age(38);

  //   //Check drinking status
  //   const seyiStatus = await beerParlour.beerStatus();
  //   console.log(`Seyi is 38: ${seyiStatus}`);
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

// call the function
main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
