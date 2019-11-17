const users = require('./users/users.service.js');
const devices = require('./devices/devices.service.js');
const brokers = require('./brokers/brokers.service.js');
const device = require('./device/device.service.js');
const topic = require('./topic/topic.service.js');
const mqttRealtime = require('./mqtt-realtime/mqtt-realtime.service.js');
const mqttStore = require('./mqtt-store/mqtt-store.service.js');
const install = require('./install/install.service.js');
const dashboards = require('./dashboards/dashboards.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(devices);
  app.configure(brokers);
  app.configure(device);
  app.configure(topic);
  app.configure(mqttRealtime);
  app.configure(mqttStore);
  app.configure(install);
  app.configure(dashboards);
};
