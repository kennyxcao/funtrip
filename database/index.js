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
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
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
    default: false
  },
  created: {
    type: Date,
    default: Date.now
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

let User = mongoose.model('User', userSchema);
let Trip = mongoose.model('Trip', tripSchema);
let Destination = mongoose.model('Destination', destinationSchema);
let Reservation = mongoose.model('Reservation', reservationSchema);
let Objective = mongoose.model('Objective', objectiveSchema);
let PreparationItem = mongoose.model('PreparationItem', preparationItemSchema);

var createUser = function(username, pw, firstName, lastName, email) {

}

var getUser = function(username) {
  return User.findOne({username: username});
}

var createTrip = function(name, user) {
  //link with user
  //add trip to user.trips
}

var getUserTrips = function(username) {
  return Trip.find({username: username}).populate('trips')
  .then((data) => {
    return data.trips;
  })
}

var getReservations = function(username) {

}

var createDestination = function(name, startDate, endDate, lat, lng, trip) {
  //link with trip
  //add destination to trip destinations
}

var createReservation = function(name, category, referenceNumber, date, destination) {
  //link with destination
  //add reservation to destination reservations
}

var createObjective = function(name, category, lat, lng, date, destination) {
  //link with destination
  //add objective to destination objectives
}

var createPreparationItem = function(name, dueDate, responsibleUser, trip) {
  //link to trip
  //add preparationItem to trip preparationItems
}

var dropAllCollections = function() {
  var collections = ['users', 'trips', 'destinations', 'reservations', 'objectives', 'preparationItems'];
  var promises = [];
  collections.forEach( function(collectionName) {
    var collection = db.collections[collectionName];
    if (collection) {
      promises.push(collection.drop());
    }
  })
  return Promise.all(promises);
}

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
      var userPromise = User.findByIdAndUpdate(user._id, {'$push': {'trips': trip._id}});
      var tripPromise = Trip.findByIdAndUpdate(trip._id, {'$push': {'users': user._id}});
      var tripDestinationLondon = Trip.findByIdAndUpdate(trip._id, {'$push': {'destinations': londonDest._id}});
      var tripDestinationParis = Trip.findByIdAndUpdate(trip._id, {'$push': {'destinations': parisDest._id}});
      var tripDestinationBarcelona = Trip.findByIdAndUpdate(trip._id, {'$push': {'destinations': barcelonaDest._id}});
      var tripPreparationOne = Trip.findByIdAndUpdate(trip._id, {'$push': {'preparationItems': preparationItemOne._id}});
      var tripPreparationTwo = Trip.findByIdAndUpdate(trip._id, {'$push': {'preparationItems': preparationItemTwo._id}});
      var londonDestPromise = Destination.findByIdAndUpdate(londonDest._id, {'$set': {'trip': trip._id}, '$push': {'reservations': londonReser._id}});
      var parisDestPromise = Destination.findByIdAndUpdate(parisDest._id, {'$set': {'trip': trip._id}, '$push': {'reservations': parisReser._id}});
      var barcelonaDestPromise = Destination.findByIdAndUpdate(barcelonaDest._id, {'$set': {'trip': trip._id}, '$push': {'reservations': barcelonaReser._id}});
      var londonReserPromise = Reservation.findByIdAndUpdate(londonReser._id, {'$set': {'destination': londonDest._id}});
      var parisReserPromise = Reservation.findByIdAndUpdate(parisReser._id, {'$set': {'destination': parisDest._id}});
      var barcelonaReserPromise = Reservation.findByIdAndUpdate(barcelonaReser._id, {'$set': {'destination': barcelonaDest._id}});
      var objectiveOnePromise = Objective.findByIdAndUpdate(objectiveOne._id, {'$set': {'destination': barcelonaDest._id}});
      var objectiveTwoPromise = Objective.findByIdAndUpdate(objectiveTwo._id, {'$set': {'destination': parisDest._id}});
      var preparationItemOnePromise = PreparationItem.findByIdAndUpdate(preparationItemOne._id, {'$set': {'trip': trip._id}});
      var preparationItemTwoPromise = PreparationItem.findByIdAndUpdate(preparationItemTwo._id, {'$set': {'trip': trip._id}});
      return Promise.all([userPromise.exec(), tripPromise.exec(), tripDestinationLondon.exec(),
        tripDestinationParis.exec(), tripDestinationBarcelona.exec(), tripPreparationOne.exec(), 
        tripPreparationTwo.exec(), londonDestPromise.exec(), parisDestPromise.exec(), barcelonaDestPromise.exec(), 
        londonReserPromise.exec(), parisReserPromise.exec(), barcelonaReserPromise.exec(), 
        objectiveOnePromise.exec(), objectiveTwoPromise.exec(), preparationItemOnePromise.exec(), preparationItemTwoPromise.exec()]);
    })
    .then(function(data) {
      console.log('Sample data were loaded');
    })
    .catch(function(error) {
      console.log('Load sample data error: ', error.message);
    })


}

//Load Sample Data
dropAllCollections()
.then(function(data) {
  return loadAllSampleData();
})
.catch(function(error) {
  console.log('Drop collections error: ', error.message);
})




// getUserTrips('kenny')
// .then((data) => console.log(data));


module.exports.db = db;
// module.exports.User = User;
// module.exports.Trip = Trip;
// module.exports.Destination = Destination;
// module.exports.Reservation = Reservation;
// module.exports.Objective = Objective;
// module.exports.PreparationItem = PreparationItem;