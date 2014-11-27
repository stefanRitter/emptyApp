'use strict';

var mongoose = require('mongoose');

require('../models');

module.exports = function (config) {
  mongoose.connect(config.datastoreURI);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'db connection error...'));
  db.once('open', function () {
    console.log('db connection opened');
  });
};
