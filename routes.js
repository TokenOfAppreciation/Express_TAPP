const express = require('express');
const User = require('./models/user');
const router = express.Router();

router.use(function(){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

module.exports = router;
