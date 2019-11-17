// Initializes the `install` service on path `/install`
const { Install } = require('./install.class');
const createModel = require('../../models/install.model');
const hooks = require('./install.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/install', new Install(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('install');

  service.hooks(hooks);
};
