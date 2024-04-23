import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contractsDir = path.join(__dirname, '..', 'contracts')
const flatDir = path.join(__dirname, '..', 'contracts', 'flat')

const flatten = (contractName) => {
  const contractPath = path.join(contractsDir, `${contractName}.sol`)
  const exportPath = path.join(flatDir, `${contractName}.sol`)
  const cmd = `npx hardhat flatten ${contractPath} > ${exportPath}`
  execSync(cmd)
}

const main = () => {
  if (fs.existsSync(flatDir)) fs.rmSync(flatDir, { recursive: true })

  fs.mkdirSync(flatDir)

  const files = fs.readdirSync(contractsDir)

  files.forEach((file) => {
    const contractName = file.split('.')[0]
    flatten(contractName)
  })

  console.info('Flattened contracts successfully')
}

main()
