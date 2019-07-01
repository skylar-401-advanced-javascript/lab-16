'use strict';

const fs = require('fs');
const hub = require('./events/hub');
require('./events/error');
require('./events/completion');
require('./events/network-logger');

const alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { hub.emit('error', err); }
    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err) => {
      if(err) { hub.emit('error', err); }
      hub.emit('completion', file);
      hub.emit('save', file);
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);
