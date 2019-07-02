'use strict';

const ioFactory = require('socket.io');
const io = ioFactory(3000);

let socketPool = {};

io.on('connection', socket => {
  console.log('Connected', socket.id);

  socket.on('error', err => {
    console.log('Received error', err);
    socket.broadcast.emit('file-error', err);
  });

  socket.on('save', data => {
    console.log('Received save', data);
    socket.broadcast.emit('file-save', data);
  });
});
