const assert = require('assert');
const app = require('../../src/app');

describe('\'install\' service', () => {
  it('registered the service', () => {
    const service = app.service('install');

    assert.ok(service, 'Registered the service');
  });
});
