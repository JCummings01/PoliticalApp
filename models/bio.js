var mongoose = require('mongoose');

var bioSchema = new mongoose.Schema({
  fullName: String,
  firstName: String,
  lastName: String,
  party: String,
  state: String,
  stateName: String,
  title: String,
  chamber: String,
  birthday: String,
  termStart: String,
  termEnd: String,
  phone: String,
  website: String,
  contactForm: String,
  fax: String,
  voteSmartId: String,
  uniqueId: String
});


module.exports = mongoose.model('bio', bioSchema);