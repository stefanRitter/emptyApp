'use strict';

var server = {};

module.exports = function (_server) {
  server = _server;

  [
    {
      method: 'GET',
      path: '/feed',
      config: {
        auth: 'session',
        handler: {
          file: 'html/index.html'
        }
      }
    }
  ]
  .forEach(function (route) { server.route(route); });
};
