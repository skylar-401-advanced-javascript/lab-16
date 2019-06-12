'use strict';

const hub = require('../events/hub');
require('../events/error');
require('../events/completion');

describe('Event handlers', () => {

  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls error event handler and console.logs it', () => {
    let err = new Error;
    hub.emit('error', err);
    expect(console.log).toHaveBeenCalledWith('Something went wrong!!', err);
  });

  it('calls completion event handler and console.logs it', () => {
    let file;
    hub.emit('completion', file);
    expect(console.log).toHaveBeenCalledWith('Completed updating', file);
  });


});