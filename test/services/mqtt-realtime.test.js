const assert = require('assert');
const app = require('../../src/app');

describe('\'mqtt-realtime\' service', () => {
  it('registered the service', () => {
    const service = app.service('mqtt/realtime');

    assert.ok(service, 'Registered the service');
  });
});
