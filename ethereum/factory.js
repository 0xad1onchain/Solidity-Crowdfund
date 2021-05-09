import web3 from './web3';
import CampaignFactory from './build/CrowdfundFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), 
    // '0xcCE5D9A45AA69a3441eD0f4314060D8E1B960039');    //Rinkebey
    '0xCa84F4Da475f77994eBA11492A29f8a5e66727d3');       //Matic Mumbai   

export default instance;