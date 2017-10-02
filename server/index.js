"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
//const db = require('../database/index');
// const db = require('../database/index');
const Promise = require('bluebird');
const app = express();

app.use(bodyParser.json());
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

