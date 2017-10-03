'use strict';

const Promise = require('bluebird');
const DB = require('../../database/index');

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySessionLogin = (req, res, next) => {
  if (!req.body.username && req.session.userId) {
    DB.User.findById(req.session.userId).exec()
      .then(user => {
        if (user) {
          res.status(200).json({username: user.username});
        } else {
          res.status(200).json({username: null});
        }
      });
  } else {
    next();
  }
};