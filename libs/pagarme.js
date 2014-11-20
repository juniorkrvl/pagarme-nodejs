var Transaction = require('./pagarme/transaction.js');
var Model = require('./pagarme/model.js');

var _api_key = null;
var _encryption_key = null;
var _api_endpoint = 'https://api.pagar.me/1';

exports.setApiKeys = function(api_key, encryption_key){
	_api_key = api_key;
	_encryption_key = encryption_key;
};

exports.transaction = function(setup){return new Transaction(setup);};

exports.card = function(setup){return new Model('card',setup);};

exports.plan = function(setup){return new Model('plan',setup);};

exports.subscription = function(setup){return new Model('subscription', setup);};

exports.customer = function(setup){return new Model('customer', setup);};

exports.address = function(setup){return new Model('address', setup);};

exports.phone = function(setup){return new Model('phone', setup);};

exports.bankAccount = function(setup){return new Model('bank_account', setup);};

exports.getApiKey = function(){return _api_key;};

exports.getEncryptionKey = function(){return _encryption_key;};

exports.getFullPath= function(){return _api_endpoint;};