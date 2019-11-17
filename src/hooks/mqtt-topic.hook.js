const mqtt_topic_controller = require('../plugins/mqtt/mqtt-topic-controller');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    
    const params = context.params.route;
    try { 
      context.result = context.params.route;
      context.result.date = new Date();
      context.result.topic = null;
      context.result.payload = '';
      context.result.msg = '';
      if ( context.data.topic ) {
        context.result.topic = context.data.topic;
        switch (params.action){
        case 'subscribe':
          context.result.msg = mqtt_topic_controller.subscribe ( context );
          context.result.success = true;
          delete context.result.error;
          break;
          
        case 'unsubscribe':
          context.result.msg = mqtt_topic_controller.unsubscribe ( context );
          context.result.success = true;
          delete context.result.error;
          break;

        case 'publish':
          context.result.msg = mqtt_topic_controller.publish ( context  );
          context.result.success = true;
          context.result.payload = context.data.payload;
          delete context.result.error;
          break;
        
        default:
          context.result.msg = 'Method not available';

        } 
        /*
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
        */
        
        return context;
      }
    } catch (err) {
      console.log ( err )
    }
    
  };
};
