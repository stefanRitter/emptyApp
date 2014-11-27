'use strict';

module.exports = function (socket) {

  socket.on('MESSAGE', function () {
    // DO SMTH
  });

  socket.on('disconnect', function () {
    console.log('disconnected');
  });
};
