'use strict';

var socketIo = require('socket.io'),
    controller = require('../controllers/sockets.js'),
    io;

module.exports = function (config, server) {

  io = socketIo(server.listener);

  io.on('connection', controller);

  return server;
};
