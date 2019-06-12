'use strict';

const hub = require('./hub');

hub.on('error', (err) => {
  console.log('Something went wrong!!', err);
});