// Initializes the `dashboards` service on path `/assets/dashboards`
const { Dashboards } = require('./dashboards.class');
const createModel = require('../../models/dashboards.model');
const hooks = require('./dashboards.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/assets/dashboards', new Dashboards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('assets/dashboards');

  service.hooks(hooks);
};
