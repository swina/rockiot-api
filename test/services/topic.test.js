const assert = require('assert');
const app = require('../../src/app');

describe('\'topic\' service', () => {
  it('registered the service', () => {
    const service = app.service('topic');

    assert.ok(service, 'Registered the service');
  });
});
