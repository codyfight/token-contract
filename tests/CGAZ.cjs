/* eslint-disable no-undef */

const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('CGAZ', async function () {
  let CGAZ, cgaz, owner, addr1, addr2

  const NAME = 'CodyfightGaz'
  const SYMBOL = 'CGAZ'

  async function deployContract(ownerAddress) {
    cgaz = await CGAZ.deploy(ownerAddress)
    await cgaz.deployed()
  }

  this.beforeAll(async function () {
    CGAZ = await ethers.getContractFactory('CodyfightGaz')
    ;[owner, addr1, addr2] = await ethers.getSigners()
  })

  beforeEach(async function () {
    await deployContract(owner.address)
  })

  describe('Deployment', function () {
    it('should deploy with correct name and symbol', async function () {
      expect(await cgaz.name()).to.equal(NAME)
      expect(await cgaz.symbol()).to.equal(SYMBOL)
    })

    it('should not have initial supply', async function () {
      expect(await cgaz.totalSupply()).to.equal(0)
    })

    it('should have 18 decimals', async function () {
      expect(await cgaz.decimals()).to.equal(18)
    })

    it('should set the correct owner', async function () {
      expect(await cgaz.owner()).to.equal(owner.address)
    })

    it('should revert if zero address is set as owner', async function () {
      await expect(
        deployContract(ethers.constants.AddressZero)
      ).to.be.revertedWith('CGAZ: owner cannot be the zero address')
    })
  })

  describe('Minting', function () {
    it('should allow the owner to mint tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(owner.address, mintAmount)

      const ownerBalance = await cgaz.balanceOf(owner.address)
      expect(ownerBalance).to.equal(mintAmount)
      expect(await cgaz.totalSupply()).to.equal(mintAmount)
    })

    it('should revert if a non-owner tries to mint tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await expect(
        cgaz.connect(addr1).mint(addr1.address, mintAmount)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('should revert when minting to the zero address', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await expect(
        cgaz.connect(owner).mint(ethers.constants.AddressZero, mintAmount)
      ).to.be.revertedWith('CGAZ: mint to the zero address')
    })

    it('should batch mint tokens to multiple addresses', async function () {
      const toArr = [owner.address, addr1.address]
      const amountArr = [
        ethers.utils.parseEther('100'),
        ethers.utils.parseEther('200')
      ]

      await cgaz.connect(owner).batchMint(toArr, amountArr)

      const totalSupply = await cgaz.totalSupply()
      const ownerBalance = await cgaz.balanceOf(owner.address)
      const addr1Balance = await cgaz.balanceOf(addr1.address)

      expect(totalSupply).to.equal(amountArr[0].add(amountArr[1]))
      expect(ownerBalance).to.equal(amountArr[0])
      expect(addr1Balance).to.equal(amountArr[1])
    })

    it('should revert when batch minting to different length arrays', async function () {
      const toArr = [owner.address, addr1.address]
      const amountArr = [ethers.utils.parseEther('100')]

      await expect(
        cgaz.connect(owner).batchMint(toArr, amountArr)
      ).to.be.revertedWith(
        'CGAZ: to and amount arrays must have the same length'
      )
    })

    it('should revert if a non-owner tries to batch mint tokens', async function () {
      const toArr = [owner.address, addr1.address]
      const amountArr = [
        ethers.utils.parseEther('100'),
        ethers.utils.parseEther('200')
      ]

      await expect(
        cgaz.connect(addr1).batchMint(toArr, amountArr)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })
  })

  describe('Burning', function () {
    it('should allow token holders to burn their tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      const burnAmount = ethers.utils.parseEther('10')
      const newBalance = mintAmount.sub(burnAmount)

      await cgaz.connect(owner).mint(addr1.address, mintAmount)
      await cgaz.connect(addr1).burn(burnAmount)

      const addr1Balance = await cgaz.balanceOf(addr1.address)
      const totalSupply = await cgaz.totalSupply()

      expect(addr1Balance).to.equal(newBalance)
      expect(totalSupply).to.equal(mintAmount.sub(burnAmount))
    })

    it('should not allow burning more tokens than balance', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(owner.address, mintAmount)

      const burnAmount = mintAmount.add(ethers.utils.parseEther('1'))

      await expect(cgaz.connect(owner).burn(burnAmount)).to.be.revertedWith(
        'CGAZ: insufficient balance'
      )
    })

    it('should allow the owner to burn tokens from any address', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      const burnAmount = ethers.utils.parseEther('10')
      const newBalance = mintAmount.sub(burnAmount)

      await cgaz.connect(owner).mint(addr1.address, mintAmount)
      await cgaz.connect(owner).burnFrom(addr1.address, burnAmount)

      const addr1Balance = await cgaz.balanceOf(addr1.address)
      const totalSupply = await cgaz.totalSupply()

      expect(addr1Balance).to.equal(newBalance)
      expect(totalSupply).to.equal(mintAmount.sub(burnAmount))
    })

    it('should revert if a non-owner tries to burn tokens from any address', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz.connect(addr1).burnFrom(addr1.address, mintAmount)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('should revert when burning from the zero address', async function () {
      await expect(
        cgaz
          .connect(owner)
          .burnFrom(ethers.constants.AddressZero, ethers.utils.parseEther('1'))
      ).to.be.revertedWith('CGAZ: burn from the zero address')
    })

    it('should revert when burning zero tokens', async function () {
      await expect(
        cgaz.connect(owner).burnFrom(owner.address, 0)
      ).to.be.revertedWith('CGAZ: amount must be greater than zero')
    })

    it('should revert if balance is zero', async function () {
      await expect(
        cgaz
          .connect(owner)
          .burnFrom(owner.address, ethers.utils.parseEther('1'))
      ).to.be.revertedWith('CGAZ: insufficient balance')
    })
  })

  describe('Deposits', function () {
    it('should deposit tokens from one address to another by the owner', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await cgaz
        .connect(owner)
        .deposit(addr1.address, addr2.address, mintAmount)

      const addr1Balance = await cgaz.balanceOf(addr1.address)
      const addr2Balance = await cgaz.balanceOf(addr2.address)

      expect(addr1Balance).to.equal(0)
      expect(addr2Balance).to.equal(mintAmount)
    })

    it('should revert if a non-owner tries to deposit tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz.connect(addr1).deposit(addr1.address, addr2.address, mintAmount)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('should revert when depositing to the zero address', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz
          .connect(owner)
          .deposit(addr1.address, ethers.constants.AddressZero, mintAmount)
      ).to.be.revertedWith('CGAZ: deposit to the zero address')
    })

    it('should revert when depositing from the zero address', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz
          .connect(owner)
          .deposit(ethers.constants.AddressZero, addr2.address, mintAmount)
      ).to.be.revertedWith('CGAZ: deposit from the zero address')
    })

    it('should revert when depositing to the same address', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz.connect(owner).deposit(addr1.address, addr1.address, mintAmount)
      ).to.be.revertedWith('CGAZ: cannot deposit to the same address')
    })

    it('should revert when depositing more tokens than balance', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz
          .connect(owner)
          .deposit(
            addr1.address,
            addr2.address,
            mintAmount.add(ethers.utils.parseEther('1'))
          )
      ).to.be.revertedWith('CGAZ: insufficient balance')
    })

    it('should revert when depositing zero tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      await expect(
        cgaz.connect(owner).deposit(addr1.address, addr2.address, 0)
      ).to.be.revertedWith('CGAZ: amount must be greater than zero')
    })
  })

  describe('Transfers', function () {
    it('should revert on any transfer attempt', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(owner.address, mintAmount)

      await expect(
        cgaz.connect(owner).transfer(addr1.address, mintAmount)
      ).to.be.revertedWith('CGAZ: transfers are disabled')
    })

    it('should revert on any transferFrom attempt', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(owner.address, mintAmount)

      await expect(
        cgaz
          .connect(addr1)
          .transferFrom(owner.address, addr1.address, mintAmount)
      ).to.be.revertedWith('CGAZ: transfers are disabled')
    })
  })

  describe('Approvals', function () {
    it('should revert on any approval attempt', async function () {
      await expect(
        cgaz
          .connect(owner)
          .approve(addr1.address, ethers.utils.parseEther('100'))
      ).to.be.revertedWith('CGAZ: approvals are disabled')
    })

    it('should revert on allowance checks', async function () {
      await expect(
        cgaz.connect(owner).allowance(owner.address, addr1.address)
      ).to.be.revertedWith('CGAZ: approvals are disabled')
    })
  })
})
