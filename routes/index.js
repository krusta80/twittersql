var express = require('express');
var tweetBank = require('../tweetBank')
var router = express.Router();
module.exports = router;

 // a reusable function
  function respondWithAllTweets (req, res, next){
    tweetBank.list()
    	.then(function(tweets) {
		    res.render('index', {
		      title: 'Twitter.js',
		      tweets: tweets,
		      showForm: true
		    });
    	});
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);



  // single-user page
  router.get('/users/:username', function(req, res, next){
    tweetBank.find({ name: req.params.username })
    .then(function(tweetsForName){
	    res.render('index', {
	      title: 'Twitter.js',
	      tweets: tweetsForName,
	      showForm: true,
	      username: req.params.username
		});
    });
 });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    tweetBank.find({ id: req.params.id })
    .then(function(tweet){
	    res.render('index', {
	      title: 'Twitter.js',
	      tweets: tweet,
	      showForm: true,
	      username: req.params.username
		});
    });
 });
  // create a new tweet
  router.post('/tweets', function(req, res, next){
    tweetBank.add(req.body.name, req.body.text)
    .then(function(){
    	res.redirect('/');
		})
});


    // var tweetHtml = swig.renderFile(
    //     path.join(__dirname, '../views/tweet.html'),
    //     { tweet : tweet },
    //     function(err, data){
    //       myio.emit('new_tweet', data);
    //     });
        
	
  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });