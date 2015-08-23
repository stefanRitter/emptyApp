'use strict';

var Path = require('path'),
    rootPath = Path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    datastoreURI: 'mongodb://localhost/emptyapp',
    rootPath: rootPath,
    port: 8040
  },

  test: {
    datastoreURI: 'mongodb://localhost/emptyapp-test',
    rootPath: rootPath,
    port: 8040
  },

  production: {
    datastoreURI: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    rootPath: rootPath,
    port: process.env.PORT
  }
};
