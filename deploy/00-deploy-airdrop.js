const {
  networkConfig,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { network, ethers } = require("hardhat");

const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  const arguments = [
    networkConfig[chainId]["vrfCoordinatorV2"],
    networkConfig[chainId]["gasLane"],
    networkConfig[chainId]["subscriptionId"],
    networkConfig[chainId]["callbackGasLimit"],
  ];
  const airdrop = await deploy("Airdrop", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS,
  });

  await verify(airdrop.address, arguments);
  console.log("contract address: ", airdrop.address);
};

module.exports.tags = ["all", "airdrop"];
