module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Fund waiting...")

    const fund = await deploy("Fund", {
        from: deployer,
        args: [],
        log: true,
    })

    log(`Fund deployed at ${fund.address}`)
}

module.exports.tags = ["all", "fund"]
