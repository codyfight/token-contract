/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('CGAZ', async function () {
  let CGAZ, cgaz, owner, addr1, addr2

  const SYMBOL = 'CGAZ'
  const NAME = 'CodyfightGaz'

  const MINTER_ROLE = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes('MINTER_ROLE')
  )
  const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero

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

    it('should assign the correct roles to the owner', async function () {
      expect(await cgaz.hasRole(MINTER_ROLE, owner.address)).to.equal(true)
      expect(await cgaz.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(
        true
      )
    })

    it('should revert if zero address is set as owner', async function () {
      await expect(
        deployContract(ethers.constants.AddressZero)
      ).to.be.revertedWith('CGAZ: owner cannot be the zero address')
    })
  })

  describe('Role Management', function () {
    it('should allow admin to grant MINTER_ROLE to another address', async function () {
      await cgaz.grantRole(MINTER_ROLE, addr1.address)
      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(true)
    })

    it('should revert if a non-admin tries to grant MINTER_ROLE', async function () {
      await expect(
        cgaz.connect(addr1).grantRole(MINTER_ROLE, addr2.address)
      ).to.be.revertedWith(
        `AccessControl: account ${addr1.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
      )
    })

    it('should allow admin to revoke MINTER_ROLE from another address', async function () {
      await cgaz.grantRole(MINTER_ROLE, addr1.address)
      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(true)

      await cgaz.revokeRole(MINTER_ROLE, addr1.address)
      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(false)
    })

    it('should revert if a non-admin tries to revoke MINTER_ROLE', async function () {
      await cgaz.grantRole(MINTER_ROLE, addr1.address)

      await expect(
        cgaz.connect(addr1).revokeRole(MINTER_ROLE, addr2.address)
      ).to.be.revertedWith(
        `AccessControl: account ${addr1.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
      )
    })

    it('should allow an account to renounce its own role', async function () {
      await cgaz.grantRole(MINTER_ROLE, addr1.address)
      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(true)

      await cgaz.connect(addr1).renounceRole(MINTER_ROLE, addr1.address)
      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(false)
    })
  })

  describe('Minting', function () {
    it('should allow an address with MINTER_ROLE to mint tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(owner.address, mintAmount)

      const ownerBalance = await cgaz.balanceOf(owner.address)

      expect(ownerBalance).to.equal(mintAmount)
      expect(await cgaz.totalSupply()).to.equal(mintAmount)
    })

    it('should revert if a non-minter tries to mint tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')

      await expect(
        cgaz.connect(addr1).mint(addr1.address, mintAmount)
      ).to.be.revertedWith(
        `AccessControl: account ${addr1.address.toLowerCase()} is missing role ${MINTER_ROLE}`
      )
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

    it('should revert if a non-minter tries to batch mint tokens', async function () {
      const toArr = [owner.address, addr1.address]
      const amountArr = [
        ethers.utils.parseEther('100'),
        ethers.utils.parseEther('200')
      ]

      await expect(
        cgaz.connect(addr1).batchMint(toArr, amountArr)
      ).to.be.revertedWith(
        `AccessControl: account ${addr1.address.toLowerCase()} is missing role ${MINTER_ROLE}`
      )
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
  })

  describe('Transfers', function () {
    it('should allow the owner to transfer tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      const transferAmount = ethers.utils.parseEther('50')

      await cgaz.connect(owner).mint(owner.address, mintAmount)
      await cgaz.connect(owner).transfer(addr1.address, transferAmount)

      const ownerBalance = await cgaz.balanceOf(owner.address)
      const addr1Balance = await cgaz.balanceOf(addr1.address)

      expect(ownerBalance).to.equal(mintAmount.sub(transferAmount))
      expect(addr1Balance).to.equal(transferAmount)
    })

    it('should allow the owner to transferFrom', async function () {
      const mintAmount = ethers.utils.parseEther('100')

      await cgaz.connect(owner).mint(addr1.address, mintAmount)
      await cgaz.connect(addr1).approve(owner.address, mintAmount)

      await cgaz
        .connect(owner)
        .transferFrom(addr1.address, owner.address, mintAmount)
    })

    it('should revert if a non-minter tries to transfer tokens', async function () {
      const mintAmount = ethers.utils.parseEther('100')

      await cgaz.connect(owner).mint(addr1.address, mintAmount)

      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(false)

      await expect(
        cgaz.connect(addr1).transfer(addr2.address, mintAmount)
      ).to.be.revertedWith(
        'CGAZ: only addresses with MINTER_ROLE can transfer tokens'
      )
    })

    it('should revert on any transferFrom attempt by non-minter', async function () {
      const mintAmount = ethers.utils.parseEther('100')
      await cgaz.connect(owner).mint(addr1.address, mintAmount)
      await cgaz.connect(addr1).approve(owner.address, mintAmount)

      expect(await cgaz.hasRole(MINTER_ROLE, addr1.address)).to.equal(false)

      await expect(
        cgaz
          .connect(addr1)
          .transferFrom(addr1.address, owner.address, mintAmount)
      ).to.be.revertedWith(
        'CGAZ: only addresses with MINTER_ROLE can transfer tokens'
      )
    })
  })
})
