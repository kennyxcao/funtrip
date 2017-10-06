var assert = require('assert');
var expect = require('chai').expect;
const DB = require('../database/index');
var testUser = {username: 'testUserMochaChai', pw: '1'};
var testTrip = {name: 'Super trip for test'};


describe('', function() {
  before(function(done) {
    DB.User.create({username: testUser.username, pw: testUser.pw}, function(error, results) {
      if (error) { return done(error); }
      done();
    });
  });

  after(function(done) {
    DB.User.findOne({username: testUser.username}).populate('trips')
      .then(function(results) {
        var ids = results.trips.map(function(trip) {
          return trip._id;
        });
        return DB.Trip.remove({_id: {$in: ids}});
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

});

