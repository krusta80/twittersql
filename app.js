var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes/');
var app = express();

var port = process.env.port || 1337;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname + '/views');
app.use(morgan('dev'));

app.use('/',routes);

app.listen(port,function(){
	console.log("Server running on port "+port);
});