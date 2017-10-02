"use strict";
const sampleData = require('./data.js');
const mongoose = require('mongoose');

// Use Bluebird Promise
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/funtrip';
//const mongodbURI = 'mongodb://localhost/funtrip';
mongoose.connect(mongodbURI);

let db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});
db.once('open', function() {
  console.log('mongoose connected successfully');
});


let userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  pw: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  created: {
    type: Date,
    default: Date.now
  },
  trips: [{
    type: ObjectId,
    ref: 'Trip'}]
});

let tripSchema = mongoose.Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  destinations: [{
    type: ObjectId,
    ref: 'Destination'
  }],
  preparationItems: [{
    type: ObjectId,
    ref: 'PreparationItem'
  }]
});

let destinationSchema = mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  lat: Number,
  lng: Number,
  created: {
    type: Date,
    default: Date.now
  },
  trip: {
    type: ObjectId,
    ref: 'Trip'
  },
  reservations: [{
    type: ObjectId,
    ref: 'Reservation'
  }],
  objectives: [{
    type: ObjectId,
    ref: 'Objective'
  }]
});

let reservationSchema = mongoose.Schema({
  name: String,
  category: String,
  referenceNumber: String,
  date: Date,
  created: {
    type: Date,
    default: Date.now
  },
  destination: {
    type: ObjectId,
    ref: 'Destination'
  }
});

let objectiveSchema = mongoose.Schema({
  name: String,
  category: String,
  lat: Number,
  lng: Number,
  date: Date,
  checked: Boolean,
  created: {
    type: Date,
    default: Date.now
  },
  trip: {
    type: ObjectId,
    ref: 'Trip'
  },
  destination: {
    type: ObjectId,
    ref: 'Destination'
  }
});

let preparationItemSchema = mongoose.Schema({
  name: String,
  dueDate: Date,
  checked: Boolean,
    created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  trip: {
    type: ObjectId,
    ref: 'Trip'
  },
  destination: {
    type: ObjectId,
    ref: 'Destination'
  }
});

let User = mongoose.model('User', userSchema);
let Trip = mongoose.model('Trip', tripSchema);
let Destination = mongoose.model('Destination', destinationSchema);
let Reservation = mongoose.model('Reservation', reservationSchema);
let Objective = mongoose.model('Objective', objectiveSchema);
let PreparationItem = mongoose.model('PreparationItem', preparationItemSchema);


//Load Sample Data
sampleData.userSamples.forEach(function(user) {
  var newUser = new User({
    username: user.username,
    pw: user.pw
  }).save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('user saved');
    }
  });
});

module.exports.db = db;
module.exports.User = User;
module.exports.Trip = Trip;
module.exports.Destination = Destination;
module.exports.Reservation = Reservation;
module.exports.Objective = Objective;
module.exports.PreparationItem = PreparationItem;