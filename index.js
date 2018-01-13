const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');

// -- configuring https server (later.)


// const bodyParser = require('body-parser');

const app = express();

app.use(logger('short'));

let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// -- configuration
let port = process.env.PORT || 3000;

http.createServer(app).listen(port);
