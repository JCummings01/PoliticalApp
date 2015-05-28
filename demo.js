// Add to file, and then add file to gitignore
// 1: file needs all private keys ()
// 2: has all private keys (private.js)
// 3: configuration file for other users to know how to config (config.js)
// .gitignore, app.js, private.js, private.sample.js
//
//  (app.js notes) var superPrivateApi = function(key, username, password){
//  console.log('Don't put those values on the server!')}
//  };
//
//  superPrivateApi('123abc', 'chris', 'test');
//  (Avoid storing these keys in a git-managed file!)
//
//  (private notes, still in app.js)
//  var keys = require('./private.js');
//
//  (private.js notes)
//  module.exports = {
//  key: 'abc123',
//  username: 'chris',
//  password: 'test'
//  };
//
//  (in app.js, after private.js)
//  var keys = require('./private.js');
//  superPrivateApi(keys.key, keys.username, keys.password);
//
//  (private sample js, step 6)
//  module.exports = {
//  key: '<api key here>',
//  username: '<api username here>',
//  password: '<api password here>'
//  };
//
//
//
// 1 - add private.js to .gitignore
// 2 - (app.js notes)
// 3 - Use private file to pull in values that we need (private notes app.js)
// 4 - (private.js notes)()
// 5 - in app.js, call privateApi (in app.js, after private.js)
// 6 - create sampleprivate.js (private sample js, step 6)
// 7 - Heroku has Config Vars (process.env/node_env)(add your own keys and values)(then modify app.js to )
//
//
//APPJS(b4 heroku)
//
//var superPrivateApi = function(key, username, password){
//  console.log('Don't put those values on the server!')}
//  };
//
//var keys = require('./private.js');
//  superPrivateApi(keys.key, keys.username, keys.password);
//
//
//APPJS(updated for heroku)
//
//var superPrivateApi = function(key, username, password){
//  console.log('Don't put those values on the server!')}
//  };
//
//var keys;
//if(process.env.API_KEY){
//  keys = {
//    key: process.env.API_KEY;
//    username: process.env.API_USERNAME;
//    password: process.env.API_PASSWORD;
//    };
//  } else {
//    keys = require('./private.js');
//  }
//  superPrivateApi(keys.key, keys.username, keys.password);