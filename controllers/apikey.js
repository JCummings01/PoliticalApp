var RepBio = require('../models/bio.js');
var request = require('request');

var apiKey = '51aa68c0c15797ab67f347add9f9d73a';
var osUrl = '//www.opensecrets.org/api/?method=getLegislators&id=';
var id = NJ;

var apiController = {

  getStateMembers: function(req, res){

  request(osUrl  + id + '&apikey=' + apiKey, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response);
    alert(response);
  }
});
}
};

module.exports = apiController;

// TEST:  http://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=51aa68c0c15797ab67f347add9f9d73a
