'use strict';

jest.mock('socket.io-client');
const io = require('socket.io-client');

const hub = require('../events/hub');
require('../events/network-logger');

describe('Network Logger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('will close on completion', () => {
    // Arrange
    expect(io.socket).toHaveProperty('connected', true);
    expect(io.socket).toHaveProperty('url', 'http://localhost:3000');

    // Act
    hub.emit('completion');

    // Assert
    expect(io.socket).toHaveProperty('connected', false);
  });

  it('socket.emit on save', () => {
    // Arrange


    // Act
    hub.emit('save', 'Save from test!');

    // Assert
    expect(console.log).toHaveBeenCalledWith('socket emit', 'save');

    expect(io.socket.emit).toHaveBeenCalledWith('save', 'Save from test!');
  });
});
