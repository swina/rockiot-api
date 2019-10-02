const assert = require('assert');
const app = require('../../src/app');

describe('\'device\' service', () => {
  it('registered the service', () => {
    const service = app.service('device');

    assert.ok(service, 'Registered the service');
  });
});
