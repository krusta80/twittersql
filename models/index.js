var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database

// var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
//     dialect: "mysql",
//     port:    3306,
// });


var twitterjsDB = new Sequelize('twitter', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});


twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });