var req = require('request');
var qs = require('qs');
var Merge = require('merge');
var PagarMe = require('../pagarme.js');

function Request(path, method){
	this.path = path;
	this.method = method;
	this.parameters = {};
	this.headers = {}
}

Request.prototype.encode = function(params){
		return qs.stringify(params);	
	};
	
Request.prototype.run = function(callback){
	if(PagarMe.getApiKey()==null || PagarMe.getApiKey() == ''){
		console.log('You need to configure a API key before performing requests.');
		throw new Error('You need to configure a API key before performing requests.');
	}

	this.headers = {};
	this.parameters = Merge(true,{api_key: PagarMe.getApiKey()}, this.parameters); 
	
	options = {
		url: this.path,
		method: this.method,
		headers: this.headers,
        form: this.parameters
	};
  
    req(options,function(error, res, body){
      if(!error && res.statusCode == 200)
        callback(JSON.parse(body));
      else{
        throw new Error('Error: ' + body);
        //callback(JSON.parse(body));
      }
         //callback(JSON.stringify(body));
	});

};


module.exports = Request;
