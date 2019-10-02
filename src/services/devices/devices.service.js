// Initializes the `devices` service on path `/assets/devices`
const { Devices } = require('./devices.class');
const createModel = require('../../models/devices.model');
const hooks = require('./devices.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/assets/devices', new Devices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('assets/devices');

  service.hooks(hooks);
};
