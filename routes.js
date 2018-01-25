const express = require('express');
const User = require('./models/user');
const router = express.Router();
const passport = require('passport');
const tapInteraction = require('./tapInteraction');


router.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.post('/assign', function(req, res, next){
  res.redirect('/assign.html');
  tapInteraction.init(req.body.address);
 })

module.exports = router;
