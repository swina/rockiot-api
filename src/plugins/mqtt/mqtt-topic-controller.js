const mqtt = require('mqtt');
var msg , payload;

/* Start MQTT Client Connection */
function startMQTTClient( context ) {
  const conn = context.data.url + ':' + context.data.port;
  context.app.mqtt = mqtt.connect( conn );
  context.app.mqtt.topics = [];
}

/* Subscribe and Listen to topic */
function subscribeTopic ( context ){
  context.app.mqtt.subscribe ( context.data.topic );

  context.app.mqtt.topics.push ( context.data.topic );
  
  context.app.mqtt.on ( 'message' , function ( topic , message ) {
    msg = message.toString();
    payload = {
      msg: msg ,
      date: new Date(),
      topic: topic,
      device: context.data.name,
      user: context.params.user._id
    };
    
    if ( topic === context.data.topic && context.params.route.action != 'store-start' ){
      context.app.service('mqtt/realtime').emit('payload', payload);
      // automatically store incoming data if device.store === true 
      if ( context.data.store ){
        context.app.service('mqtt/store').create ( payload );
      }
    }
    // called gateway/device/:id/store => register device data
    if ( context.params.route.action === 'store-start' ){
      console.log ( new Date() + ' => ' + payload.msg + ' => storing data for ' + context.data.name);
      context.app.service('mqtt/store').create ( payload );
    }
  });
}

/* End MQTT Client */
function endMQTTClient(context){
  if ( context.app.mqtt ){
    context.app.mqtt.end();
    context.app.mqtt = null;
  }
}

/* Subscribe to Device MQTT Topic, if not MQTT Client create one */
function _subscribe( context ){
  if ( !context.app.mqtt ){
    // MQTT Gateway not connected yet
    console.log ( new Date() + ' Gateway Controller Started');
    startMQTTClient ( context );
    subscribeTopic ( context );
    return 'Gateway Controller Started for id ' + context.data.topic;
  } else {
    subscribeTopic ( context );
    return 'Gateway Controller Started for id ' + context.data.topic;
  }  
}

/* Unsubscribe Device MQTT Topic */
function _unsubscribe( context ){
  context.app.mqtt.unsubscribe ( context.data.topic );
  let activeTopics = context.app.mqtt.topics.filter ( topic => {
    return topic != context.data.topic;
  });
  if ( activeTopics.length ){
    context.app.mqtt.topics = activeTopics;
    return 'Gateway Controller Stopped for id ' + context.data.topic;
  } else {
    endMQTTClient(context);
    console.log ( new Date() + ' Gateway Controller Stopped. No active connections!');
    return 'Gateway Controller Stopped. No active connections!';
  }

}

/* Publish payload to Device MQTT Client Topic */
function _publish ( context ){
  if ( context.app.mqtt ){
    context.app.mqtt.publish ( context.data.topic , context.data.payload );
    return 'Payload published for id ' + context.data.topic;
  } else {
    _subscribe ( context  );
    context.app.mqtt.publish ( context.data.topic , context.data.payload );
    return 'Payload published for id ' + context.data.topic;
  }
}


/* Enable/Disable Device Store Data 
*  @params  store = true => enable
*           store = false => disable
*/
function _storeStart (){
  //context.app.service ( 'assets/devices' ).patch ( device._id , { store: true } ).then ( response => {
  //  _subscribe ( context , response );
  //  console.log ( new Date() +  ' Data store for device ' + response._id + ' started!' );
  //  
  //}).catch ( error => {
  //  console.log ( error );
  //  return error;
  //});
  return 'Data store not available for this method !';
}

function _storeEnd (){
  /*
  context.app.service ( 'assets/devices' ).patch ( device._id , { store: false } ).then ( response => {
    _unsubscribe ( context , response );
    console.log ( new Date() +  ' Data store for device ' + response._id + ' stopped!' );
    
  }).catch ( error => {
    console.log ( error );
  });
  return 'Data store for device ' + device._id + ' stopped!';
  */
  return 'Data store not available for this method !';
}

module.exports =  {
  startMQTTClient : startMQTTClient,
  endMQTTClient   : endMQTTClient, 
  subscribe       : _subscribe,
  unsubscribe     : _unsubscribe,
  publish         : _publish,
  storeStart      : _storeStart,
  storeEnd        : _storeEnd
};