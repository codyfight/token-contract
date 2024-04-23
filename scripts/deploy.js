import pkg from 'hardhat'
import deployer from './deployer.js'
const { ethers } = pkg

// *********************************************
// ************ DEPLOYMENT SCRIPT **************

// *********************************************
// ** REVIEW DEPLOYMENT ARGS BEFORE EXECUTING **
// *********************************************

const deploymentArgs = {
  ctok: {
    totalSupply: ethers.utils.parseEther('127000001'),
    name: 'Codyfight Token',
    symbol: 'CTOK',
    admin: '',
    recoveryAdmin: '',
    timelockPeriod: 0,
    lossless: ''
  }
}

deployer(deploymentArgs)
