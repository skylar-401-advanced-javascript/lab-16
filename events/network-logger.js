'use strict';

const eventHub = require('./hub');

const net = require('net');
const client = new net.Socket();

const LOGGER_PORT = process.env.LOGGER_PORT || 3001;
const LOGGER_HOST = process.env.LOGGER_HOST || 'localhost';

client.connect(LOGGER_PORT, LOGGER_HOST, initializeLogger);

function initializeLogger() {
  eventHub.on('save', log('save'));
  eventHub.on('delete', log('delete'));
  eventHub.on('update', log('update'));

  function log(eventType) {
    return payload => {
      let json = JSON.stringify({
        eventType, payload,
      });
      client.write(`${json}\r\n`);
    };
  }
}