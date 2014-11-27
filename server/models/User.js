'use strict';

var mongoose = require('mongoose'),
    schema;


schema = mongoose.Schema({  
  username:      String,
  displayName:   String,
  
  twitterToken:  String,
  twitterSecret: String,
  twitterId: {
    type:  String,
    index: true,
    unique: true
  },
});


module.exports = mongoose.model('User', schema);
