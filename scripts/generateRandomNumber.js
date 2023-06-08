const { ethers } = require("ethers");
const abi = require("../utils/abi.json");
require("dotenv").config();

async function generateRandomNumber() {
  const contractAddress = "0x55D50Ef6960f779B758F0E85A253927f3a02d306";
  const providerUrl =
    "https://eth-sepolia.g.alchemy.com/v2/-d5Qkr4vrRVVEAK6uM1cw5DQ2L5j2MFL";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  const airdropContract = new ethers.Contract(contractAddress, abi, signer);

  const transaction = await airdropContract.generateRandomNumber();

  // Attendre la confirmation de la transaction
  await transaction.wait();

  console.log("La fonction generateRandomNumber a été appelée avec succès !");
  const randomNumber = await airdropContract.getRandomNumber();
  console.log("Le nombre aléatoire généré est :", randomNumber.toString());
}

generateRandomNumber()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
