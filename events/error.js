'use strict';

const hub = require('./hub');

module.exports = (hub.on('error', (err) => {
  console.log('Something went wrong!!', err);
}));