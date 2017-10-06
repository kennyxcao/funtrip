var assert = require('assert');
var expect = require('chai').expect;
const DB = require('../database/index');
var testUser = {username: 'testUserMochaChai', pw: '1'};
var testTrip = {name: 'Super trip for test'};
var testDestinations = [
  { name: 'Test London',
    startDate: new Date('11/02/2017'),
    endDate: new Date('11/05/2017'),
    lat: 51.509865,
    lng: -0.118092},
  { name: 'Test Paris',
    startDate: new Date('11/05/2017'),
    endDate: new Date('11/08/2017'),
    lat: 48.864716,
    lng: 2.349014} ];

describe('', function() {
  before(function(done) {
    DB.User.create({username: testUser.username, pw: testUser.pw}, function(error, results) {
      if (error) { return done(error); }
      done();
    });
  });

  after(function(done) {
    var ids = [];
    DB.User.findOne({username: testUser.username}).populate('trips')
      .then(function(results) {
        ids = ids.concat(results.trips.map(function(trip) {
          return trip._id;
        }));
        return DB.Trip.remove({_id: {$in: ids}});
      })
      .then(function(results) {
        return DB.Destination.remove({trip: {$in: ids}});
      })
      .then(function(results) {
        return DB.User.remove({username: testUser.username});
      })
      .then(function(results) {
        done();
      })
      .catch(function(error) {
        return done(error);
      });
  });

  describe('User Creation:', function() {

    it('should have a test user', function(done) {
      DB.User.find({username: testUser.username}, function(error, results) {
        if (error) { return done(error); }
        expect(results[0].username).to.equal(testUser.username);
        done();
      });
    });

    it('user should have an unique username', function(done) {
      DB.User.create({username: testUser.username, pw: testUser.pw}, function(error, results) {
        expect(error).to.exist;
        expect(error.code).to.equal(11000); //11000 duplicate key error collection
        done();
      });
    });

    it('user should have a password', function(done) {
      DB.User.find({username: testUser.username}, function(error, results) {
        if (error) { return done(error); }
        expect(results[0].username).to.equal(testUser.username);
        done();
      });
    });

  });

  describe('Trip Creation:', function() {

    it('should create a trip for a user', function(done) {
      DB.getUser({username: testUser.username, pw: testUser.pw})
        .then(function(results) {
          return DB.createTrip({name: testTrip.name, users: [results._id]});
        })
        .then(function(results) {
          return DB.addUserTrip(results.users[0], results._id);
        })
        .then(function(results) {
          return DB.getUserTrips(testUser.username);
        })
        .then(function(results) {
          expect(results.length).to.equal(1);
          done();
        })
        .catch(function(error) {
          return done(error);
        });
    });

    it('should return trips for a user', function(done) {
      DB.getUserTrips(testUser.username)
        .then(function(results) {
          expect(results.length).to.equal(1);
          done();
        })
        .catch(function(error) {
          return done(error);
        });
    });

  });

  describe('Destination Creation:', function() {

    it('should create destination for a trip', function(done) {
      var destination = testDestinations[0];
      DB.getUserTrips(testUser.username)
        .then(function(results) {
          destination.trip = results[0]._id;
          return DB.createDestination(destination);
        })
        .then(function(results) {
          expect(results).not.to.deep.equal({});
          expect(results.name).to.equal(destination.name);
          expect(results.trip).to.be.an('object');
          done();
        })
        .catch(function(error) {
          return done(error);
        });
    });

    it('should return destinations for a trip', function(done) {
      DB.getUserTrips(testUser.username)
        .then(function(results) {
          return DB.getDestinationForTrip(results[0]._id);
        })
        .then(function(results) {
          expect(results.length).to.equal(1);
          done();
        })
        .catch(function(error) {
          return done(error);
        });
    });

  });

});

