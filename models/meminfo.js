var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemInfo = new Schema({
  name: String,
  state: String,
  party: String,




});

module.exports = mongoose.model('meminfo', infoSchema);