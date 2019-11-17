const mqtt = require('mqtt');
var msg , payload;

/* Start MQTT Client Connection */
function startMQTTClient( context, device ) {
  const conn = device.broker.url + ':' + device.broker.port;
  context.app.mqtt = mqtt.connect( conn );
  context.app.mqtt.topics = [];
}

/* Subscribe and Listen to topic */
function subscribeTopic ( context, device ){
  context.app.mqtt.subscribe ( device.topic );

  context.app.mqtt.topics.push ( device.topic );
  
  context.app.mqtt.on ( 'message' , function ( topic , message ) {
    msg = message.toString();
    payload = {
      msg: msg ,
      date: new Date(),
      topic: topic,
      device: device._id,
      user: context.params.user._id
    };
    if ( topic === device.topic && context.params.route.action != 'store-start' ){
      context.app.service('mqtt/realtime').emit('payload', payload);
      // automatically store incoming data if device.store === true 
      if ( device.store ){
        context.app.service('mqtt/store').create ( payload );
      }
    }
    // called gateway/device/:id/store => register device data
    if ( context.params.route.action === 'store-start' ){
      console.log ( new Date() + ' => ' + payload.msg + ' => storing data for ' + device._id);
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
function _subscribe( context, device ){
  if ( !context.app.mqtt ){
    // MQTT Gateway not connected yet
    console.log ( new Date() + ' MQTT Gateway Controller Started');
    startMQTTClient ( context , device );
    subscribeTopic ( context, device );
    context.app.channels('topic/' + device.topic ).join()
    return 'MQTT Gateway Controller Started for id ' + device._id;
  } else {
    subscribeTopic ( context, device );
    return 'MQTT Gateway Controller Started for id ' + device._id;
  }  
}

/* Unsubscribe Device MQTT Topic */
function _unsubscribe( context, device ){
  context.app.mqtt.unsubscribe ( device.topic );
  let activeTopics = context.app.mqtt.topics.filter ( topic => {
    return topic != device.topic;
  });
  if ( activeTopics.length ){
    context.app.mqtt.topics = activeTopics;
    return 'MQTT Gateway Controller Stopped for id ' + device._id;
  } else {
    endMQTTClient(context);
    console.log ( new Date() + ' MQTT Gateway Controller Stopped. No active connections!');
    return 'MQTT Gateway Controller Stopped. No active connections!';
  }

}

/* Publish payload to Device MQTT Client Topic */
function _publish ( context , device ){
  if ( context.app.mqtt ){
    context.app.mqtt.publish ( device.topic , context.params.query.payload );
    return 'Payload published for id ' + device._id;
  } else {
    _subscribe ( context , device );
    context.app.mqtt.publish ( device.topic , context.params.query.payload );
    return 'Payload published for id ' + device._id;
  }
}


/* Enable/Disable Device Store Data 
*  @params  store = true => enable
*           store = false => disable
*/
function _storeStart ( context , device ){
  context.app.service ( 'assets/devices' ).patch ( device._id , { store: true } ).then ( response => {
    _subscribe ( context , response );
    console.log ( new Date() +  ' Data store for device ' + response._id + ' started!' );
    
  }).catch ( error => {
    console.log ( error );
    return error;
  });
  return 'Data store for device ' + device._id + ' started!';
}

function _storeEnd ( context , device ){
  context.app.service ( 'assets/devices' ).patch ( device._id , { store: false } ).then ( response => {
    _unsubscribe ( context , response );
    console.log ( new Date() +  ' Data store for device ' + response._id + ' stopped!' );
    
  }).catch ( error => {
    console.log ( error );
  });
  return 'Data store for device ' + device._id + ' stopped!';
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