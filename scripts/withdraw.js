const { ethers, deployments, getNamedAccounts } = require("hardhat")

async function main() {
    const signers = await ethers.getSigners()
    const fund = await deployments.get("Fund")
    const fundContract = await ethers.getContractAt("Fund", fund.address)

    const sendEth = ethers.parseEther("0.1")

    for (i = 0; i < 3; i++) {
        console.log(
            `User(${signers[i].address}) Funded Funding to ${fund.address} 0.1Eth`,
        )
        const connectOtherContract = await fundContract.connect(signers[i])
        await connectOtherContract.fund({ value: sendEth })
    }

    console.log(`Withdraw Funded Amount...`)
    const response = await fundContract.withdraw()
    const reciept = await response.wait()
    console.log(reciept)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
