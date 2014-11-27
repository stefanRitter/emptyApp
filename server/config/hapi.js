'use strict';

var Hapi = require('hapi'),
    Path = require('path');

module.exports = function (config) {
  var server = new Hapi.Server(config.port, {
    files: {
      relativeTo: Path.join(config.rootPath, 'server/public')
    }
  });

  var logError = function (err) { if (err) { console.error(err); }};

  var loggingOptions = {
    subscribers: {
      'console': ['request', 'log', 'error'] // add 'ops' for performance logs
    }
  };

  server.pack.register({
    plugin: require('good'),
    options: loggingOptions
  }, logError);

  server.pack.register(require('hapi-auth-cookie'), logError);

  server.pack.register(require('bell'), logError);
  
  return server;
};
