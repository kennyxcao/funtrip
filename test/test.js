var assert = require('assert');
var expect = require('chai').expect;
const DB = require('../database/index');
var testUserName = 'testUserMochaChai';


describe('', function() {
  before(function(done) {
    DB.User.create({username: testUserName, pw: '1'}, function(error, results) {
      if (error) { return done(error); }
      done();
    });
  });

  after(function(done) {
    DB.User.remove({username: testUserName}, function(error, results) {
      if (error) { return done(error); } 
      done();
    });
  });

  describe('User Creation:', function() {

    it('should have a test user', function(done) {
      DB.User.find({username: testUserName}, function(error, results) {
        if (error) { return done(error); }
        expect(results[0].username).to.deep.equal(testUserName);
        done();
      });
    });

    it('user should have an unique username', function(done) {
      DB.User.create({username: testUserName, pw: '1'}, function(error, results) {
        expect(error).to.exist;
        expect(error.code).to.equal(11000); //11000 duplicate key error collection
        done();
      });
    });

    it('user should have a password', function(done) {
      DB.User.find({username: testUserName}, function(error, results) {
        if (error) { return done(error); }
        expect(results[0].username).to.deep.equal(testUserName);
        done();
      });
    });

  });

});

