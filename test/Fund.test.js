const { assert } = require("chai")
const { ethers, deployments } = require("hardhat")

describe("Fund", function () {
    let deployer
    let fundContract

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["fund"])
        const fund = await deployments.get("Fund")
        fundContract = await ethers.getContractAt("Fund", fund.address)
    })

    describe("fund", function () {
        it("Adds the amount fund", async function () {
            const sendValue = ethers.parseEther("0.1")

            await fundContract.fund({ value: sendValue })

            const response = await fundContract.addressToAmounts(deployer)
            assert.equal(sendValue, response)
        })

        it("Adds array of funders", async function () {
            await fundContract.fund({ value: ethers.parseEther("0.1") })
            const response = await fundContract.funders(0)
            assert.equal(response, deployer)
        })
    })
})
