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
  created: { 
    type: Date, 
    default: Date.now 
  }
});

let User = mongoose.model('User', userSchema);

// Load Sample Data
// sampleData.userSamples.forEach(function(user) {
//   var newUser = new User({
//     name: user.name,
//     pw: user.pw
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