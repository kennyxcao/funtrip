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
  return User.findOne({username: username}).populate('trips')
    .then(function(data) {
      return Promise.resolve(data.trips);
    })
    .catch(function(error) {
      console.log('getUserTrips error:', error.message);
    })
}

var createDestination = function(name, startDate, endDate, lat, lng, trip) {
  //link with trip
  //add destination to trip destinations
}

var getDestinationForTrip = function(tripId) {
  return Trip.findOne({_id: tripId}).populate('destinations')
    .then(function(data) {
      return Promise.resolve(data.destinations);
    })
    .catch(function(error) {
      console.log('getDestinationForTrip error:', error.message);
    })
}

var createReservation = function(name, category, referenceNumber, date, destination) {
  //link with destination
  //add reservation to destination reservations
}

var getReservationsForTrip = function(tripId) {
  return Trip.findOne({_id: tripId}).populate('destinations')
    .then(function(data) {
      var reservations = data.destinations.reduce(function(acc, destination) {
        return acc.concat(destination.reservations)
        }, []);
      return Reservation.find({_id: {'$in': reservations}});
    })
    .catch(function(error) {
      console.log('getReservationsForTrip error:', error.message);
    })
}

var createObjective = function(name, category, lat, lng, date, destination) {
  //link with destination
  //add objective to destination objectives
}

var getObjectivesForTrip = function(tripId) {
  return Trip.findOne({_id: tripId}).populate('destinations')
    .then(function(data) {
      var objectives = data.destinations.reduce(function(acc, destination) {
        return acc.concat(destination.objectives)
        }, []);
      return Objective.find({_id: {'$in': objectives}});
    })
    .catch(function(error) {
      console.log('getObjectivesForTrip error:', error.message);
    })
}

var createPreparationItem = function(name, dueDate, responsibleUser, trip) {
  //link to trip
  //add preparationItem to trip preparationItems
}

var getPreparationItemsForTrip = function(tripId) {
  return Trip.findOne({_id: tripId}).populate('preparationItems')
    .then(function(data) {
      return Promise.resolve(data.preparationItems);
    })
    .catch(function(error) {
      console.log('getPreparationItemForTrip error:', error.message);
    })
}

var getAllDataForTrip = function(tripId) {
  return Promise.all([getDestinationForTrip(tripId), getReservationsForTrip(tripId), 
    getObjectivesForTrip(tripId), getPreparationItemsForTrip(tripId)])
    .then(function([destinations, reservations, objectives, preparationItems]) {
      var allData = {
        'destinations': destinations,
        'reservations': reservations,
        'objectives': objectives,
        'preparationItems': preparationItems
      }
      return Promise.resolve(allData)
    })
    .catch(function(error) {
      console.log('getAllDataForTrip error:', error.message);
    })
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
      //var tripDestinationLondon = Trip.findByIdAndUpdate(trip._id, {'$push': {'destinations': londonDest._id}});
      //var tripDestinationParis = Trip.findByIdAndUpdate(trip._id, {'$push': {'destinations': parisDest._id}});
      //var tripDestinationBarcelona = Trip.findByIdAndUpdate(trip._id, {'$push': {'destinations': barcelonaDest._id}});
      //var tripPreparationOne = Trip.findByIdAndUpdate(trip._id, {'$push': {'preparationItems': preparationItemOne._id}});
      //var tripPreparationTwo = Trip.findByIdAndUpdate(trip._id, {'$push': {'preparationItems': preparationItemTwo._id}});
      //var londonDestPromise = Destination.findByIdAndUpdate(londonDest._id, {'$set': {'trip': trip._id}, '$push': {'reservations': londonReser._id, 'objectives': objectiveOne._id}});
      //var parisDestPromise = Destination.findByIdAndUpdate(parisDest._id, {'$set': {'trip': trip._id}, '$push': {'reservations': parisReser._id, 'objectives': objectiveTwo._id}});
      //var barcelonaDestPromise = Destination.findByIdAndUpdate(barcelonaDest._id, {'$set': {'trip': trip._id}, '$push': {'reservations': barcelonaReser._id}});
      var londonDestPromise = Destination.findByIdAndUpdate(londonDest._id, {'$set': {'trip': trip._id}});
      var parisDestPromise = Destination.findByIdAndUpdate(parisDest._id, {'$set': {'trip': trip._id}});
      var barcelonaDestPromise = Destination.findByIdAndUpdate(barcelonaDest._id, {'$set': {'trip': trip._id}});
      var londonReserPromise = Reservation.findByIdAndUpdate(londonReser._id, {'$set': {'destination': londonDest._id, 'trip': trip._id}});
      var parisReserPromise = Reservation.findByIdAndUpdate(parisReser._id, {'$set': {'destination': parisDest._id, 'trip': trip._id}});
      var barcelonaReserPromise = Reservation.findByIdAndUpdate(barcelonaReser._id, {'$set': {'destination': barcelonaDest._id, 'trip': trip._id}});
      var objectiveOnePromise = Objective.findByIdAndUpdate(objectiveOne._id, {'$set': {'destination': barcelonaDest._id, 'trip': trip._id}});
      var objectiveTwoPromise = Objective.findByIdAndUpdate(objectiveTwo._id, {'$set': {'destination': parisDest._id, 'trip': trip._id}});
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

//TO DELETE ALL THE DATA AND LOAD SAMPLE DATA UNCOMMENT THIS:
db.dropDatabase()
  .then(function(data) {
    return loadAllSampleData();
  })
  .catch(function(error) {
    console.log('Drop collections error: ', error.message);
  })

//TO CHECK FORMAT FOR ALL GETTER FUNCTIONS UNCOMMENT THIS:
// getUserTrips('kenny')
//   .then(function(data) {
//     console.log('User trips:', data);
//     return getDestinationForTrip(data[0]._id)
//   })
//   .then(function(data) {
//     console.log('Trip destinations:', data);
//   })

// getUserTrips('kenny')
//   .then(function(data) {
//     return getReservationsForTrip(data[0]._id)
//   })
//   .then(function(data) {
//     console.log('Trip Reservations:', data);
//   }) 

// getUserTrips('kenny')
//   .then(function(data) {
//     return getObjectivesForTrip(data[0]._id)
//   })
//   .then(function(data) {
//     console.log('Trip objectives:', data);
//   })

// getUserTrips('kenny')
//   .then(function(data) {
//     return getPreparationItemsForTrip(data[0]._id)
//   })
//   .then(function(data) {
//     console.log('Trip preparationItems:', data);
//   })

// getUserTrips('kenny')
//   .then(function(data) {
//     return getAllDataForTrip(data[0]._id)
//   })
//   .then(function(data) {
//     console.log('Trip all data:', data);
//   })

// sampleData.userSamples.forEach(function(user) {
//   var newUser = new User({
//     username: user.username,
//     pw: user.pw,
//   }).save(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('user saved');
//     }
//   });
// });

module.exports.db = db;
module.exports.User = User;
