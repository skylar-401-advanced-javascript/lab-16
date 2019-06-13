'use strict';

const fs = require('fs');
const hub = require('./events/hub');
require('./events/error');
require('./events/completion');

const alterFile = async (file) => {
  await fs.readFile( file, async (err, data) => {
    if(err) { hub.emit('error', err); }
    let text = data.toString().toUpperCase();
    await fs.writeFile( file, Buffer.from(text), (err) => {
      if(err) { hub.emit('error', err); }
      hub.emit('completion', file);
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);
