const hre = require("hardhat"); // Hardhat Runtime Environment

async function main() {
  const ETH_DECIMAL = 10;
  const initialSupply = 1_000_000;
  const DevCoin = await hre.ethers.deployContract(
    "DevCoin",
    initialSupply * ETH_DECIMAL
  );

  await DevCoin.waitForDeployment();
}

main().catch((e) => {
  console.error(error);
  process.exitCode = 1;
});
