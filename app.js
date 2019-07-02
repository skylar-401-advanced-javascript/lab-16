'use strict';

const fs = require('fs');
const hub = require('./events/hub');
require('./events/error');
require('./events/completion');
require('./events/network-logger');

const alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { return hub.emit('error', err); }

    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err) => {
      if(err) { return hub.emit('error', err); }

      hub.emit('save', file);

      hub.emit('completion', file);
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);
