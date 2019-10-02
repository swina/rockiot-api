const assert = require('assert');
const app = require('../../src/app');

describe('\'brokers\' service', () => {
  it('registered the service', () => {
    const service = app.service('assets/brokers');

    assert.ok(service, 'Registered the service');
  });
});
