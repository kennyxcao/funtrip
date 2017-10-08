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
app.use('/assets', express.static(__dirname + '/../react-client/assets'));  // redirect custom assets

// Server-side End Points Routers
app.post('/login', Auth.verifySessionLogin, (req, res, next) => {
  DB.getUser(req.body).exec()
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

app.post('/signup', (req, res, next) => {
  DB.createUser(req.body)
    .then(user => {
      if (user) {
        req.session.userId = user._id;
        res.status(200).json({username: user.username, userId: user._id});
      } else {
        res.status(200).json({username: null});
      }
    });
});

app.get('/trips', (req, res) => {
  DB.getUserTrips(req.query.username).then(function(trips) {
    res.status(200).json({trips});
  }).catch(function(err) {
    console.error(err);
    res.status(404).send();
  });
});

app.get('/trip', (req, res) => {
  DB.getAllDataForTrip(req.query.tripId)
    .then(function(trip) {
      res.status(200).json({trip});
    }).catch(function(err) {
      console.error(err);
      res.status(404).send();
    }); 
});

app.post('/trip', (req, res) => {
  DB.createTrip(req.body)
    .then(newTrip => {
      return DB.addUserTrip(newTrip.users[0], newTrip._id);
    })
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.delete('/trip/:tripId', (req, res) => {
  DB.deleteTrip(req.params.tripId)
    .then(result => {
      return DB.deleteUserTrip(req.body.userId, req.params.tripId);
    })
    .then(result => {
      res.status(202).send();          
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.post('/jointrip', (req, res) => {
  DB.addTripUser(req.body.userId, req.body.tripId)
    .then(result => {
      return DB.addUserTrip(req.body.userId, req.body.tripId);
    })
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });    
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

app.post('/dest', (req, res) => {
  DB.createDestination(req.body)
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

app.delete('/dest/:destId', (req, res) => {
  DB.deleteDestination(req.params.destId)
    .then(result => {
      res.status(202).send();          
    })
    .catch(err => {
      console.error(err);
      res.status(400).send();
    });
});

// Environment port selection based on deployment
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});

