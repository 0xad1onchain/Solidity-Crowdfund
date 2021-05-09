const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CrowdfundFactory.json');

const provider = new HDWalletProvider(
    'pass trash sign point cake enjoy public supply hunt upon reject supreme',
    // 'https://rinkeby.infura.io/v3/1194a83d8d16417cb5ec0de60deba7d7'
    'https://rpc-mumbai.maticvigil.com/v1/b1a03e3ae74f4177bd0f1a2a377e96f2f1d20eeb'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};

deploy();