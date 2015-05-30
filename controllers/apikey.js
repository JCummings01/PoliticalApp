var RepBio = require('../models/bio.js');
var request = require('request');


var apiKey = '51aa68c0c15797ab67f347add9f9d73a';
var osUrl = 'https://www.opensecrets.org/api/?method=getLegislators&id=';

var apiController = {
  getStateMembers: function(req, res){

    var options = {
      url: osUrl  + req.params.id + '&apikey=' + apiKey + '&output=json',
      json: true,
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var repArray = [];
        var reps = response.body.response.legislator['@attributes'];
        for (var i = 0; i <= 2 ; i++) {
          repArray.push(response.body.response.legislator[i]['@attributes']);
        }
          console.log(repArray);
      } else {
        res.send('getStateMembers request failed');
      }
    });
  },

  saveMemberBio: function(req, res){
    var newMember = new bioSchema({
      fullName: req.body.firstlast,
      lastName: req.body.lastname,
      party: req.body.party,
      state: getStateMembers.id, //How to get state code here
      birthday: req.body.birthdate,
      termStart: req.body.first_elected,
      phone: req.body.phone,
      website: req.body.website,
      contactForm: req.body.webform,
      fax: req.body.fax,
      voteSmartId: req.body.votesmart_id,
      uniqueId: req.body.bioguide_id
    });
  }

};


module.exports = apiController;

// TEST:  http://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=51aa68c0c15797ab67f347add9f9d73a
