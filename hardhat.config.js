require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: process.env.NODE_URL,
      accounts: [`${process.env.ACC_PRIVATE_KEY}`],
    },
  },
};
