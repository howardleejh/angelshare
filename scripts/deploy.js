// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const fs = require('fs')

async function main() {

  const DropCollectionContract = await hre.ethers.getContractFactory("DropCollection")
  const dropCollection = await DropCollectionContract.deploy()

  await dropCollection.deployed()

  try {

    fs.appendFileSync('./.env', `\ndeployedCollectionContract=${dropCollection.address}`, (err) => {
      err ? console.log(err) : console.log('success!')
    })
  } catch (err) {
    console.log(err)
  }
  console.log("NFT Contract deployed to:", dropCollection.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
