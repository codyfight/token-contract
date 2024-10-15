require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomicfoundation/hardhat-toolbox')

const config = {
  solidity: {
    version: '0.8.25',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    prod: {
      url: process.env.WEB3_PROVIDER_URL,
      accounts: [process.env.CONTRACT_OWNER_WALLET_PRIVATE_KEY]
    }
  },
  paths: {
    root: './',
    sources: './contracts',
    artifacts: './artifacts',
    tests: './tests'
  },
  ignore: [
    './tests/*',
    './contracts/draft/*',
    './contracts/flat/*',
    './contracts/lib/*'
  ]
}

module.exports = config
