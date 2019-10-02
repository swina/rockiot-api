const mqtt_topic_controller = require('../plugins/mqtt/mqtt-topic-controller');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const params = context.params.route;
    context.result = context.params.route;
    context.result.date = new Date();
    context.result.msg = '';
    if ( context.data.topic ) {
      if ( params.action === 'subscribe' ){
        context.result.msg = mqtt_topic_controller.subscribe ( context );
        
      }
      if ( params.action === 'unsubscribe' ){
        context.result.msg = mqtt_topic_controller.unsubscribe ( context );
        
      }
      if ( params.action === 'publish' ){
        context.result.msg = mqtt_topic_controller.publish ( context  );
      }
      if ( params.action === 'store-start' ){
        context.result.msg = mqtt_topic_controller.storeStart ( context  );
      }
      if ( params.action === 'store-stop' ){
        context.result.msg = mqtt_topic_controller.storeEnd ( context );
      }
      context.result.success = true;
      delete context.result.error;
      return context;
    }
    
  };
};
