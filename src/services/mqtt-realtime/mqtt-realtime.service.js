// Initializes the `mqtt-realtime` service on path `/mqtt/realtime`
const { MqttRealtime } = require('./mqtt-realtime.class');
const hooks = require('./mqtt-realtime.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate,
    events: ['payload']
  };

  // Initialize our service with any options it requires
  app.use('/mqtt/realtime', new MqttRealtime(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mqtt/realtime');

  service.hooks(hooks);
};
