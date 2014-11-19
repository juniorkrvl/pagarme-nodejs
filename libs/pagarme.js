var Transaction = require('./pagarme/transaction2.js');

var _api_key = null;
var _encryption_key = null;
var _api_endpoint = 'https://api.pagar.me/1';

exports.setApiKeys = function(api_key, encryption_key){
	_api_key = api_key;
	_encryption_key = encryption_key;
};

exports.transaction = function(setup){
	return new Transaction(setup);
};

exports.getApiKey = function(){
	return _api_key;
};

exports.getEncryptionKey = function(){
	return _encryption_key;
};

exports.getFullPath= function(){
	return _api_endpoint;
};
