const express = require('express');
const User = require('./models/user');
const router = express.Router();
const passport = require('passport');
const web3 = require('./web3initialized');
const tapContract = require('./tap.js');
const EthereumTx = require('ethereumjs-tx')


router.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

// router.get('/auth/facebook', passport.authenticate('facebook', {scope:"email"}));
// router.get('/auth/facebook/callback', passport.authenticate('facebook',
// { successRedirect: '/', failureRedirect: '/' }));

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.post('/assign', function(req, res, next){
  res.redirect('/assign.html');

  function configureTxn(txnCount) {
   //console.log(util.inspect(args, false, null));
//   let txObject = '0x221e2efc';
//   let txData = web3.eth.abi.encodeParameters(['address', 'address'], [req.body.address, web3.eth.defaultAccount]);
  // let txDataPruned = txObject + txData;
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
}, [req.body.address, web3.eth.defaultAccount]);

   //console.log(txObject);
   //console.log(txnCount);
   console.log(txData);
   console.log(web3.utils.toHex(txnCount));

   // ----- generating a Tx-Object
   let rawTx = {
     nonce: web3.utils.toHex(txnCount),
     gasPrice: web3.utils.toHex(100000000000),
     gasLimit: web3.utils.toHex(140000),
     to: tapContract.options.address,
     value: web3.utils.toHex(0),
     data: txData
   };

     const privateKey = Buffer.from('5f2b171db16fdaba948ff26e22665b9c93bb51f28154e7dd978bcc7d0c9479c3', 'hex');

     const txn = new EthereumTx(rawTx);
     txn.sign(privateKey);
     const serializedTxn = txn.serialize();

     web3.eth.sendSignedTransaction('0x' + serializedTxn.toString('hex'))
     .on('receipt', console.log);

 };
 web3.eth.getTransactionCount(web3.eth.defaultAccount).then(configureTxn);




})

module.exports = router;
