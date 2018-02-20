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
const ejs = require("ejs");

// TODO
// -- can this file be cleaned up in a meaningful way?
// -- configuring https server (later.)

const app = express();
app.set('port', process.env.PORT || 3000);

// Connect to DB
mongoose.connect('mongodb://app:EXJr0lstuyvHhDU7@cluster0-shard-00-00-9i8yq.mongodb.net:27017,cluster0-shard-00-01-9i8yq.mongodb.net:27017,cluster0-shard-00-02-9i8yq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
setUpPassport();
// -- middleware
// setting the logger
app.use(logger('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// How does the sessions middleware interact / relate to the passport middleware?
app.use(session({
  secret: 'BF;FGvLTx/vWH+GM9Nd8VsvRebQgY',
  resave: true,
  saveUninitialized: true
}));
// user interaction --> flash messages
app.use(flash());
// Passport for Facebook Authentication (and session handling?)
app.use(passport.initialize());
app.use(passport.session());

// -- I think I will have to move this to the routes folder?
let publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(routes);
// setting the renderer
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('html', ejs.renderFile);

// -- Server Start ----------------
app.listen(app.get('port'), function() {
  console.log('Server started on port '+ app.get('port'));
});
