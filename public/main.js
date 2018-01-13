let TAPabi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "Token of Appreciation" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "isValidated", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fromAddress", "type": "address" }, { "name": "_recipientAddress", "type": "address" } ], "name": "validate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newTimeInterval", "type": "uint256" } ], "name": "setTimeInterval", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_recipientAddress", "type": "address" } ], "name": "tap", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "TAP" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "receiver", "type": "address" } ], "name": "Tapped", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "validatedAddress", "type": "address" } ], "name": "Validated", "type": "event" } ];
let TAPaddress = "0x6e4f912249890FF662582D2b08C0891586aee742";

let TAP;

window.dummyVariable = 'dummy';

console.log(Web3);
console.log(Web3.version);

// const web3 = require('web3');

window.addEventListener('load', function() {
  if (typeof Web3 !== 'undefined'  && Web3.version.network === '4') {
    console.log("Using external provider on Rinkeby.");
    window.Web3 = new Web3(Web3.currentProvider);
  } else {
    console.warn("TAP is only accessible via the Rinkeby-Testnet"); //mostly for testing&debugging
    // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
  // Initialize Contract
  TAP = new Web3.eth.Contract(TAPabi, TAPaddress);
});

// Initialize Metamask or other provider



// Get information about user

//
