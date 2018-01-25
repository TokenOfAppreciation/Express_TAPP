const Web3 = require('web3');
const web3 = require('./web3initialized');

// TAP Data
const TAPabi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "Token of Appreciation" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "isValidated", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fromAddress", "type": "address" }, { "name": "_recipientAddress", "type": "address" } ], "name": "validate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newTimeInterval", "type": "uint256" } ], "name": "setTimeInterval", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_recipientAddress", "type": "address" } ], "name": "tap", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "TAP" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "receiver", "type": "address" } ], "name": "Tapped", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "validatedAddress", "type": "address" } ], "name": "Validated", "type": "event" } ];
const TAPaddress = "0x6e4f912249890FF662582D2b08C0891586aee742";

const tapContract = new web3.eth.Contract(TAPabi, TAPaddress, {from:web3.eth.defaultAccount, gas: 200000});

module.exports = tapContract;
