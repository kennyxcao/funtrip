"use strict";
const sampleData = require('./data.js');
const mongoose = require('mongoose');

// Use Bluebird Promise
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/funtrip';
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
  checked: {
    type: Boolean,
    default: 0
  },
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
  checked: {
    type: Boolean,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  responsibleUser: {
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

var createUser = function(username, pw, firstName, lastName, email) {

}

var createTrip = function(name, user) {

}

var createDestination = function(name, startDate, endDate, lat, lng, trip) {

}

var createReservation = function(name, category, referenceNumber, date, destination) {

}

var createObjective = function(name, category, lat, lng, date, trip, destination) {

}

var createPreparationItem = function(name, dueDate, responsibleUser, trip, destination) {

}

var dropAllCollections = function() {
  var collections = ['users', 'trips', 'destinations', 'reservations', 'objectives', 'preparationItems'];
  collections.forEach( function(collectionName) {
    var collection = db.collections[collectionName];
    if (collection) {
      collection.drop(function(error) {
        if (error) {
          console.log('Drop collection error: ', collectionName, error.message);
        } else {
          console.log('Collection was dropped:', collectionName);
        }
      })
    }
  })
}

var loadAllSampleData = function() {
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
}

//Load Sample Data
// dropAllCollections();
// loadAllSampleData();

module.exports.db = db;
// module.exports.User = User;
// module.exports.Trip = Trip;
// module.exports.Destination = Destination;
// module.exports.Reservation = Reservation;
// module.exports.Objective = Objective;
// module.exports.PreparationItem = PreparationItem;