# Solidity-Crowdfund
A solidity project demonstrating payable smart contracts on Polygon (Matic)

https://solidity-crowdfund.vercel.app/

#CrowdFund Smart Contract
Currently deployed on Matic Polygon Mumbai Testnet

https://explorer-mumbai.maticvigil.com/address/0xaDD576056e8Fed83F1cBc33cD4353292635E1404

## Info
This contract demonstrates a kickstarter alternative where the factory contract can create new contracts called crowdfund campaigns. These campaigns accept investors with minimum contribution. The campaign owner can create funding requests to a particualr address and after a majority consensus , the funds are transferred by the smart contract to recipient address. 

## Usage
The application is deployed on Polygon testnet and requires users to add Matic Testnet as a network in their connected wallet i.e. Metamask. Refer https://docs.matic.network/docs/develop/metamask/testnet/

## Build

* Fetch dependencies
`npm install`

* Firstly compile solidity contract to Bytecode and ABI
`node compile.js`

* After compilation, the output will be present as separate files for both Crowdfund and CrowdFund Factory contracts

* Now deploy the factory contract
`node deploy.js`

* After solidity contracts are taken care of, Next.js simply allows to run dev environment with the configured dev script
`node run dev`
