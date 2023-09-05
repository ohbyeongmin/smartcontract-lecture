const { assert } = require("chai")
const { ethers, deployments } = require("hardhat")

describe("Fund", function () {
    let deployer
    let fund

    beforeEach(async () => {
        // deploy contract
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        fund = await ethers.deployContract("Fund", deployer)

        // Use hardhat-deploy
        // deployer = await getNamedAccounts()
        // await deployments.fixture(["fund"])
        // const snapFundContract = await deployments.get("Fund")
        // fund = await ethers.getContractAt("Fund", snapFundContract.address)
    })

    describe("fund", function () {
        it("Adds the amount fund", async function () {
            const sendValue = ethers.parseEther("0.1")

            await fund.fund({ value: sendValue })

            const response = await fund.addressToAmounts(deployer.address)
            assert.equal(sendValue, response)
        })

        it("Adds array of funders", async function () {
            await fund.fund({ value: ethers.parseEther("0.1") })
            const response = await fund.funders(0)
            assert.equal(response, deployer.address)
        })
    })
})
