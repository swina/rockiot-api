// Initializes the `topic` service on path `/topic`
const { Topic } = require('./topic.class');
const hooks = require('./topic.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/topic/:action', new Topic(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('topic/:action');

  service.hooks(hooks);
};
