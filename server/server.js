'use strict';

const net = require('net');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;
const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
  
let socketPool = {};

server.on('connection', socket => {
  let id = uuid();
  socket.id = id;
  socketPool[id] = socket;

  console.log(`Connection count: ${Object.keys(socketPool).length}`);

  for (let socketId in socketPool) {
    if (socketId === id) continue;

    socketPool[socketId].write(`${id} connected!\r\n`);
  }

  socket.on('error', err => {
    console.error(id, err);
  });
  socket.on('data', dataHandler);
  socket.on('close', () => {
    console.log(id, 'closing!');
    delete socketPool[id];
  });
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