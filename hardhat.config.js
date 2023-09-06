/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox")

module.exports = {
    solidity: "0.8.19",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.PRIVATE_KEY],
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user1: {
            default: 1,
        },
        user2: {
            default: 2,
        },
    },
}
