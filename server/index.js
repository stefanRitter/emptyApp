'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  require('node-env-file')('.env');
}

var config = require('./config/config')[process.env.NODE_ENV],
    server = require('./config/hapi.js')(config);

// setup datastore
require('./config/mongoose.js')(config);

// setup socket.io
require('./config/socket.io.js')(config, server);

// setup routes
require('./config/routes.js')(config, server);

// don't start server when testing
if (!module.parent) {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;
