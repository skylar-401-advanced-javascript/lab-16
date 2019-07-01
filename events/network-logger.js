'use strict';
const fs = require('fs');

const io = require('socket.io-client');
io.connect('http://localhost:3000');

const eventHub = require('./hub');

initializeLogger();

function initializeLogger() {
  eventHub.on('save', log('save'));
  eventHub.on('error', log('error'));

  function log(eventType) {
    return payload => {
      let json = JSON.stringify({
        eventType, payload,
      });
      fs.writeFile('../test.txt',`${json}\r\n`, (err) => {
        if(err) throw err;
      });
    };
  }
}