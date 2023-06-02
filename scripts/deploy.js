// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const { deploy, log } = deployments;
const { deployer } = await getNamedAccounts();
const chainId = 11155111;

async function main() {
  const arguments = [
    networkConfig[chainId]["vrfCoordinatorV2"],
    networkConfig[chainId]["subscriptionId"],
    networkConfig[chainId]["gasLane"],
    networkConfig[chainId]["callbackGasLimit"],
  ];

  const Airdrop = await hre.ethers.getContractFactory("Airdrop");
  const airdrop = await Airdrop.deploy(arguments);

  await airdrop.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
