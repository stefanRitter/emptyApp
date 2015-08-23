'use strict';

var Path = require('path'),
    publicPath = Path.join(__dirname, '../public');

var server = {};

module.exports = function (_server) {
  server = _server;

  [
    {
      method: 'GET',
      path: '/feed',
      config: {
        handler: function (request, reply) {
          reply.file(publicPath + '/html/index.html');
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
