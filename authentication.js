var request = require('request');
var config = require('./config.json');


var token = request({
  url: 'https://c4amf570.caspio.com/oauth/token',
  method: 'POST',
  auth: {
    user: config.clientID,
    pass: config.clientSecret
  },
  form: {
    'grant_type': 'client_credentials'
  }
}, function(err, res) {
  var json = JSON.parse(res.body);
  console.log("Access Token:", json.access_token);
  return json.access_token;
});

setTimeout(function(){
  function(authtoken){
  request({
    url: config.resourceEndpoint + '/tables',
    method: 'GET',
    'auth':{
      'bearer':authtoken
    }
    }, function(err, res) {
      //var json = JSON.parse(res.body);
      console.log(JSON.stringify(data));
    }
    )
};
}, 5000);

//var maximus = line 22

//setTimeout(function(){
  //maximus(json.access_token);
//}, 3000);