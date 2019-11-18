# rockiot-api

__0.1.1__


## Features

```rockiot-api``` is a powerful REST API/Realtime API system to connect to your MQTT Brokers/Devices, get and publish realtime data, manage your devices asset, store realtime data.

This project uses [Feathersjs](http://feathersjs.com). An open source web framework for building modern real-time applications.

#### Microservices built on REST API / Realtime API
Every IoT device can have now his REST API / Realtime API in order to manage it, get MQTT realtime data, publish MQTT data, store incoming data.

All microservices and methods are available thru our client (rockiot-api-dev) using websockets transport protocol

#### Built-in authentication

rockiot-api has a built-in authentication system (that you can extend) based on JWT Web Tokens (username+password by default).

All microservices requires authentication and are safely transmitted to client using wss protocol (SSL certificate must be installed on the server).

## Documentation

[Online documentation](https://iotiscool-api.herokuapp.com/docs)

## Get Started

Clone our respository

```
$ git clone https://github.com/swina/rockiot-api.git

```

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/rockiot-api
    npm install
    ```

3. Start your app

    ```
    npm start
    ```
    You can use nodemon in order to auto restart if you set some changes to the app.

    ```
    nodemon src/index.js

    ```
4. Create a user (admin) only for testing purpose

    **If you cloned the repository the user has been created automatically**

    ```
    curl POST --data={"email":"admin","password":"password"}

    ```
5. Change ```src/users/users.hooks.js``` :

    ```
    create: [ hashPassword('password') , authenticate('jwt') ],
    ```   
    in order to prevent to add users without authentication.


## Client usage (JS)

Check  [**rockiot-client**](https://github.com/swina/rockiot-client) to connect to the **rockiot-api**

*Client uses websocket protocol and you don't need to add any other external library like axios, jquery, etc.*


#### Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

#### Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```


#### Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog
__0.1.1__

- Fixed channels payload publish event

__0.1.0__

- Initial release

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
