/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox")

module.exports = {
    solidity: "0.8.19",
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
