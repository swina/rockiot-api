// Initializes the `mqtt-store` service on path `/mqtt/store`
const { MqttStore } = require('./mqtt-store.class');
const createModel = require('../../models/mqtt-store.model');
const hooks = require('./mqtt-store.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mqtt/store', new MqttStore(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mqtt/store');

  service.hooks(hooks);
};
