const assert = require('assert');
const app = require('../../src/app');

describe('\'mqtt-store\' service', () => {
  it('registered the service', () => {
    const service = app.service('mqtt/store');

    assert.ok(service, 'Registered the service');
  });
});
