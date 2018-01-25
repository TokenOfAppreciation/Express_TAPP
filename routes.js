const express = require('express');
const User = require('./models/user');
const router = express.Router();
const passport = require('passport');
const web3 = require('./web3initialized');
const tapContract = require('./tap.js');

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

  // console.log("The default account: " + web3.eth.defaultAccount);
  // console.log("The wallet: " + web3.eth.accounts.wallet[0]);
  // console.log(web3.eth.accounts.wallet);

    tapContract.methods.validate(req.body.address, web3.eth.defaultAccount).send({from: web3.eth.defaultAccount})
    .on('transactionHash', function(hash){
      console.log(hash);
    })
    .on('receipt', function(receipt){
        console.log(receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber);
    })
    .on('error', console.error);

  console.log("Contract address in routes.js: " + tapContract.options.address);

  // let txObject = tapContract.methods.validate(req.body.address, web3.eth.defaultAccount);
  // console.log(txObject);
  // // tapContract.methods.validate(req.body.address, web3.eth.defaultAccount).getData(); //.send({from: web3.eth.defaultAccount, gas: 200000});
  // web3.eth.accounts.signTransaction(txObject, '0x5f2b171db16fdaba948ff26e22665b9c93bb51f28154e7dd978bcc7d0c9479c3');
  //let transactionTx = tapContract.methods.validate(req.body.address, web3.eth.defaultAccount).send();
  //console.log(transactionTx);
  // console.log(tapContract.methods.validate.getData(req.body.address, web3.eth.defaultAccount));
  //
  // console.log("This is the output: " + web3.eth.accounts.signTransaction({tx: transactionTx, gas: 200000, to: tapContract.options.address}, '0x5f2b171db16fdaba948ff26e22665b9c93bb51f28154e7dd978bcc7d0c9479c3').then((object)=>{
  //   console.log(object.rawTransaction.toString('hex'));
  //   web3.eth.sendSignedTransaction(object.rawTransaction.toString('hex')).on('receipt', console.log);
  // }));

})

module.exports = router;
