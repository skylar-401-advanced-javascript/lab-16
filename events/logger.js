'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('file-save', data => {
  console.log('SAVE LOG', data.toString());
});

socket.on('file-error', err => {
  console.error('ERROR LOG', err);
});