import pkg from 'hardhat'
import inquirer from 'inquirer'

const { ethers } = pkg

export default async function deployer(deploymentArgs) {
  async function logDeploymentMessage(contractName, deployer) {
    console.info(
      `blockchain-api: Deploying ${contractName} contract with the account: ${deployer?.address}`
    )
  }

  async function deployCtok(deploymentArgs) {
    const [deployer] = await ethers.getSigners()
    logDeploymentMessage('CodyfightToken', deployer)

    const Ctok = await ethers.getContractFactory('CodyfightToken')
    const ctok = await Ctok.deploy(...Object.values(deploymentArgs.ctok))
    await ctok.deployed()

    console.info(`blockchain-api: CTOK deployed to: ${ctok?.address}`)

    return ctok
  }

  async function executeDeployContracts(contractSelection, deploymentArgs) {
    let ctok

    const addressMap = {}

    if (contractSelection.includes('ctok')) {
      ctok = await deployCtok(deploymentArgs)
      addressMap.ctok = ctok.address
    }

    const revertAddressMap = Object.fromEntries(
      Object.entries(addressMap).map(([key, value]) => [value, key])
    )

    console.info(`
  ------
  addresses.ts:
  ${JSON.stringify(revertAddressMap, null, 2)}
  ------`)
  }

  async function main(deploymentArgs) {
    const { deployContracts, contractSelection } = await inquirer.prompt([
      {
        default: true,
        type: 'confirm',
        name: 'deployContracts',
        message:
          'REVIEW DEPLOYMENT ARGS BEFORE EXECUTING. Do you want to deploy contracts?'
      },
      {
        type: 'checkbox',
        name: 'contractSelection',
        message: 'Select contracts to deploy:',
        choices: ['ctok'],
        default: ['ctok'],
        when: (answers) => answers.deployContracts
      }
    ])

    if (deployContracts && contractSelection?.length) {
      return await executeDeployContracts(contractSelection, deploymentArgs)
    }

    console.warn('No contracts deployed.')
  }

  main(deploymentArgs)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(`blockchain-api: ${error}`)
      process.exit(1)
    })
}
