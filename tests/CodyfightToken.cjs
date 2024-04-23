/* eslint-disable no-undef */

const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('CTOK', async function () {
  let CTOK, ctok, deployer, admin, recovery, addr1, addr2, defConstructorArgs

  const NAME = 'Codyfight Token'
  const SYMBOL = 'CTOK'
  const TIME_LOCK_PERIOD = 0 // seconds
  const LOSSLESS_CONTROLLER = '0xF601afcc4A2a1f991bf46AE37Fa87C9732aBbF84'
  const ctokInitialSupply = ethers.utils.parseEther('127000001')

  async function deployContract(args) {
    ctok = await CTOK.deploy(...Object.values(args))
    await ctok.deployed()
  }

  this.beforeAll(async function () {
    CTOK = await ethers.getContractFactory('CodyfightToken')
    ;[deployer, admin, recovery, addr1, addr2] = await ethers.getSigners()

    defConstructorArgs = {
      totalSupply: ctokInitialSupply,
      name: NAME,
      symbol: SYMBOL,
      admin: admin.address,
      recoveryAdmin: recovery.address,
      timelockPeriod: TIME_LOCK_PERIOD,
      lossless: LOSSLESS_CONTROLLER
    }
  })

  beforeEach(async function () {
    await deployContract(defConstructorArgs)
  })

  describe('Deployment', function () {
    it('should have isLosslessOn set to true', async function () {
      expect(await ctok.isLosslessOn()).to.be.true
    })

    it('should set the right admin', async function () {
      expect(await ctok.getAdmin()).to.equal(admin.address)
    })

    it('should assign the total supply of tokens to the admin', async function () {
      const adminBalance = await ctok.balanceOf(admin.address)
      expect(await ctok.totalSupply()).to.equal(adminBalance)
    })

    it('should not mint tokens to the deployer', async function () {
      const adminBalance = await ctok.balanceOf(deployer.address)
      expect(adminBalance).to.equal(0)
    })

    it('should not set lossless controller as zero address', async function () {
      await expect(
        deployContract({
          ...defConstructorArgs,
          lossless: '0x0000000000000000000000000000000000000000'
        })
      ).to.be.revertedWith('LERC20: Lossless controller cannot be zero address')
    })
  })

  describe('Getters', function () {
    it('should get the supply', async function () {
      expect(await ctok.totalSupply()).to.equal(ctokInitialSupply)
    })

    it('should get admin', async function () {
      expect(await ctok.getAdmin()).to.equal(admin.address)
    })

    it('should get recovery admin', async function () {
      expect(await ctok.recoveryAdmin()).to.equal(recovery.address)
    })

    it('should get lossless controller', async function () {
      expect(await ctok.lossless()).to.equal(LOSSLESS_CONTROLLER)
    })

    it('should get time lock period', async function () {
      expect(await ctok.timelockPeriod()).to.equal(TIME_LOCK_PERIOD)
    })

    it('should get losslessTurnOffTimestamp', async function () {
      expect(await ctok.losslessTurnOffTimestamp()).to.equal(0)
    })

    it('should get name', async function () {
      expect(await ctok.name()).to.equal(NAME)
    })

    it('should get symbol', async function () {
      expect(await ctok.symbol()).to.equal(SYMBOL)
    })

    it('should get decimals', async function () {
      expect(await ctok.decimals()).to.equal(18)
    })

    it('should get balance of an account', async function () {
      const balance = await ctok.balanceOf(admin.address)
      expect(balance).to.equal(ctokInitialSupply)
    })

    it('should not have direct access to initial supply', async function () {
      expect(ctok._initialSupply).to.be.undefined
    })
  })

  describe('Minting & Burning', function () {
    beforeEach(async function () {
      await ctok.connect(recovery).proposeLosslessTurnOff()
      await ctok.connect(recovery).executeLosslessTurnOff()
      expect(await ctok.isLosslessOn()).to.be.false
    })

    it('should mint on deployment', async function () {
      expect(await ctok.totalSupply()).to.equal(ctokInitialSupply)
    })

    it('should not mint', async function () {
      expect(ctok._mint).to.be.undefined
      expect(ctok.mint).to.be.undefined
    })

    it('should burn tokens', async function () {
      const burnAmount = ethers.utils.parseEther('100')

      await ctok.connect(admin).burn(burnAmount)

      const totalSupply = await ctok.totalSupply()
      const balance = await ctok.balanceOf(admin.address)

      expect(ctok._burn).to.be.undefined
      expect(totalSupply).to.equal(ctokInitialSupply.sub(burnAmount))
      expect(balance).to.equal(ctokInitialSupply.sub(burnAmount))
    })

    it('should not burn tokens greater than balance', async function () {
      const amount = ethers.utils.parseEther('100')
      const greaterValue = ethers.utils.parseEther('101')

      await ctok.connect(admin).transfer(addr1.address, amount)

      const initialBalance = await ctok.connect(addr1).balanceOf(addr1.address)

      expect(initialBalance).to.equal(amount)

      await expect(ctok.connect(addr1).burn(greaterValue)).to.be.revertedWith(
        'ERC20: burn amount exceeds balance'
      )

      const finalBalance = await ctok.connect(addr1).balanceOf(addr1.address)
      expect(finalBalance).to.equal(initialBalance)
    })
  })

  describe('Transfers', function () {
    beforeEach(async function () {
      await ctok.connect(recovery).proposeLosslessTurnOff()
      await ctok.connect(recovery).executeLosslessTurnOff()
      expect(await ctok.isLosslessOn()).to.be.false
    })

    it('should transfer tokens between accounts without changing total supply', async function () {
      const recipient = addr1.address
      const amount = ethers.utils.parseEther('50')

      await ctok.connect(admin).transfer(recipient, amount)

      const balance = await ctok.balanceOf(recipient)

      expect(balance).to.equal(amount)

      await ctok.connect(addr1).transfer(addr2.address, amount)

      const addr1Balance = await ctok.balanceOf(addr1.address)
      const addr2Balance = await ctok.balanceOf(addr2.address)

      expect(addr1Balance).to.equal(0)
      expect(addr2Balance).to.equal(amount)

      const totalSupply = await ctok.totalSupply()
      expect(totalSupply).to.equal(ctokInitialSupply)
    })

    it('should not transfer tokens greater than balance', async function () {
      const balance = await ctok.balanceOf(admin.address)
      const greaterValue = balance.add(ethers.utils.parseEther('1'))

      await expect(
        ctok.connect(admin).transfer(addr1.address, greaterValue)
      ).to.be.revertedWith('LERC20: transfer amount exceeds balance')

      const finalBalance = await ctok.balanceOf(admin.address)
      expect(finalBalance).to.equal(balance)
    })

    it('should approve spender', async function () {
      const spender = addr1.address
      const amount = ethers.utils.parseEther('100')

      await ctok.connect(admin).transfer(spender, amount)
      await expect(ctok.connect(admin).approve(spender, amount)).to.not.be
        .reverted

      expect(
        await ctok.connect(admin).allowance(admin.address, spender)
      ).to.equal(amount)

      const balance = await ctok.balanceOf(spender)
      expect(balance).to.equal(amount)
    })

    it('should not approve spender with amount greater than balance', async function () {
      const spender = addr1.address
      const amount = ethers.utils.parseEther('100')

      await ctok.connect(admin).transfer(spender, amount)
      await ctok.connect(addr1).approve(admin.address, amount.add(1))

      expect(
        await ctok.connect(admin).allowance(admin.address, spender)
      ).to.equal(0)

      const newBalance = await ctok.balanceOf(spender)
      expect(newBalance).to.equal(amount)
    })

    it('should transferFrom tokens with allowance', async function () {
      const spender = admin.address
      const recipient = addr1.address
      const amount = ethers.utils.parseEther('50')

      await ctok.connect(admin).approve(spender, amount)
      await ctok.connect(admin).transferFrom(spender, recipient, amount)

      const spenderBalance = await ctok.balanceOf(spender)
      expect(spenderBalance).to.equal(ctokInitialSupply.sub(amount))

      const recipientBalance = await ctok.balanceOf(recipient)
      expect(recipientBalance).to.equal(amount)

      const totalSupply = await ctok.totalSupply()
      expect(totalSupply).to.equal(ctokInitialSupply)
    })

    it('should not transferFrom if approval is not set', async function () {
      const spender = admin.address
      const recipient = addr1.address
      const amount = ethers.utils.parseEther('50')

      await expect(
        ctok.connect(admin).transferFrom(spender, recipient, amount)
      ).to.be.revertedWith('LERC20: transfer amount exceeds allowance')

      await expect(
        ctok.connect(addr1).transferFrom(spender, recipient, amount)
      ).to.be.revertedWith('LERC20: transfer amount exceeds allowance')

      const adminBalance = await ctok.balanceOf(admin.address)
      expect(adminBalance).to.equal(ctokInitialSupply)
    })

    it('should not transferFrom tokens greater than allowance', async function () {
      const spender = admin.address
      const recipient = addr1.address
      const amount = ethers.utils.parseEther('50')

      await ctok.connect(admin).approve(spender, amount)

      await expect(
        ctok.connect(admin).transferFrom(spender, recipient, amount.add(1))
      ).to.be.revertedWith('LERC20: transfer amount exceeds allowance')
    })
  })

  describe('Lossless Toggle', function () {
    let TIME_LOCK_PERIOD_TMP = 3

    beforeEach(async function () {
      await deployContract({
        ...defConstructorArgs,
        timelockPeriod: TIME_LOCK_PERIOD_TMP
      })
    })

    it('should toggle isLosslessOn with a proposal', async function () {
      expect(await ctok.connect(recovery).proposeLosslessTurnOff()).to.emit(
        ctok,
        'LosslessTurnOffProposal'
      )
      expect(await ctok.isLosslessOn()).to.be.true

      await new Promise((resolve) =>
        setTimeout(resolve, TIME_LOCK_PERIOD_TMP * 1000)
      )

      expect(await ctok.connect(recovery).executeLosslessTurnOff()).to.emit(
        ctok,
        'LosslessOff'
      )

      expect(await ctok.isLosslessOn()).to.be.false
    })

    it('should not turn off lossless before the time lock period', async function () {
      expect(await ctok.connect(recovery).proposeLosslessTurnOff()).to.emit(
        ctok,
        'LosslessTurnOffProposal'
      )
      expect(await ctok.isLosslessOn()).to.be.true

      await new Promise((resolve) =>
        setTimeout(resolve, (TIME_LOCK_PERIOD_TMP - 1) * 1000)
      )

      await expect(
        ctok.connect(recovery).executeLosslessTurnOff()
      ).to.be.revertedWith('LERC20: Time lock in progress')

      expect(await ctok.isLosslessOn()).to.be.true
    })

    it('should not turn off lossless without a proposal', async function () {
      await expect(
        ctok.connect(recovery).executeLosslessTurnOff()
      ).to.be.revertedWith('LERC20: TurnOff not proposed')
    })
  })
})
