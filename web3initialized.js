const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/3YTOIgEH760BLrrJK0tm"));



const contractAdminAccount = web3.eth.accounts.privateKeyToAccount('0x5f2b171db16fdaba948ff26e22665b9c93bb51f28154e7dd978bcc7d0c9479c3');
web3.eth.accounts.wallet.add(contractAdminAccount);
web3.eth.defaultAccount = contractAdminAccount.address;

console.log(web3);

module.exports = web3;
