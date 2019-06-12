'use strcit';

const hub = require('./hub');

module.exports = (hub.on('completion', (file) => {
  console.log('Completed updating', file);
}));