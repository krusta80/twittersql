var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database

var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging:true,
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



var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

// User.findOne({include:[Tweet]}).then( function(user){
// 	console.log(user.dataValues)
// });



module.exports = {
    User: User,
    Tweet: Tweet
};
