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
    var stateReps = [];
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // var reps = response.body.response.legislator['@attributes'];
        var repArray = [];
        for (var i = 0; i < body.response.legislator.length; i++) {

          repArray.push(response.body.response.legislator[i]);

          var repMaker = new RepBio({
          fullName: repArray[i]['@attributes'].firstlast,
          lastName: repArray[i]['@attributes'].lastname,
          party: repArray[i]['@attributes'].party,
          state: req.params.id,
          birthday: repArray[i]['@attributes'].birthdate,
          termStart: repArray[i]['@attributes'].first_elected,
          phone: repArray[i]['@attributes'].phone,
          website: repArray[i]['@attributes'].website,
          contactForm: repArray[i]['@attributes'].webform,
          fax: repArray[i]['@attributes'].fax,
          voteSmartId: repArray[i]['@attributes'].votesmart_id,
          uniqueId: repArray[i]['@attributes'].bioguide_id
        });
        stateReps.push(repMaker);
        }

      } else {
        res.send('API request failed :[ ');
      }
    res.send(stateReps);
    });
  },

  saveMemberBio: function(req, res){
    var newMember = new RepBio({
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
