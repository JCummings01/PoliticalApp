var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apikey.js');
var request = require('request');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/politics');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', indexController.index);

app.get('/templates/:templateName', indexController.templates);

// api methods:
app.get('/get_state_members/:id', apiController.getStateMembers);

var server = app.listen(5877, function() {
	console.log('Express server listening on port ' + server.address().port);
});
