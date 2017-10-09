'use strict';
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

// Database Schema definitions
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
  users: [{
    type: ObjectId,
    ref: 'User'
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
  }
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
  trip: {
    type: ObjectId,
    ref: 'Trip'
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
    default: false
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
    default: false
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
  }
});

// Instantiate all collections
let User = mongoose.model('User', userSchema);
let Trip = mongoose.model('Trip', tripSchema);
let Destination = mongoose.model('Destination', destinationSchema);
let Reservation = mongoose.model('Reservation', reservationSchema);
let Objective = mongoose.model('Objective', objectiveSchema);
let PreparationItem = mongoose.model('PreparationItem', preparationItemSchema);

// Database helpers functions
var getUser = function({username, pw}) {
  return User.findOne({username, pw});
};

var createUser = function({username, pw, firstName, lastName, email}) {
  return User.create({username, pw}); // implement firstName, lastName, email later
};

var addUserTrip = function(userId, tripId) {
  return User.findByIdAndUpdate(userId, {'$push': {'trips': tripId}});
};

var deleteUserTrip = function(userId, tripId) {
  return User.findByIdAndUpdate(userId, {'$pull': {'trips': tripId}});
};

var getUserTrips = function(username) {
  return User.findOne({username: username}).populate('trips')
    .then(function(data) {
      console.log('got stuff from all user trip');
      return Promise.resolve(data.trips);
    })
    .catch(function(error) {
      console.error('getUserTrips error:', error.message);
    });
};

var getTrip = function(tripId) {
  return Trip.findOne({_id: tripId}).populate({path: 'users', select: 'username'});
};

var createTrip = function({name, users}) {
  return Trip.create({name, users});
};

var addTripUser = function(userId, tripId) {
  return Trip.findByIdAndUpdate(tripId, {'$push': {'users': userId}});
};

var deleteTrip = function(id) {
  return Trip.remove({_id: id});
};

var createDestination = function({name, startDate, endDate, lat, lng, trip}) {
  return Destination.create({name, startDate, endDate, lat, lng, trip});
};

var deleteDestination = function(id) {
  return Destination.remove({_id: id});
};

var getDestinationForTrip = function(tripId) {
  return Destination.find({trip: tripId});
};

var createReservation = function({name, category, referenceNumber, date, trip, destination}) {
  return Reservation.create({name, category, referenceNumber, date, trip, destination});
};

var deleteReservation = function(id) {
  return Reservation.remove({_id: id});
};

var getReservationsForTrip = function(tripId) {
  return Reservation.find({trip: tripId});
};

var createObjective = function({name, category, trip, destination, date, lat = 0, lng = 0}) {
  return Objective.create({name, category, trip, destination, date, lat, lng});
};

var deleteObjItem = function(id) {
  return Objective.remove({_id: id});
};

var updateObjItem = function(id, checked) {
  return Objective.findOneAndUpdate({_id: id}, { $set: { checked: checked }});
};

var getObjectivesForTrip = function(tripId) {
  return Objective.find({trip: tripId});
};

var createPreparationItem = function({name, dueDate, responsibleUser, trip}) {
  return PreparationItem.create({name, dueDate, responsibleUser, trip});
};

var deletePreparationItem = function(id) {
  return PreparationItem.remove({_id: id});
};

var updatePreparationItem = function(id, checked) {
  return PreparationItem.findOneAndUpdate({_id: id}, { $set: { checked: checked }});
};

var getPreparationItemsForTrip = function(tripId) {
  return PreparationItem.find({trip: tripId});
};

var getAllDataForTrip = function(tripId) {
  return Promise.all([getTrip(tripId), getDestinationForTrip(tripId), getReservationsForTrip(tripId), 
    getObjectivesForTrip(tripId), getPreparationItemsForTrip(tripId)])
    .then(function([trip, destinations, reservations, objectives, preparationItems]) {
      var allData = {
        'trip': trip,
        'destinations': destinations,
        'reservations': reservations,
        'objectives': objectives,
        'preparationItems': preparationItems
      };
      return Promise.resolve(allData);
    })
    .catch(function(error) {
      console.log('getAllDataForTrip error:', error.message);
    });
};

var loadAllSampleData = function() {
  var sampleUser = sampleData.userSamples[0];
  var sampleTrip = sampleData.tripSamples[0];
  var londonDest = sampleData.destinationSamples[0];
  var parisDest = sampleData.destinationSamples[1];
  var barcelonaDest = sampleData.destinationSamples[2];
  var londonReser = sampleData.reservationSample[0];
  var parisReser = sampleData.reservationSample[1];
  var barcelonaReser = sampleData.reservationSample[2];
  var objectiveOne = sampleData.objectiveSample[0];
  var objectiveTwo = sampleData.objectiveSample[1];
  var preparationItemOne = sampleData.preparationSample[0];
  var preparationItemTwo = sampleData.preparationSample[1];

  Promise.all([User.create(sampleUser), 
    Trip.create(sampleTrip),
    Destination.create(londonDest),
    Destination.create(parisDest),
    Destination.create(barcelonaDest),
    Reservation.create(londonReser),
    Reservation.create(parisReser),
    Reservation.create(barcelonaReser),
    Objective.create(objectiveOne),
    Objective.create(objectiveTwo),
    PreparationItem.create(preparationItemOne),
    PreparationItem.create(preparationItemTwo)])
    .then(function([user, trip, londonDest, parisDest, barcelonaDest, londonReser, parisReser, 
      barcelonaReser, objectiveOne, objectiveTwo, preparationItemOne, preparationItemTwo]) {
      //update user
      var userPromise = User.findByIdAndUpdate(user._id, {'$push': {'trips': trip._id}});
      //update trip
      var tripPromise = Trip.findByIdAndUpdate(trip._id, {'$push': {'users': user._id}});
      //update Destinations
      var londonDestPromise = Destination.findByIdAndUpdate(londonDest._id, {'$set': {'trip': trip._id}});
      var parisDestPromise = Destination.findByIdAndUpdate(parisDest._id, {'$set': {'trip': trip._id}});
      var barcelonaDestPromise = Destination.findByIdAndUpdate(barcelonaDest._id, {'$set': {'trip': trip._id}});
      //update Reservations
      var londonReserPromise = Reservation.findByIdAndUpdate(londonReser._id, {'$set': {'destination': londonDest._id, 'trip': trip._id, 'user': user._id}});
      var parisReserPromise = Reservation.findByIdAndUpdate(parisReser._id, {'$set': {'destination': parisDest._id, 'trip': trip._id, 'user': user._id}});
      var barcelonaReserPromise = Reservation.findByIdAndUpdate(barcelonaReser._id, {'$set': {'destination': barcelonaDest._id, 'trip': trip._id, 'user': user._id}});
      //update Objectives
      var objectiveOnePromise = Objective.findByIdAndUpdate(objectiveOne._id, {'$set': {'destination': barcelonaDest._id, 'trip': trip._id}});
      var objectiveTwoPromise = Objective.findByIdAndUpdate(objectiveTwo._id, {'$set': {'destination': parisDest._id, 'trip': trip._id}});
      var preparationItemOnePromise = PreparationItem.findByIdAndUpdate(preparationItemOne._id, {'$set': {'trip': trip._id, 'responsibleUser': user._id}});
      var preparationItemTwoPromise = PreparationItem.findByIdAndUpdate(preparationItemTwo._id, {'$set': {'trip': trip._id, 'responsibleUser': user._id}});
      return Promise.all([userPromise.exec(), tripPromise.exec(), londonDestPromise.exec(), parisDestPromise.exec(), barcelonaDestPromise.exec(), 
        londonReserPromise.exec(), parisReserPromise.exec(), barcelonaReserPromise.exec(), 
        objectiveOnePromise.exec(), objectiveTwoPromise.exec(), preparationItemOnePromise.exec(), preparationItemTwoPromise.exec()]);
    })
    .then(function(data) {
      console.log('Sample data were loaded');
    })
    .catch(function(error) {
      console.log('Load sample data error: ', error.message);
    });
};

// TO DELETE ALL THE DATA AND LOAD SAMPLE DATA UNCOMMENT THIS:
// db.dropDatabase()
//   .then(function(data) {
//     return loadAllSampleData();
//   })
//   .catch(function(error) {
//     console.log('Drop collections error: ', error.message);
//   });

module.exports = {
  db,
  User,
  Trip,
  Destination,
  createUser,
  getUser,
  getUserTrips,
  addUserTrip,
  deleteUserTrip,
  getAllDataForTrip,
  deletePreparationItem,
  createPreparationItem,
  updatePreparationItem,
  createObjective,
  deleteObjItem,
  updateObjItem,
  createReservation,
  deleteReservation,
  createTrip,
  deleteTrip,
  addTripUser,
  createDestination,
  deleteDestination,
  getDestinationForTrip
};

