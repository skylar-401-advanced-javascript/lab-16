'use strict';

const fs = require('fs');
const hub = require('./events/hub');
require('./events/error');

const alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { hub.emit('error', err); }
    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err, data) => {
      if(err) { hub.emit('error', err); }
      console.log(`${file} saved`);
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);
