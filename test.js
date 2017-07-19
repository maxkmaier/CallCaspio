var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var config = require('./config.json');
var params = require('params');
var token_ // variable will store the token
var userName = config.clientID; // app clientID
var passWord = config.clientSecret; // app clientSecret
var caspioTokenUrl = config.tokenEndpoint; // Your application token endpoint  
var request = new XMLHttpRequest(); 
var extend = require('extend');

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
    //var text = {};
    var i;
    for (i = 0; i < pkLimit; i++){
    var request_ = new XMLHttpRequest();        
    var encodedParams = encodeURIComponent(params);
    request_.open("GET", config.resourceEndpoint + '/tables/Dim_Driver/rows?q=%7B%22limit%22%3A1000%2C%20%22where%22%3A%22PK_ID%3E%20'+i+'000'+'%22%7D%20', true);
    request_.setRequestHeader("Authorization", "Bearer "+ token_);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == request.DONE) {
            var text = ""
            var response = request_.responseText;
            var obj = JSON.parse(response); 
            // handle data as needed... 
            obj += text;
            console.log(text);
        }
    }
    }
    //console.log(obj);
}
//Get the data
setTimeout(function(){CallWebAPI()}, 5000);
// figure out how to filter:total number of PK_IDs to set looping variable pkLimit

