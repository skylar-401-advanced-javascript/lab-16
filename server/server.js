'use strict';

const ioFactory = require('socket.io');
const io = ioFactory(3000);

let socketPool = {};

io.on('connection', socket => {
  console.log('Connected', socket.id);
});

io.on('error', err => {
  io.broadcast.emit('file-error', err);
});

io.on('save', data => {
  io.broadcast.emit('file-save', data);
  dataHandler();
});

io.on('close', socket => {
  console.log(socket.id, 'closing!');
  delete socketPool[socket.id];
});

function dataHandler(buffer) {
  let id = this.id;
  let text = buffer.toString().trim();
  console.log(id, text);

  for (let socketId in socketPool) {
    if (socketId === id) continue;

    socketPool[socketId].write(`${id}: ${text}\r\n`);
  }
}