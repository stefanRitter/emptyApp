'use strict';

var mongoose = require('mongoose'),
    schema, User;

var crypto = require('crypto');

function createSalt () {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd (salt, pwd) {
  var hmac = crypto.createHmac('sha256', salt);
  return hmac.update(pwd).digest('hex');
}



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

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    index: true
  },
  salt:     {type: String },
  password: {type: String }
});

schema.methods.authenticate = function(passwordToMatch) {
  return hashPwd(this.salt, passwordToMatch) === this.password;
};

schema.statics.login = function(email, passwordToMatch, cb) {
  if (!email  || ! passwordToMatch) { return cb('missing email or password'); }

  User.findOne({email: email}, function (err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb('user does not exist'); }
    if (!user.authenticate(passwordToMatch)) { 
      return cb('wrong password');
    }
    cb(null, user);
  });
};


schema.pre('save', function (next) {
  if (this.isNew) {
    this.salt = createSalt();
    this.password = hashPwd(this.salt, this.password || '');
  }
  next();
});


User = mongoose.model('User', schema);
module.exports = User;
