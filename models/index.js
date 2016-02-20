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

// working with the data
// User.findOne()
// .then(function (user) {
//     // big old crazy object, but no name or 
//     // id anywhere in there
//     console.log(user.dataValues); 
// });

User.findOne()
.then(function (user) {
    // produces expected output. wat. 
    console.log(user.name); 
});


// User.findOne().then(function (user) {
//     return user.getTweets();
// })
// .then(function (tweets) {
//     console.log(JSON.stringify(tweets)); // another way of just logging the plain old values
// });

// User.findOne({include:[Tweet]}).then( function(user){
// 	console.log(user.dataValues)
// });
// Tweet.create({
// 	tweet:'hello',
// 	UserId:'2'
// })

// User.findOne({
// 	// where:{id:'1'},
// 	//include:[Tweet]
// }).then(function(user){
// 	console.log(user)
// });


module.exports = {
    User: User,
    Tweet: Tweet
};
