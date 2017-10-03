'use strict';

const Promise = require('bluebird');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const Auth = require('./middleware/auth');
const DB = require('../database/index');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'chocolate mafia',
  name: 'funtripId',
  resave: false,
  saveUninitialized: true,  
  store: new MongoStore({ mongooseConnection: DB.db })
}));

// Static File Redirect
app.use(express.static(__dirname + '/../react-client'));
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));  // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/../node_modules/moment')); // redirect JS Moment
app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/../react-client/css')); // redirect custom css file


app.post('/login', Auth.verifySessionLogin, (req, res, next) => {
  let loginInfo = req.body;
  DB.User.findOne(loginInfo).exec()
    .then(user => {
      if (user) {
        req.session.userId = user._id;
        res.status(200).json({username: user.username});
      } else {
        res.status(200).json({username: null});
      }
    });
});

app.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    res.clearCookie('funtripId');
    if (err) {
      console.error(err);
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  });
});


app.get('/user', (req, res, next) => {
  console.log('/user get received');
});



let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

