var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var request = require('request');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/congress');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', indexController.index);

// api methods:
app.get('')
app.post()

var server = app.listen(5877, function() {
	console.log('Express server listening on port ' + server.address().port);
});
