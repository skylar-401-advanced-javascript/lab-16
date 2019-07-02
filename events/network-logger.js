'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const eventHub = require('./hub');
eventHub.on('completion', () => {
  console.log('Closing socket...');
  socket.close();
});

initializeLogger();

function initializeLogger() {
  eventHub.on('save', log('save'));
  eventHub.on('error', log('error'));

  function log(eventType) {
    return payload => {
      console.log('socket emit', eventType);
      socket.emit(eventType, payload);
    };
  }
}