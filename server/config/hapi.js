'use strict';

var Hapi = require('hapi');

module.exports = function (config) {
  var server = new Hapi.Server();
  server.connection({ port: config.port });

  var logError = function (err) { if (err) { console.error(err); }};

  var loggingOptions = {
    opsInterval: 1000,
    reporters: [
      {
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }
    ]
  };

  server.register([
    {
      register: require('good'),
      options: loggingOptions
    },
    {
      register: require('hapi-auth-cookie'),
      options: {}
    },
    {
      register: require('bell'),
      options: {}
    }
  ], logError);

  return server;
};
