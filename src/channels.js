var client;
module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {

      client = connection;
      // Obtain the logged in user from the connection
      // const user = connection.user;
      
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      //console.log ( connection.user )
      //if ( !app.channel('topic/' + connection.user._id ).connection ){
      //  app.channel('topic/' + connection.user._id ).join(connection);
      //}  
      console.log ( app.channels )
      // Channels can be named anything and joined on any condition 
      
      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));
      
      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    //console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line
    
    if ( hook.params.route.action === 'subscribe' || hook.params.route.action === 'publish'){
      if ( hook.data.topic.substr(-1) != '#' && hook.data.topic.substr(-1) != '*'){
        if ( app.channel('topic/' + hook.params.user._id + '/' + hook.data.topic ).connection != client ){
          console.log ( 'verify channel=>' , app.channel('topic/' + hook.params.user._id + '/' + hook.data.topic ) )
          app.channel('topic/' + hook.params.user._id + '/' + hook.data.topic ).join(client);
          //console.log ( 'Joined to channel => ' , hook.data.topic , client);
          return app.channel('topic/' + hook.params.user._id + '/' + hook.data.topic )
        }  
      }
    }
    if ( hook.params.route.action === 'unsubscribe' ){
      if ( hook.data.topic.substr(-1) != '#' && hook.data.topic.substr(-1) != '*'){
        app.channel('topic/' + hook.params.user._id + '/' + hook.data.topic ).leave(client);
        return null;
      }
    }
    //console.log ( app.channels )
    // e.g. to publish all service events to all authenticated users use
    //return app.channel('authenticated');
  });

  

  app.service('mqtt/realtime').publish('payload',(payload)=>{
    if ( payload.multi ){
      if ( payload.multi.substr(-1) != '#' && payload.multi.substr(-1) != '*'){
        return [
          app.channel( 'topic/' + payload.user + '/' + payload.topic )
        ];
      } else {
        return [
          app.channel( 'topic/' + payload.user )// + '/' + payload.topic )//.filter(()=>client.user._id === payload.user)
        ];
      }
    }
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
