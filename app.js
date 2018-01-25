const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');
const passport = require('passport');
const User = require('./models/user');
const setUpPassport = require('./setuppassport');



// -- configuring https server (later.)

const app = express();
app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://app:EXJr0lstuyvHhDU7@cluster0-shard-00-00-9i8yq.mongodb.net:27017,cluster0-shard-00-01-9i8yq.mongodb.net:27017,cluster0-shard-00-02-9i8yq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
setUpPassport();
// -- middleware

app.use(logger('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
  secret: 'BF;FGvLTx/vWH+GM9Nd8VsvRebQgY',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// -- I think I will have to move this to the routes folder?
let publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(routes);

// -- Server Start ----------------
app.listen(app.get('port'), function() {
  console.log('Server started on port '+ app.get('port'));
});
