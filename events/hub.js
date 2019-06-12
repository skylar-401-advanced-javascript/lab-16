'use strict';

const EE = require('events');

console.log('Creating our shared EventEmitter!');

module.exports = new EE();