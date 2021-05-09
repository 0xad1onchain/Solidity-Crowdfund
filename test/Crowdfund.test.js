const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CrowdfundFactory.json');
const compiledCrowdfund = require('../ethereum/build/Crowdfund.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach ( async () => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });


    await factory.methods.createContract([100]).send({ 
        from: accounts[0], 
        gas: '1000000' 
    });

    campaignAddress = await factory.methods.deployedContracts(0).call();
    
    campaign = await new web3.eth.Contract(JSON.parse(compiledCrowdfund.interface), campaignAddress);
});

describe('Crowdfund Campaigns', () => {
    it ('deploys a factory and a contract', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it ('marks caller as the campaign manager', async () => {
        const managerAddress = await campaign.methods.manager().call();
        assert.strictEqual(accounts[0], managerAddress);
    });

    it ('allows to contribute money and mark as approver', async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it ('requires a minimum contribution to be added', async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: '80'
            });
            assert(false);
        } catch (err){
            assert(true);
        }
    });

    it ('allows manager to make request', async () => {
        await campaign.methods
            .createRequest('Buy Batteries', 100, accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        const request = await campaign.methods.requests(0).call();
        assert.strictEqual('Buy Batteries', request.description);
    });

    it ('processes request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('Dummy', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        assert(balance > 104);
    });
}) 