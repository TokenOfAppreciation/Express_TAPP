const web3 = require('./web3initialized');
const tapContract = require('./tap.js');
const EthereumTx = require('ethereumjs-tx');

const tapInteraction = {
  txData : ""
  , encode : function (addressToValidate) {
    let txData = web3.eth.abi.encodeFunctionCall({
      name: 'validate',
      type: 'function',
      inputs: [{
          type: 'address',
          name: '_fromAddress'
      },{
          type: 'address',
          name: '_recipientAddress'
      }]
      }, [addressToValidate, web3.eth.defaultAccount]);

      this.txData = txData;
  },
  configureTxn : function (txnCount) {
      let rawTx = {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(100000000000),
        gasLimit: web3.utils.toHex(140000),
        to: tapContract.options.address,
        value: web3.utils.toHex(0),
        data: tapInteraction.txData
      };
      const txn = new EthereumTx(rawTx);
      return txn;
    }
  , signTxn : function (txn) {
    let privateKey = Buffer.from('5f2b171db16fdaba948ff26e22665b9c93bb51f28154e7dd978bcc7d0c9479c3', 'hex');
    txn.sign(privateKey);
    return txn;
  }
  , serializeTxn : function (signedTxn) {
    let serializedTxn = signedTxn.serialize();
    return serializedTxn;
  }
  , sendTxn : function (serializedTxn) {
    web3.eth.sendSignedTransaction('0x' + serializedTxn.toString('hex'))
      .on('receipt', console.log);
  }
  , init : function(addressToValidate) {
    let transactionData = tapInteraction.encode(addressToValidate);
    web3.eth.getTransactionCount(web3.eth.defaultAccount)
    .then(tapInteraction.configureTxn)
    .then(tapInteraction.signTxn)
    .then(tapInteraction.serializeTxn)
    .then(tapInteraction.sendTxn);
  }
};

module.exports = tapInteraction;
