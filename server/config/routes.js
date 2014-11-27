'use strict';

module.exports = function (config, server) {
  require('../controllers/auth.js')(server);
  
  require('../controllers/feed.js')(server);

  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '../public',
        defaultExtension: 'html'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: {
      file: 'img/favicon.ico'
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: 'html/index.html'
    }
  });

  return server;
};
