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
        res.status(200).json({username: user.username, userId: user._id});
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

app.get('/trips', (req, res) => {
  var dataToSend = {};
  DB.getUserTrips(req.query.username).then(function(data) {
    var lastTripId = data[0]._id;
    dataToSend.trips = data;
    return DB.getAllDataForTrip(lastTripId);
  }).then(function(data) {
    dataToSend.lastTrip = data;
    res.status(200).json(dataToSend);
  }).catch(function(error) {
    console.error(error);
    res.status(404).json(dataToSend);
  }); 
});

app.get('/user', (req, res, next) => {
  console.log('/user get received');
});

app.post('/prep', (req, res) => {
  DB.createPreparationItem(req.body)
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.patch('/prep/:prepId', (req, res) => {
  DB.updatePreparationItem(req.params.prepId, req.body.checked)
    .then(result => {
      res.status(202).send();    
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.delete('/prep/:prepId', (req, res) => {
  DB.deletePreparationItem(req.params.prepId)
    .then(result => {
      res.status(202).send();          
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.post('/obj', (req, res) => {
  DB.createObjective(req.body)
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.patch('/obj/:objId', (req, res) => {
  DB.updateObjItem(req.params.objId, req.body.checked)
    .then(result => {
      res.status(202).send();    
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.delete('/obj/:objId', (req, res) => {
  DB.deleteObjItem(req.params.objId)
    .then(result => {
      res.status(202).send();          
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.post('/res', (req, res) => {
  DB.createReservation(req.body)
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.delete('/res/:resId', (req, res) => {
  DB.deleteReservation(req.params.resId)
    .then(result => {
      res.status(202).send();          
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

