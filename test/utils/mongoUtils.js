'use strict';

process.env.NODE_ENV = 'test';

var config = require('../../server/config/config');
var mongoose = require('mongoose');

module.exports = function (beforeEach) {
  
  beforeEach(function (done) {

    function clearDB() {
      var cb = function() {};
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(cb);
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.test.datastoreURI, function (err) {
        if (err) { throw err; }
        return clearDB();
     });
    } else {
      return clearDB();
    }
  });
};
