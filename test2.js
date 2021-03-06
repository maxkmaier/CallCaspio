var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var config = require('./config.json');
var params = require('params');
var token_ // variable will store the token
var userName = config.clientID; // app clientID
var passWord = config.clientSecret; // app clientSecret
var caspioTokenUrl = config.tokenEndpoint; // Your application token endpoint  
var request = new XMLHttpRequest(); 
var _ = require('underscore');

function getToken(url, clientID, clientSecret) {
    var key;           
    request.open("POST", url, true); 
    request.setRequestHeader("Content-type", "application/json");
    request.send("grant_type=client_credentials&client_id="+clientID+"&"+"client_secret="+clientSecret); // specify the credentials to receive the token on request
    request.onreadystatechange = function () {
        if (request.readyState == request.DONE) {
            var response = request.responseText;
            var obj = JSON.parse(response); 
            key = obj.access_token; //store the value of the accesstoken
            token_ = key; // store token in your global variable "token_" or you could simply return the value of the access token from the function
            //console.log("Access Token:", token_);
        }
    }
}
// Get the token
getToken(caspioTokenUrl, userName, passWord);

function CallWebAPI() {
    var pkLimit = 3;
    var newresponse;
    var i;
    for (i = 0; i < pkLimit; i++){
    var request_ = new XMLHttpRequest();        
    var encodedParams = encodeURIComponent(params);
    request_.open("GET", config.resourceEndpoint + '/tables/Dim_Driver/rows?q=%7B%22select%22%3A%22PK_ID%2C%20Driveruuid%22%2C%22limit%22%3A1000%2C%20%22where%22%3A%22PK_ID%3E%20'+i+'000'+'%22%7D%20', false);
    request_.setRequestHeader("Authorization", "Bearer "+ token_);
    request_.onreadystatechange = function ()
    {
        if (this.readyState == request.DONE)
        {
            //var response;
            var response = this.responseText;
            //newresponse = _.extend(response, response);
            //var obj = JSON.parse(response); 
            // handle data as needed... 
            console.log(response);
        }
    }
    request_.send();
    }
    //console.log(obj);
}
//Get the data
setTimeout(function(){CallWebAPI()}, 5000);
// figure out how to filter:total number of PK_IDs to set looping variable pkLimit
