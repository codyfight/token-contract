# Codyfight Token $CTOK

![footer-logo](https://github.com/codyfight/token-contract/assets/47956560/460d9ddb-df85-469d-9801-0e4dc5504dd3)

Visit the official [Codyfight website](https://codyfight.com) for more information.

- [Wiki](https://github.com/codyfight/token-contract/wiki)
- [Repository](https://github.com/codyfight/token-contract)
- [White Paper](https://codyfight.gitbook.io/white-paper/tokenomics/codyfight-token-ctok)
- [Arbitrum One](https://arbiscan.io/token/0xa586b3b80d7e3e8d439e25fbc16bc5bcee3e2c85)
- [Hacken Audit](https://hacken.io/audits/codyfight)

# Codyfight Token $CTOK - Project Documentation

## Functional Requirements

### Project Purpose

**CTOK** fuels Codyfight's in-game economy, facilitating asset exchange and rewarding players. It operates on the [Arbitrum](https://arbitrum.io/) blockchain for in-game transactions and broader crypto use.

### Project Features

**CTOK** is a [LERC-20](https://docs.lossless.io/protocol/technical-reference/lerc20) Burnable token, this protocol created and maintained by [Lossless.io](https://lossless.io/) is an [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) implementation that is capable of freezing any fraudulent transaction based on a set of fraud identification parameters.

_References:_

- _[$CTOK](https://codyfight.gitbook.io/white-paper/tokenomics/ctok)_
- _[ERC-20 Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)_
- _[LERC-20 Protocol](https://docs.lossless.io/protocol/technical-reference/lerc20)_
- _[Lossless Controller](https://docs.lossless.io/protocol/technical-reference/lossless-controller)_

### Project Business Logic

**CTOK** smart contract establishes a burnable [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token with additional features for recovery administration and lossless functionality. It inherits from [LERC20Burnable](https://docs.lossless.io/protocol/technical-reference/lerc20), implementing functions for transfers, approvals, and allowance management. Key features include:

- **Lossless Functionality**: Control mechanisms are in place to toggle lossless functionality, enabling additional checks for transfers and approvals via the [Lossless Controller](https://docs.lossless.io/protocol/technical-reference/lossless-controller).

- **Recovery Administration**: The contract facilitates the transfer of recovery admin ownership and the proposal and execution of lossless functionality turn-off.

- **ERC20 Compliance**: Standard [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) functions such as _transfer_, _transferFrom_, _approve_, _increaseAllowance_, and _decreaseAllowance_ are implemented, along with events to track token transfers and approvals.

- **Token Minting and Burning**: Functions for minting and burning tokens are provided, with appropriate checks for balance and allowance. The minting function is only available at contract deployment.

### Use Cases

**CTOK** has plenty of utilities and serves not only as a way to reward players but also as a system to value users’ tasks in-game.

Codyfight is a competitive game and [Codyfighters](https://codyfight.gitbook.io/white-paper/gameplay/in-game-assets/codyfighter) will need to showcase their skills and think efficiently about how to win tokens.

Use cases are community **incentives**, **rewards**, **in-game asset** purchases, **governance** and more:

- Lower costs of in-game transaction fees, keeping them at the bare minimum.
- Reward external project contributors and motivate them to get involved in the success of the project.
- Reward players’ efforts in the gameplay and further their motivation to purchase assets.
- Benefit players who create in-game assets (Codyfighters & AI code).
- Create a valuable system of rewards based on the player's performance.
- Reward for competitive players, team members, and e-sport investors.

These use cases demonstrate the versatile applications of the CodyfightToken smart contract within the gaming ecosystem and beyond, leveraging blockchain technology to enhance user experiences, incentivize participation, and facilitate economic interactions.

_References:_

- _[CTOK Utility](https://codyfight.gitbook.io/white-paper/tokenomics/utilities)_

### Roles and Authorizations

- **Admin Role**:

  - Role Description: The admin role represents the project owner's administrative wallet address, used for Lossless governance decisions and initial token holder.

  - Permissions:
    - Interact with the Lossless protocol for governance decisions.
    - Tokens are minted to the administrative wallet address.

- **Recovery Admin Role**:

  - Role Description: The Recovery Admin role is responsible for managing administrative changes and facilitating recovery procedures within the CodyfightToken (CTOK) contract.

  - Permissions:
    - Transfer Ownership: The Recovery Admin can transfer ownership of the Recovery Admin role to another address by proposing a new candidate.
    - Accept Ownership: Upon the proposal of a new candidate, the Recovery Admin can accept ownership of the Recovery Admin role by providing the correct key.
    - Proposal for Lossless Functionality: The Recovery Admin can propose turning off the lossless functionality, and initiating a governance decision process within the contract.

These permissions empower the Recovery Admin to oversee critical administrative tasks, ensuring the contract's smooth operation and security.

_References:_

- _[Lossless Governance](https://docs.lossless.io/protocol#overview)_

## Technical Requirements

### Project Components

CodyfightToken (CTOK) is a [LERC20Burnable](https://docs.lossless.io/protocol/technical-reference/lerc20) contract. Deploying it requires these parameters:

- **totalSupply**: amount of tokens to be minted (18 decimals);

- **name**: token title;

- **symbol**: token symbol;

- **admin**: project owner’s administrative wallet address, this will be used in Lossless governance decisions. Token creators should set up a wallet that they are planning on using to interact with the Lossless protocol. Tokens are initially minted to this wallet;

- **recoveryAdmin**: project owner’s wallet that is used to change admin. Token creators should use multi-sig for this and keep it as secure as possible as this wallet allows changing the admin wallet;

- **timelockPeriod**: timelock period in seconds dedicated for turning Lossless turn off. In case the project decides to turn off Lossless they would have to wait for this period after initially proposing to turn the Lossless functionality off. Recommended timelockPeriod is 24 hours or 86400 seconds. Any lower timelockPeriod will be considered unsafe and will be marked as such in Lossless platform;

- **lossless**: Lossless protocol controller address. It should be set to Lossless Controller address. Lossless Controller address is different on different chains. Any other address will not allow the token to function properly. You can find the appropriate controller address here.

_References:_

- _[Lossless Integration](https://docs.lossless.io/protocol/guides/lossless-integration-into-the-token/lossless-integration)_

### Technologies Used

The CodyfightToken (CTOK) project employs a diverse set of technologies to build and operate its ecosystem. Here's a breakdown of the key technologies used:

- [**Solidity**](https://soliditylang.org/): Smart contract language.
- [**Arbitrum Blockchain**](https://arbitrum.io/): Layer 2 scaling solution.
- [**ERC-20 Standard**](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/): Token interoperability.
- [**LERC-20 Protocol**](https://docs.lossless.io/protocol/technical-reference/lerc20): Lossless functionality.
- [**OpenZeppelin**](https://www.openzeppelin.com/): Smart contract library.
- [**NatSpec Docs**](https://docs.soliditylang.org/en/latest/natspec-format.html): Human-readable contract documentation (Ethereum Natural Language Specification Format)
- [**Hardhat**](https://hardhat.org/): Ethereum development environment.
- **[Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)**: Testing framework and assertions library.
- [**Ethers.js**](https://docs.ethers.org/v6/): Ethereum interaction library.
- [**TypeScript**](https://www.typescriptlang.org/): JavaScript superset for type safety.
- **[Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/) and more**: Backend development.

CodyfightToken project aims to build a secure, scalable, and feature-rich token ecosystem on the [Arbitrum](https://arbitrum.io/) blockchain, providing users with a seamless and rewarding experience.

### Architectural Design

#### Smart Contracts

- [**LERC20Burnable**](https://github.com/codyfight/token-contract/blob/main/CodyfightToken.sol#L117): Implements core token functionalities including minting, burning, transferring, and allowance management. Integrates lossless functionality through modifiers and events.
- [**CodyfightToken**](https://github.com/codyfight/token-contract/blob/main/CodyfightToken.sol#L762): Main token contract inheriting functionality from LERC20Burnable. Initializes token parameters and interacts with lossless controller.

#### Interfaces

- [**ILssController**](https://github.com/Lossless-Cash/lossless-v4/blob/master/contracts/LosslessControllerV4.sol): Interface defining functions for lossless functionality such as _beforeTransfer_, _beforeApprove_, _beforeBurn_, etc.

#### Admin and Recovery Admin

- Administrative wallet address (admin) and recovery admin wallet address (recoveryAdmin) specified during contract deployment. Recovery admin proposes and executes changes related to lossless functionality and ownership transfer. Admin holds minted tokens and governs the contract, interacting with the lossless protocol for governance decisions.

#### Lossless Functionality

- **CTOK** includes lossless functionality with additional checks and safeguards during token transfers and operations. Toggled on or off by recovery admin for flexibility and security enhancements.

#### Events

- Various events emitted during contract execution to provide visibility into important state changes. Events include _Transfer_, _Approval_, _NewAdmin_, _NewRecoveryAdminProposal_, _NewRecoveryAdmin_, _LosslessTurnOffProposal_, _LosslessOff_, and _LosslessOn_.

#### Modifiers

- Modifiers enforce additional checks and interactions with the lossless controller before executing certain functions. Modifiers such as _lssTransfer_, _lssApprove_, _lssBurn_, etc., ensure secure and efficient contract operations.

Overall, the architecture of the **CTOK** project revolves around secure and efficient smart contracts, with a focus on implementing lossless functionality and providing flexibility for contract administration and ownership. The interaction between the main token contract, lossless controller, admin, and recovery admin ensures robust governance and security for the **CTOK** ecosystem.

#### Testing

The CodyfightToken (CTOK) project includes comprehensive testing to ensure the functionality, security, and reliability of the smart contracts. The testing suite covers various scenarios and edge cases to validate the contract's behavior under different conditions.

#### Deployment

The deployment process involves deploying the **CTOK** smart contract on the Arbitrum blockchain with the specified parameters, including total supply, token name, symbol, admin, recovery admin, timelock period, and lossless controller address. Once deployed, the contract is ready to interact with users and other components of the Codyfight ecosystem.

_References:_

- _[CodyfightToken.sol](https://github.com/codyfight/token-contract/blob/main/CodyfightToken.sol)_
- _[LERC20Burnable.sol](https://github.com/Lossless-Cash/lossless-v4/blob/master/contracts/LERC20Burnable.sol)_
- _[LosslessControllerV4.sol](https://github.com/Lossless-Cash/lossless-v4/blob/master/contracts/LosslessControllerV4.sol)_

## Non-Functional Requirements

### Security Considerations, Compliance and Governance

The CodyfightToken (CTOK) project incorporates several security measures, compliance standards, and governance practices to ensure the safety and integrity of the token ecosystem. Key security features and practices include:

- **ERC-20 Standard:** CTOK follows the ERC-20 token standard, ensuring interoperability with other Ethereum-based tokens and platforms, and compliance with industry norms and guidelines.

- **Lossless Functionality:** The lossless protocol adds an additional layer of security by preventing fraudulent transactions and ensuring the integrity of token transfers and operations.

- **Role-Based Permissions:** The admin and recovery admin roles are carefully defined to manage critical contract functions such as ownership transfer, lossless functionality, and recovery procedures.

- **Timelock Period:** The timelock period for turning off lossless functionality provides a grace period for governance decisions, allowing stakeholders to review and confirm changes before they take effect.

- **Event Logging:** Events are emitted during contract execution to provide visibility into important state changes and transactions, enabling users to monitor contract activities and detect anomalies.

- **Modifiers and Checks:** Modifiers enforce additional checks and interactions with the lossless controller before executing certain functions, ensuring that only authorized transactions are processed.

- **Testing and Auditing:** Comprehensive testing and auditing processes are conducted to validate the contract's functionality, security, and compliance with best practices, minimizing the risk of vulnerabilities and exploits.

By incorporating these security measures and best practices, the CodyfightToken (CTOK) project aims to create a secure and reliable token ecosystem that safeguards user assets and transactions on the [Arbitrum](https://arbitrum.io/) blockchain.

### Scalability and Performance

The CodyfightToken (CTOK) project leverages the [Arbitrum](https://arbitrum.io/) blockchain as a layer 2 scaling solution to enhance scalability and performance for in-game transactions and broader crypto use. By operating on Arbitrum, **CTOK** benefits from:

- **Low Transaction Fees:** Arbitrum offers low transaction fees, making it cost-effective for users to perform token transfers, asset exchanges, and other operations within the Codyfight ecosystem.

- **Fast Transaction Speeds:** Arbitrum provides fast transaction speeds, enabling near-instant confirmation times for token transfers and operations, enhancing the user experience and gameplay efficiency.

- **Scalable Architecture:** The Arbitrum blockchain is designed for scalability, supporting a high throughput of transactions and smart contract interactions, making it suitable for the growing demands of the Codyfight ecosystem.

- **Layer 2 Solutions:** By utilizing layer 2 solutions like Arbitrum, CTOK can offload transaction processing and data storage from the Ethereum mainnet, reducing congestion and improving overall performance for users.

The scalability and performance benefits of operating on Arbitrum enable the CodyfightToken (CTOK) project to deliver a seamless and efficient token ecosystem that meets the needs of players, developers, and stakeholders within the gaming community.

_References:_

- _[Arbitrum Rollup](https://arbitrum.io/rollup)_

### Usability and User Experience

The CodyfightToken (CTOK) project focuses on usability and user experience to provide a seamless and rewarding interaction for players, developers, and stakeholders within the gaming ecosystem. Key usability features and enhancements include:

- **Intuitive Token Operations:** CTOK offers intuitive token operations such as transfers, approvals, and burning, enabling users to interact with the token contract easily and efficiently.

- **NatSpec Documentation:** Human-readable documentation is provided for the smart contract functions, events, and modifiers, making it easier for developers and users to understand the contract's behavior and usage.

By focusing on usability and user experience, the CodyfightToken (CTOK) project aims to create a user-friendly and engaging token ecosystem that empowers players, developers, and stakeholders to participate in the gaming community and benefit from the rewards and incentives offered by CTOK.

# Codyfight Token $CTOK - Contract Documentation

## Context Contract

Context provides information about the transaction sender.

_Context library from OpenZeppelin contracts._

### \_msgSender

```solidity
function _msgSender() internal view virtual returns (address)
```

_Returns the transaction sender address._

#### Return Values

| Name | Type    | Description                              |
| ---- | ------- | ---------------------------------------- |
| [0]  | address | sender\_ The transaction sender address. |

### \_msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

_Returns the transaction data._

#### Return Values

| Name | Type  | Description                  |
| ---- | ----- | ---------------------------- |
| [0]  | bytes | data\_ The transaction data. |

## ILssController

LssController is a contract that implements the lossless feature. It is used to control the lossless feature of the LERC20Burnable contract.
The LssController contract must implement the beforeTransfer, beforeTransferFrom, beforeApprove, beforeIncreaseAllowance, beforeDecreaseAllowance, and beforeBurn functions.
The LssController contract must be set in the LERC20Burnable contract.

_Interface of the LssController._

### beforeTransfer

```solidity
function beforeTransfer(address sender, address recipient, uint256 amount) external
```

_Function to be called before a transfer._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| sender    | address | The sender address.    |
| recipient | address | The recipient address. |
| amount    | uint256 | The transfer amount.   |

### beforeTransferFrom

```solidity
function beforeTransferFrom(address msgSender, address sender, address recipient, uint256 amount) external
```

_Function to be called before a transfer from._

#### Parameters

| Name      | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| msgSender | address | The transaction sender address. |
| sender    | address | The sender address.             |
| recipient | address | The recipient address.          |
| amount    | uint256 | The transfer amount.            |

### beforeApprove

```solidity
function beforeApprove(address sender, address spender, uint256 amount) external
```

_Function to be called before an approve._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| sender  | address | The sender address.  |
| spender | address | The spender address. |
| amount  | uint256 | The approve amount.  |

### beforeIncreaseAllowance

```solidity
function beforeIncreaseAllowance(address msgSender, address spender, uint256 addedValue) external
```

_Function to be called before an increase allowance._

#### Parameters

| Name       | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| msgSender  | address | The transaction sender address. |
| spender    | address | The spender address.            |
| addedValue | uint256 | The added allowance amount.     |

### beforeDecreaseAllowance

```solidity
function beforeDecreaseAllowance(address msgSender, address spender, uint256 subtractedValue) external
```

_Function to be called before a decrease allowance._

#### Parameters

| Name            | Type    | Description                      |
| --------------- | ------- | -------------------------------- |
| msgSender       | address | The transaction sender address.  |
| spender         | address | The spender address.             |
| subtractedValue | uint256 | The subtracted allowance amount. |

### beforeBurn

```solidity
function beforeBurn(address account, uint256 amount) external
```

_Function to be called before a burn._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| account | address | The account address. |
| amount  | uint256 | The burn amount.     |

## LERC20Burnable Contract

LERC20Burnable is a contract that implements the ERC20 standard with burn and lossless features.
The LERC20Burnable contract is based on the OpenZeppelin Context contract.

_LERC20Burnable contract from Lossless.io. Extends the Context contract._

### recoveryAdmin

```solidity
address recoveryAdmin
```

recoveryAdmin is the address of the recovery admin, who can change the admin and turn off the lossless feature.

_Recovery admin variable._

### admin

```solidity
address admin
```

admin is the address of the admin, who will hold the minted tokens and have governance rights.

_Admin variable._

### timelockPeriod

```solidity
uint256 timelockPeriod
```

timelockPeriod is the period in seconds that the recovery admin must wait to turn off the lossless feature.

_Timelock period variable._

### losslessTurnOffTimestamp

```solidity
uint256 losslessTurnOffTimestamp
```

losslessTurnOffTimestamp is the timestamp when the lossless feature will be turned off.

_Lossless turn off timestamp variable._

### isLosslessOn

```solidity
bool isLosslessOn
```

isLosslessOn is a boolean that indicates if the lossless feature is on.

_Lossless on variable._

### lossless

```solidity
contract ILssController lossless
```

lossless is the address of the LssController contract, which implements the lossless feature.

_Lossless controller variable._

### constructor

```solidity
constructor(uint256 totalSupply_, string name_, string symbol_, address admin_, address recoveryAdmin_, uint256 timelockPeriod_, address lossless_) public
```

Constructor sets the initial values of the contract. It mints the total supply to the admin address.

_Constructor function._

#### Parameters

| Name             | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| totalSupply\_    | uint256 | The total supply of the token.             |
| name\_           | string  | The name of the token.                     |
| symbol\_         | string  | The symbol of the token.                   |
| admin\_          | address | The address of the admin.                  |
| recoveryAdmin\_  | address | The address of the recovery admin.         |
| timelockPeriod\_ | uint256 | The timelock period in seconds.            |
| lossless\_       | address | The address of the LssController contract. |

### Transfer

```solidity
event Transfer(address _from, address _to, uint256 _value)
```

_Transfer event._

#### Parameters

| Name    | Type    | Description            |
| ------- | ------- | ---------------------- |
| \_from  | address | The sender address.    |
| \_to    | address | The recipient address. |
| \_value | uint256 | The transfer amount.   |

### Approval

```solidity
event Approval(address _owner, address _spender, uint256 _value)
```

_Approval event._

#### Parameters

| Name      | Type    | Description          |
| --------- | ------- | -------------------- |
| \_owner   | address | The owner address.   |
| \_spender | address | The spender address. |
| \_value   | uint256 | The approve amount.  |

### NewAdmin

```solidity
event NewAdmin(address _newAdmin)
```

_New admin event._

#### Parameters

| Name       | Type    | Description            |
| ---------- | ------- | ---------------------- |
| \_newAdmin | address | The new admin address. |

### NewRecoveryAdminProposal

```solidity
event NewRecoveryAdminProposal(address _candidate)
```

_New recovery admin proposal event._

#### Parameters

| Name        | Type    | Description            |
| ----------- | ------- | ---------------------- |
| \_candidate | address | The candidate address. |

### NewRecoveryAdmin

```solidity
event NewRecoveryAdmin(address _newAdmin)
```

_New recovery admin event._

#### Parameters

| Name       | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| \_newAdmin | address | The new recovery admin address. |

### LosslessTurnOffProposal

```solidity
event LosslessTurnOffProposal(uint256 _turnOffDate)
```

_Lossless turn off proposal event._

#### Parameters

| Name          | Type    | Description                  |
| ------------- | ------- | ---------------------------- |
| \_turnOffDate | uint256 | The turn off date timestamp. |

### LosslessOff

```solidity
event LosslessOff()
```

_Lossless off event._

### LosslessOn

```solidity
event LosslessOn()
```

_Lossless on event._

### lssAprove

```solidity
modifier lssAprove(address spender, uint256 amount)
```

The lssAprove modifier calls the beforeApprove function of the lossless contract.

_Lossless approve modifier._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| spender | address | The spender address. |
| amount  | uint256 | The approve amount.  |

### lssTransfer

```solidity
modifier lssTransfer(address recipient, uint256 amount)
```

The lssTransfer modifier calls the beforeTransfer function of the lossless contract.

_Lossless transfer modifier._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| recipient | address | The recipient address. |
| amount    | uint256 | The transfer amount.   |

### lssTransferFrom

```solidity
modifier lssTransferFrom(address sender, address recipient, uint256 amount)
```

The lssTransferFrom modifier calls the beforeTransferFrom function of the lossless contract.

_Lossless transfer from modifier._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| sender    | address | The sender address.    |
| recipient | address | The recipient address. |
| amount    | uint256 | The transfer amount.   |

### lssBurn

```solidity
modifier lssBurn(address account, uint256 amount)
```

The lssBurn modifier calls the beforeBurn function of the lossless contract.

_Lossless burn modifier._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| account | address | The account address. |
| amount  | uint256 | The burn amount.     |

### lssIncreaseAllowance

```solidity
modifier lssIncreaseAllowance(address spender, uint256 addedValue)
```

The lssIncreaseAllowance modifier calls the beforeIncreaseAllowance function of the lossless contract.

_Lossless increase allowance modifier._

#### Parameters

| Name       | Type    | Description                 |
| ---------- | ------- | --------------------------- |
| spender    | address | The spender address.        |
| addedValue | uint256 | The added allowance amount. |

### lssDecreaseAllowance

```solidity
modifier lssDecreaseAllowance(address spender, uint256 subtractedValue)
```

The lssDecreaseAllowance modifier calls the beforeDecreaseAllowance function of the lossless contract.

_Lossless decrease allowance modifier._

#### Parameters

| Name            | Type    | Description                      |
| --------------- | ------- | -------------------------------- |
| spender         | address | The spender address.             |
| subtractedValue | uint256 | The subtracted allowance amount. |

### onlyRecoveryAdmin

```solidity
modifier onlyRecoveryAdmin()
```

The onlyRecoveryAdmin modifier restricts access to the recovery admin.

_Recovery admin modifier._

### transferOutBlacklistedFunds

```solidity
function transferOutBlacklistedFunds(address[] from) external
```

This function allows the lossless contract to transfer out blacklisted funds.

_Function to transfer out blacklisted funds._

#### Parameters

| Name | Type      | Description                                                      |
| ---- | --------- | ---------------------------------------------------------------- |
| from | address[] | The array of addresses from which the funds will be transferred. |

### setLosslessAdmin

```solidity
function setLosslessAdmin(address newAdmin) external
```

This function allows the recovery admin to set a new admin.

_Function to set new admin._

#### Parameters

| Name     | Type    | Description            |
| -------- | ------- | ---------------------- |
| newAdmin | address | The new admin address. |

### transferRecoveryAdminOwnership

```solidity
function transferRecoveryAdminOwnership(address candidate, bytes32 keyHash) external
```

This function allows the recovery admin to transfer the recovery admin ownership to a candidate address.

_Function to transfer recovery admin ownership._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| candidate | address | The candidate address. |
| keyHash   | bytes32 | The key hash.          |

### acceptRecoveryAdminOwnership

```solidity
function acceptRecoveryAdminOwnership(bytes key) external
```

This function allows the candidate address to accept the recovery admin ownership.

_Function to accept recovery admin ownership._

#### Parameters

| Name | Type  | Description |
| ---- | ----- | ----------- |
| key  | bytes | The key.    |

### proposeLosslessTurnOff

```solidity
function proposeLosslessTurnOff() external
```

This function allows the recovery admin to propose to turn off the lossless features.

_Function to propose lossless turn off._

### executeLosslessTurnOff

```solidity
function executeLosslessTurnOff() external
```

This function allows the recovery admin to execute the lossless turn off, when the timelock period has passed.

_Function to execute lossless turn off._

### executeLosslessTurnOn

```solidity
function executeLosslessTurnOn() external
```

This function allows the recovery admin to execute the lossless turn on.

_Function to execute lossless turn on._

### getAdmin

```solidity
function getAdmin() public view virtual returns (address)
```

_Function to get the admin address._

#### Return Values

| Name | Type    | Description        |
| ---- | ------- | ------------------ |
| [0]  | address | The admin address. |

### name

```solidity
function name() public view virtual returns (string)
```

_Function to get the name of the token._

#### Return Values

| Name | Type   | Description            |
| ---- | ------ | ---------------------- |
| [0]  | string | The name of the token. |

### symbol

```solidity
function symbol() public view virtual returns (string)
```

_Function to get the symbol of the token._

#### Return Values

| Name | Type   | Description              |
| ---- | ------ | ------------------------ |
| [0]  | string | The symbol of the token. |

### decimals

```solidity
function decimals() public view virtual returns (uint8)
```

_Function to get the decimals of the token._

#### Return Values

| Name | Type  | Description                |
| ---- | ----- | -------------------------- |
| [0]  | uint8 | The decimals of the token. |

### totalSupply

```solidity
function totalSupply() public view virtual returns (uint256)
```

_Function to get the total supply of the token._

#### Return Values

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| [0]  | uint256 | The total supply of the token. |

### balanceOf

```solidity
function balanceOf(address account) public view virtual returns (uint256)
```

_Function to get the balance of an account._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| account | address | The account address. |

#### Return Values

| Name | Type    | Description                 |
| ---- | ------- | --------------------------- |
| [0]  | uint256 | The balance of the account. |

### transfer

```solidity
function transfer(address recipient, uint256 amount) public virtual returns (bool)
```

_Function to transfer tokens. Uses the lssTransfer modifier to call the beforeTransfer function of the lossless contract._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| recipient | address | The recipient address. |
| amount    | uint256 | The transfer amount.   |

#### Return Values

| Name | Type | Description                                               |
| ---- | ---- | --------------------------------------------------------- |
| [0]  | bool | A boolean that indicates if the operation was successful. |

### allowance

```solidity
function allowance(address owner, address spender) public view virtual returns (uint256)
```

_Function to get the allowance of a spender on an owner's tokens._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| owner   | address | The owner address.   |
| spender | address | The spender address. |

#### Return Values

| Name | Type    | Description                                         |
| ---- | ------- | --------------------------------------------------- |
| [0]  | uint256 | The allowance of the spender on the owner's tokens. |

### approve

```solidity
function approve(address spender, uint256 amount) public virtual returns (bool)
```

_Function to approve a spender to spend an amount of tokens. Uses the lssAprove modifier to call the beforeApprove function of the lossless contract._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| spender | address | The spender address. |
| amount  | uint256 | The approve amount.  |

#### Return Values

| Name | Type | Description                                               |
| ---- | ---- | --------------------------------------------------------- |
| [0]  | bool | A boolean that indicates if the operation was successful. |

### transferFrom

```solidity
function transferFrom(address sender, address recipient, uint256 amount) public virtual returns (bool)
```

_Function to transfer tokens from an owner to a recipient. Uses the lssTransferFrom modifier to call the beforeTransferFrom function of the lossless contract._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| sender    | address | The sender address.    |
| recipient | address | The recipient address. |
| amount    | uint256 | The transfer amount.   |

#### Return Values

| Name | Type | Description                                               |
| ---- | ---- | --------------------------------------------------------- |
| [0]  | bool | A boolean that indicates if the operation was successful. |

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool)
```

_Function to increase the allowance of a spender. Uses the lssIncreaseAllowance modifier to call the beforeIncreaseAllowance function of the lossless contract._

#### Parameters

| Name       | Type    | Description                 |
| ---------- | ------- | --------------------------- |
| spender    | address | The spender address.        |
| addedValue | uint256 | The added allowance amount. |

#### Return Values

| Name | Type | Description                                               |
| ---- | ---- | --------------------------------------------------------- |
| [0]  | bool | A boolean that indicates if the operation was successful. |

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool)
```

_Function to decrease the allowance of a spender. Uses the lssDecreaseAllowance modifier to call the beforeDecreaseAllowance function of the lossless contract._

#### Parameters

| Name            | Type    | Description                      |
| --------------- | ------- | -------------------------------- |
| spender         | address | The spender address.             |
| subtractedValue | uint256 | The subtracted allowance amount. |

#### Return Values

| Name | Type | Description                                               |
| ---- | ---- | --------------------------------------------------------- |
| [0]  | bool | A boolean that indicates if the operation was successful. |

### \_transfer

```solidity
function _transfer(address sender, address recipient, uint256 amount) internal virtual
```

_Internal function to transfer tokens. Overrides the \_transfer function of the Context contract to enforce specific conditions._

#### Parameters

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| sender    | address | The sender address.    |
| recipient | address | The recipient address. |
| amount    | uint256 | The transfer amount.   |

### \_mint

```solidity
function _mint(address account, uint256 amount) internal virtual
```

Mint function is only executed at contract deployment. No mint function is available after deployment.

_Internal function to mint tokens. Overrides the \_mint function of the Context contract to enforce specific conditions._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| account | address | The account address. |
| amount  | uint256 | The mint amount.     |

### \_burn

```solidity
function _burn(address account, uint256 amount) internal virtual
```

_Internal function to burn tokens. Overrides the \_burn function of the Context contract to enforce specific conditions._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| account | address | The account address. |
| amount  | uint256 | The burn amount.     |

### \_approve

```solidity
function _approve(address owner, address spender, uint256 amount) internal virtual
```

_Internal function to approve a spender to spend an amount of tokens._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| owner   | address | The owner address.   |
| spender | address | The spender address. |
| amount  | uint256 | The approve amount.  |

### burn

```solidity
function burn(uint256 amount) public virtual
```

Burn function may not be allowed if the lossless feature is on, Lossless controller may block the burn.

_Function to burn tokens. Uses the lssBurn modifier to call the beforeBurn function of the lossless contract._

#### Parameters

| Name   | Type    | Description      |
| ------ | ------- | ---------------- |
| amount | uint256 | The burn amount. |

### burnFrom

```solidity
function burnFrom(address account, uint256 amount) public virtual
```

Burn function may not be allowed if the lossless feature is on, Lossless controller may block the burn.

_Function to burn tokens from an account. Uses the lssBurn modifier to call the beforeBurn function of the lossless contract._

#### Parameters

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| account | address | The account address. |
| amount  | uint256 | The burn amount.     |

## CodyfightToken Contract

CodyfightToken is the official token of Codyfight. Tokens are only minted at contract deployment. No mint function is available after deployment. Tokens can be burned.

_CodyfightToken fully inherits the LERC20Burnable contract, which implements the ERC20 standard with burn and lossless features._

### constructor

```solidity
constructor(uint256 totalSupply_, string name_, string symbol_, address admin_, address recoveryAdmin_, uint256 timelockPeriod_, address lossless_) public
```

Constructor sets the initial values of the contract. It mints the total supply to the admin address.

_Constructor function._

#### Parameters

| Name             | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| totalSupply\_    | uint256 | The total supply of the token.             |
| name\_           | string  | The name of the token.                     |
| symbol\_         | string  | The symbol of the token.                   |
| admin\_          | address | The address of the admin.                  |
| recoveryAdmin\_  | address | The address of the recovery admin.         |
| timelockPeriod\_ | uint256 | The timelock period in seconds.            |
| lossless\_       | address | The address of the LssController contract. |

## CodyfightGaz

This contract allows minting and burning but disables transfers and approvals. Only addresses with the MINTER_ROLE can mint new tokens.

_CGAZ is a utility token that follows the ERC20 standard from OpenZeppelin._

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### constructor

```solidity
constructor(address owner) public
```

Constructor initializes the token name and symbol, and sets the owner.

_Constructor function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | The address to be set as the admin of the contract. |

### mint

```solidity
function mint(address to, uint256 amount) public
```

This function allows an address with the MINTER_ROLE to mint tokens to a specific address.

_Function to mint new tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | The address that will receive the newly minted tokens. |
| amount | uint256 | The amount of tokens to be minted. |

### batchMint

```solidity
function batchMint(address[] to, uint256[] amount) external
```

This function allows an address with the MINTER_ROLE to mint tokens to multiple addresses.

_Function to batch mint new tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address[] | An array of addresses that will receive the newly minted tokens. |
| amount | uint256[] | An array of amounts of tokens to be minted. |

### burn

```solidity
function burn(uint256 amount) external
```

This function allows any token holder to burn their own tokens.

_Function to burn tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The amount of tokens to be burned. |

### _transfer

```solidity
function _transfer(address sender, address recipient, uint256 amount) internal
```

This function only allows transfers initiated by addresses with the MINTER_ROLE. All other transfers will be reverted.

_Internal function to transfer tokens._

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) public returns (bool)
```

Only addresses with the MINTER_ROLE can call this function to transfer tokens from a given address.

_Override transferFrom to disable transfers via transferFrom except for addresses with the MINTER_ROLE._
