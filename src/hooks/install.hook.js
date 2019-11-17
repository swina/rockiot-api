module.exports = (options = {}) => {
  return async context => {
    context.app.service('install').find().then ( response => {
      if ( response.total === 0 ){
        console.log ( '\x1b[35m' , 'WARNING !!! You need to change or update the admin account' );
        console.log ( '\x1b[32m' , 'Go to http://localhost:3030/install and follow instructions');
      }
    });
    return context;
  };
};