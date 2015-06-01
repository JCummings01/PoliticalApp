var mongoose = require('mongoose');

var bioSchema = new mongoose.Schema({
  candidateId: String,
  fullName: String,
  lastName: String,
  party: String,
  state: String,
  birthday: String,
  termStart: String,
  phone: String,
  website: String,
  contactForm: String,
  fax: String,
  voteSmartId: String,
  uniqueId: String,
  twitter_id: String,
  youtube_url: String,
  facebook_id: String,
  feccandid: String,
});


module.exports = mongoose.model('bio', bioSchema);