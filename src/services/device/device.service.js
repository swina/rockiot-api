// Initializes the `device` service on path `/device`
const { Device } = require('./device.class');
const hooks = require('./device.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/device/:id/:action', new Device(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('device/:id/:action');

  service.hooks(hooks);
};
