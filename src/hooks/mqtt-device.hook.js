const mqtt_device_controller = require ( '../plugins/mqtt/mqtt-device-controller');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const params = context.params.route;
    context.result = context.params.route;
    context.result.date = new Date();
    context.result.msg = '';

    await context.app.service('/assets/devices').get(params.id).then( device => {
      
      if ( params.action === 'subscribe' ){
        context.result.msg = mqtt_device_controller.subscribe ( context , device );
        
      }
      if ( params.action === 'unsubscribe' ){
        context.result.msg = mqtt_device_controller.unsubscribe ( context , device );
        
      }
      if ( params.action === 'publish' ){
        context.result.msg = mqtt_device_controller.publish ( context , device );
      }
      if ( params.action === 'store-start' ){
        context.result.msg = mqtt_device_controller.storeStart ( context , device );
      }
      if ( params.action === 'store-stop' ){
        context.result.msg = mqtt_device_controller.storeEnd ( context , device );
      }
      context.result.success = true;
      delete context.result.error;
      return context;
    }).catch ( error => {
      context.result.error = error;
      delete context.result.error.errors;
      return context;
    });
  };
};
