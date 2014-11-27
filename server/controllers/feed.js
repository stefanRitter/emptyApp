'use strict';

var server = {};

module.exports = function (_server) {
  server = _server;

  [
    {
      method: 'GET',
      path: '/feed',
      config: {
        handler: {
          file: 'html/index.html'
        },
        auth: {
          mode: 'try',
          strategy: 'session'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: '/'
          }
        }
      }
    }
  ]
  .forEach(function (route) { server.route(route); });
};
