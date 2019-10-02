// Initializes the `brokers` service on path `/assets/brokers`
const { Brokers } = require('./brokers.class');
const createModel = require('../../models/brokers.model');
const hooks = require('./brokers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/assets/brokers', new Brokers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('assets/brokers');

  service.hooks(hooks);
};
