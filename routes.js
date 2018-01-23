const express = require('express');
const User = require('./models/user');
const router = express.Router();
const passport = require('passport');

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
  console.log(req.body.address);
  res.redirect('/assign.html');
})

module.exports = router;
