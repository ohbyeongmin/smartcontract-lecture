const { assert, expect } = require("chai")
const { ethers, deployments } = require("hardhat")

describe("Fund", function () {
    let deployer
    let fund

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["fund"])
        const snapFundContract = await deployments.get("Fund")
        fund = await ethers.getContractAt(
            snapFundContract.abi,
            snapFundContract.address,
        )
    })

    describe("fund", function () {
        it("Adds the amount fund", async function () {
            const sendValue = 1
            await fund.fund({ value: sendValue })
            const response = await fund.addressToAmounts(deployer)
            assert.equal(sendValue, response)
        })

        it("Adds array of funders", async function () {
            await fund.fund({ value: 1 })
            const response = await fund.funders(0)
            assert.equal(response, deployer)
        })
    })
})
