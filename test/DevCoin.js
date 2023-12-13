const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DevCoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const initialSupply = 1_000_000_000;

  async function deployTokenFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const devCoinContract = await ethers.getContractFactory("DevCoin");
    const devCoin = await devCoinContract.deploy(owner, initialSupply);

    return { devCoin, owner, otherAccount };
  }

  it("Should deploy and mint initial supply", async function () {
    const { devCoin, owner } = await loadFixture(deployTokenFixture);
    const tokenSupply = await devCoin.totalSupply();

    // Check the total supply
    expect(tokenSupply).to.equal(initialSupply);

    // Check the balance of the deployer
    expect(await devCoin.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("Should transfer token from one address to another", async function () {
    const { devCoin, owner, otherAccount } = await loadFixture(
      deployTokenFixture
    );

    // Transfer tokens to another address
    await devCoin.transfer(otherAccount.address, 1000);

    // Check balance
    expect(await devCoin.balanceOf(otherAccount.address)).to.equal(1000);
  });

  describe("Mint token", () => {
    it("Should mint new tokens to owner address", async function () {
      const newTokenSupply = 2_000_000_000;

      const { devCoin, owner } = await loadFixture(deployTokenFixture);

      // Mint new tokens
      await devCoin.mint(owner, newTokenSupply);

      // Check new balance
      const newBalance = newTokenSupply + initialSupply;
      const balance = await devCoin.balanceOf(owner.address);

      expect(balance).to.equal(newBalance);
    });

    it("Should mint token to the different address", async function () {
      const newTokenSupply = 1_000_000;

      // Get new address
      const newAddress = (await ethers.getSigners())[5];

      const { devCoin } = await loadFixture(deployTokenFixture);

      // Mint new tokens
      await devCoin.mint(newAddress.address, newTokenSupply);

      // Check new balance
      const balance = await devCoin.balanceOf(newAddress.address);

      expect(balance).to.equal(newTokenSupply);
    });
  });
});
