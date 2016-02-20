'use strict';

var db = require('./models/')
var _ = require('lodash');
var data = [];

function add (name, text) {
  data.push({ name: name, text: text, id: data.length });
  return _.clone(data[data.length - 1]);
}

function list () {
  var results = [];
  db.Tweet.findAll({include:[db.User]})
    .then(function(tweets) {
      results = tweets.map(function(tweet) {
        //console.log(tweet);
        return {name: tweet.User.name, text: tweet.tweet, id: tweet.id};
      });
      console.log(results);
      return results;
    })
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
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