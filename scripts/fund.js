const { ethers, deployments, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const snapFundContract = await deployments.get("Fund")
    const fund = await ethers.getContractAt("Fund", snapFundContract.address)

    console.log(`Get Fund Contract at ${await fund.getAddress()}`)
    console.log("Funding to contract...")

    const response = await fund.fund({ value: ethers.parseEther("0.1") })
    const reciept = await response.wait(1)

    console.log(reciept)
    console.log("Finished")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
