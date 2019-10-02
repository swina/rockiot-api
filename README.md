# IoTiscool-API

```IoTiscool-API``` is a powerful REST API/Realtime API system to connect to your MQTT Brokers/Devices, get and publish realtime data, manage your devices asset, store realtime data.

This project uses [Feathersjs](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Microservices built on REST API / Realtime API
Every IoT device can have now his REST API / Realtime API in order to manage it, get MQTT realtime data, publish MQTT data, store incoming data.

All microservices and methods are available thru our client (iotiscool-dev) using websockets transport protocol

## Built-in authentication

IoTiscool-API has a built-in authentication system (that you can extend) based on JWT Web Tokens (username+password by default).

All microservices requires authentication and are safely transmitted to client using wss protocol (SSL certificate must be installed on the server).


## Get Started (Server)


Clone our respository

```
$ git clone https://github.com/swina/iotiscool-api.git

```

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/iotiscool; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Client usage (JS)

Client uses websocket protocol and you don't need to add any other external library like axios, jquery, etc.
Using our transpiled library start using iotiscool-api in 5 minutes.

Include our javascript library in your HTML page

```
<script src="https://iotiscool-api.herokuapp.com/demo/main.js">

```

Add following script to test.

```

<script>
    //configure client websocket connection to the server
    const api = iotiscool;
    
    //create app
    const app = new api.server();
    
    //url of your server (in local environment http://localhost:3031)
    const url = 'http://localhost:3031';

    //set socket for server url
    const socket = api.io ( url , {
        transports: ['websocket'],
    });
    
    //open socket
    app.configure( api.socketio ( socket ) );
    
    //set auth JWT to localStorage (using JWT Web token in localStorage)
    app.configure ( api.auth ( { storage: window.localStorage } ) ); 
    
    //publish a payload to a topic
    app.service('topic/publish').create({
        topic: 'sensor/temperature',
        url: 'http://test.mosquitto.org',
        port: '1883,
        name: 'Temperature',
        payload: '25'
    }).then ( reps => {
        console.log ( resp )
    }).catch ( error => {
        console.log ( error )
    })

    //listen to the the topic 
    app.service('gateway/realtime).on ( 'payload' , function ( payload ) ){
        //filter incoming payload on topic
        if ( payload.topic === 'sensor/temperature ){
            console.log ( payload )
        }
    })

</script>

```

Open the browser console and you will get 2 message:


```
//publish to topic success
{action: "publish", date: "2019-10-02T14:35:23.241Z", msg: "Payload published for id sensor/temperature", success: true}

//payload received
{msg: "26", date: "2019-10-02T14:35:24.326Z", topic: "sensor/temperature", device: "temperature", user: "NlxWDPkeGV47diTk"}

```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```


## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).

