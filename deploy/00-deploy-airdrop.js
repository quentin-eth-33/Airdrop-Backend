const {
  networkConfig,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");

const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = 11155111;

  log("----------------------------------------------------");
  const arguments = [
    "0x8103b0a8a00be2ddc778e6e7eaa21791cd364625",
    "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
    "2505",
    "2500000",
  ];
  const airdrop = await deploy("Airdrop", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS,
  });

  await verify(airdrop.address, arguments);
};

module.exports.tags = ["all", "airdrop"];
