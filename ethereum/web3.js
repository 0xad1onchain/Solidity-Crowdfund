import Web3 from "web3";

let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    // "https://rinkeby.infura.io/v3/xxx"               //Rinkeby
    'https://rpc-mumbai.maticvigil.com/v1/b1a03e3ae74f4177bd0f1a2a377e96f2f1d20eeb'  //Matic Testnet

  );
  web3 = new Web3(provider);
}

// const checkBalance = async () => {
//     const acc = await web3.eth.getAccounts();
//     console.log(acc);
//     const bal = await web3.eth.getBalance(acc[0]);
//     console.log(bal);
// };

// checkBalance();

export default web3;