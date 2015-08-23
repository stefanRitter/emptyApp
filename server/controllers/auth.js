'use strict';

var User = require('mongoose').model('User'),
    Boom = require('boom'),
    server = {};

var Path = require('path'),
    publicPath = Path.join(__dirname, '../public');


function loginTwitter (request, reply) {
  var userData = request.auth.credentials;

  User.findOne({_id: userData._id}, function (err, user) {
    if (err) { return reply(Boom.badImplementation(err)); }

    if (!user) {
      var userToCreate = {
        username:      userData.profile.username,
        displayName:   userData.profile.displayName,
        twitterId:     userData.profile.id,
        twitterToken:  userData.token,
        twitterSecret: userData.secret
      };

      return User.create(userToCreate, function (err, newUser) {
        if (err || !newUser) { return reply(Boom.badImplementation(err)); }
        request.auth.session.set({_id: newUser._id});
        reply.redirect('/feed');
      });
    }

    request.auth.session.set({_id: user._id});
    reply.redirect('/feed');
  });
}


function login (request, reply) {
  if (request.auth.isAuthenticated) { return reply.redirect('/'); }
  if (request.method === 'get')     { return reply.file(publicPath + '/html/index.html'); }

  User.login(request.payload.email, request.payload.password, function (err, user) {
    if (err) { return reply(Boom.badRequest(err)); }

    request.auth.session.set({_id: user._id});
    reply.redirect('/feed');
  });
}


function join (request, reply) {
  if (request.auth.isAuthenticated) { return reply.redirect('/'); }
  if (request.method === 'get')     { return reply.file(publicPath + '/html/index.html'); }

  var newUser = new User();
  newUser.email = request.payload.email;
  newUser.password = request.payload.password;
  newUser.save(function (err, user) {
    if (err) { return reply(Boom.badRequest(err)); }

    request.auth.session.set({_id: user._id});
    reply.redirect('/feed');
  });
}


function logout (request, reply) {
  request.auth.session.clear();
  return reply.redirect('/');
}


function retrieveSession (request, reply) {
  User.findOne({_id: request.auth.credentials._id}, function (err, user) {
    if (err || !user) { return reply(Boom.unauthorized(err)); }
    reply({_id: user._id});
  });
}


module.exports = function (_server) {
  server = _server;

  server.auth.strategy('session', 'cookie', {
    password:   'cookie_encryption_password',
    cookie:     'sessionid',
    redirectTo: false,
    isSecure:   false,
    ttl:        30 * 24 * 60 * 60 * 1000 // 30 days
  });

  server.auth.strategy('twitter', 'bell', {
    provider:     'twitter',
    password:     'cookie_encryption_password',
    clientId:     process.env.TWIT_KEY    || 'empty',
    clientSecret: process.env.TWIT_SECRET || 'empty',
    isSecure:     false
  });

  [
    {
      method: ['GET', 'POST'],
      path: '/login',
      config: {
        handler: login,
        auth: {
          mode: 'try',
          strategy: 'session'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    },
    {
      method: ['GET', 'POST'],
      path: '/join',
      config: {
        handler: join,
        auth: {
          mode: 'try',
          strategy: 'session'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    },
    {
      method: ['GET', 'POST'],
      path: '/loginTwitter',
      config: {
        auth: 'twitter',
        handler: loginTwitter
      }
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        handler: logout,
        auth: 'session'
      }
    },
    {
      method: 'GET',
      path: '/session',
      config: {
        handler: retrieveSession,
        auth: 'session'
      }
    }
  ]
  .forEach(function (route) { server.route(route); });
};
