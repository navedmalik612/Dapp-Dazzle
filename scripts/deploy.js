// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "DAPP Dazzler"
  const SYMBOL = "DD"

  // Deploy contract
  const DAPPDazz = await ethers.getContractFactory("DappDazzler")
  const dappDazzler = await DAPPDazz.deploy(NAME, SYMBOL)
  await dappDazzler.deployed();

  console.log(`Deployed Domain Contract at: ${dappDazzler.address}\n`)

  // List 8 domains
  const names = ["QuantumPulse.tech","PixelVoyagers.com","StellarSynthetics.net","UrbanEclipse.co","NexusInfinity.io","ZenithQuests.com","LunarVerse.space","NovaSpectrum.net"]
  const costs = [tokens(0.5), tokens(0.25), tokens(0.15), tokens(0.75), tokens(0.3), tokens(0.1), tokens(0.4), tokens(1)]

  for (var i = 0; i < 8; i++) {
    const transaction = await dappDazzler.connect(deployer).list(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
