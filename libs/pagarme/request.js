var querystring = require('querystring');
var qs = require('qs');
var https = require('https');

var host = 'api.pagar.me';
var options = {};
var dataString = '';
var headers = {};

function Request(endpoint, url, method, data) {
  
  //this.dataString = JSON.stringify(data);
  this.dataString = qs.stringify(data);
  
  this.dataString ='api_key=ak_test_degoc5yK7aIZ6We84UenZicTICiSeI';
	
  console.log(this.dataString);
  
  
  endpoint += '/' + url;
  
  if (method == 'GET') {
    endpoint += '?' + qs.stringify(data);
  }
  else {
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf8',
      'Content-Length': Buffer.byteLength(this.dataString)
    };
	console.log(this.headers);
  }
	
console.log(endpoint);
  
  this.options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };
}

Request.prototype.run = function(success){
  
  var req = https.request(this.options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      //console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

module.exports = Request;