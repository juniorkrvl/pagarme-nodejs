var Request = require('./request.js');
var PagarMe = require('../pagarme.js');
var NodeRSA = require('node-rsa');

var payment_method = 'credit_card';
var installments = 1;
var status = 'local';

function Transaction(setup, pagarme){
	this.prototype = pagarme;
	this._setup = setup;
	this._setup.api_key = this.prototype._api_key;
	this._setup.card_hash = '';
}

Transaction.prototype.validateSetup = function(setup){
	if (setup.hasOwnProperty('payment_method')){
		if(setup.payment_method == 'credit_card' && setup.card_hash == '')
			console.log('Card hash is required');
		if(setup.payment_method == 'credit_card' && !setup.hasOwnProperty('credit_card'))
			console.log('Credit card is required.')
	}
	if (setup.hasOwnProperty('amount')){
		if (!setup.amount > 0)
			console.log('Amount must be greater than zero.');
	}
	
	return true;
};

Transaction.prototype.generateCardHash = function(card, success){

	var reqs = new Request(this.prototype._api_endpoint, 'transactions/card_hash_key', 'GET', 
						   {
							api_key:this.prototype._api_key, 
							encryption_key: this.prototype._encryption_key
						   });
    
	reqs.run(function(data){
      var key = new NodeRSA(data['public_key']);
      var encryptedString = data.id + '_' + key.encrypt(card,'base64','utf8');
	  success(encryptedString);
    });
  };

Transaction.prototype.run = function(){
	
	var endpoint = this.prototype._api_endpoint;
	var api_key = this.prototype._api_key;
	var encryption_key = this.prototype._encryption_key;
	var setup = this._setup;
	
	if (this.validateSetup(setup)){
		this.generateCardHash(setup.card,function(cardHash){
			
			var post = new Request(endpoint,'transactions/','POST',{
				api_key: api_key,
				encryption_key: encryption_key,
				amount: setup.amount,
				payment_method: 'credit_card',
				card_hash: cardHash,
				installments: 1
			});
			
			post.run(function(data){
				console.log(data);
			});
			
		});
	}
	
};

module.exports = Transaction;