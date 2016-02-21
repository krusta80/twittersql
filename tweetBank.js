'use strict';

var db = require('./models/')
var _ = require('lodash');
var data = [];

function parseTweets(tweets) {
  //console.log("in parseTweets");
  return tweets.map(function(tweet) {
        //console.log(tweet);
        return {name: tweet.User.name, text: tweet.tweet, id: tweet.id};
      });
}

function add (name, text) {

  var newTweet = {name: name, tweet: text};
  return db.User.findOne()//{where: {name: name}})
  .then(function(user){
      var newTweet = {userId: user.id, tweet: text};
      db.Tweet.create(newTweet);
  })
}

function list () {
  return db.Tweet.findAll(
    {
      include:[db.User]
    })
    .then(parseTweets);
}

function find (properties) {

  var key = Object.keys(properties);
  return db.Tweet.findAll(
      {
        include:[{model: db.User, where: {[key]: properties[key]}}]
      })
      .then(parseTweets);
  }

module.exports = { add: add, list: list, find: find };

// var randArrayEl = function(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// };

// var getFakeName = function() {
//   var fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Charlotte', 'Scott', 'Ayana', 'Omri', 'Gabriel', 'Joe'];
//   var fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
//   return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
// };

// var getFakeTweet = function() {
//   var awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing'];
//   return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
// };

// for (var i = 0; i < 10; i++) {
//   module.exports.add( getFakeName(), getFakeTweet() );
// }