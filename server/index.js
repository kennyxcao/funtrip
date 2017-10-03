'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Promise = require('bluebird');

//const db = require('../database/index');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req, res, next) => {
  console.log('Hello World');
  console.log('Request Cookies :', req.cookies);
  next();
});


app.use(express.static(__dirname + '/../react-client'));
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));  // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/../node_modules/moment')); // redirect JS Moment
app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/../react-client/css')); // redirect custom css file



app.post('/login', (req, res) => {
  console.log('/login post received');
});

app.get('/user', (req, res) => {
  console.log('/user get received');
});



let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

