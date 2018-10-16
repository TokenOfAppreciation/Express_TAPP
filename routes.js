const express = require('express');
const User = require('./models/user');
const router = express.Router();
const passport = require('passport');
const tapInteraction = require('./tapInteraction');
const ejs = require('ejs')

router.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  res.locals.login = req.isAuthenticated();
  res.locals.addressAssigned = false;
  next();
});

router.get('/', function(req, res, next){
  if(res.locals.login){
    User.find({email: req.user.email}).then(function(queryObject){
      res.locals.addressAssigned = queryObject[0].assigned;
    });
  };
  res.render('transfer', {login : res.locals.login, addressAssigned : res.locals.addressAssigned});
});

router.get('/assign', function(req,res, next){
  if(res.locals.login){
    res.render('assign');
  } else {
    res.redirect('/');
  };
});

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/' }),
  function(req, res) {
      User.find({email: req.user.email}).then(function(queryObject){
        res.locals.addressAssigned = queryObject[0].assigned;
      });
    res.redirect('/');
  });

router.post('/assign', function(req, res, next){
  res.redirect('/assign');
  tapInteraction.init(req.body.address);
 })

 // router.get('/debug',function(req, res, next){
 //
 // });

module.exports = router;
