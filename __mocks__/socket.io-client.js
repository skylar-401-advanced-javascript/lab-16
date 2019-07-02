'use strict';

const io = exports;

io.connect = (url) => {
  io.socket.connected = true;
  io.socket.url = url;
  return io.socket;
};

io.socket = {
  connected: false,
  url: undefined,

  close: function() {
    this.connected = false;
    this.url = undefined;
    // Clear out previous emit calls
    this.emit.mockClear();
  },

  emit: jest.fn(),
};
