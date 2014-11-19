var Model = require('./model.js');
var Merge = require('merge');
var NodeRSA = require('node-rsa');
var Request = require('./request2.js');
var PagarMe = require('../pagarme.js');

function Transaction(setup){
  this.payment_method = setup.payment_method == undefined? 'credit_card':setup.payment_method;
  this.installments = setup.installments == undefined? 1 :setup.installments;
  this.status = setup.status == undefined? 'local':setup.status;
  
  Model.call(this,'transaction',setup);
}

//inherit from Model
var inherit = Object.create(Model.prototype);
inherit.constructor = Transaction;
Transaction.prototype = inherit;

Transaction.prototype.checkCardObject = function(){
  if (this._attributes.hasOwnProperty('card')){
    if (this._attributes.card.hasOwnProperty('id')){
      if (this._attributes.card.id > 0)
        this.card_id = this._attributes.card.id;
    }
    else{
      this._attributes.card_number = this._attributes.card.card_number;
      this._attributes.card_holder_name = this._attributes.card.card_holder_name;
      this._attributes.card_expiration_date = this._attributes.card.card_expiration_date;
      this._attributes.card_cvv = this._attributes.card.card_cvv;
    }
    delete this._attributes['card'];
    console.log(this._attributes);
  }
};

Transaction.prototype.clearCardData = function(callback){
  if (this._attributes.card_hash == undefined){
    this.getCardHash({card_number:this._attributes.card_number,card_holder_name: this._attributes.card_holder_name, card_expiration_date: this._attributes.card_expiration_date,card_cvv: this._attributes.card_cvv},function(hash){
      //this._attributes.card_hash = hash;
      callback(hash);
    });
  }
  else{
    delete this._attributes['card_number']; 
    delete this._attributes['card_holder_name'];
    delete this._attributes['card_expiration_date'];
    delete this._attributes['card_cvv'];
    callback(this._attributes.card_hash);
  }
  
  //this.card_id !== undefined ||
  
};

Transaction.prototype.getCardHash = function(card, callback){
    req = new Request(PagarMe.getFullPath() + this.url() + '/card_hash_key','GET');
    req.run(function(data){
      data = JSON.parse(data);
      var key = new NodeRSA(data['public_key']);
      var encryptedString = data.id + '_' + key.encrypt(card,'base64','utf8');
      console.log(encryptedString);
	  callback(encryptedString);
    });
};

Transaction.prototype.calculateInstallments = function(callback){
  req = new Model.Request(this.getFullPath() + this.url() + '/calculate_installments_amount','GET');
  req.parameters = Merge(true,this._attributes,params);
  req.run(function(data){
      callback(data);
  });
};

Transaction.prototype.charge = function(callback){
  
  var me=this;
  
  this.checkCardObject();
  this.clearCardData(function(hash){
    //console.log(hash);
    //Model.create.call(this,callback);
    me.create(callback);  
  });
  
};

Transaction.prototype.capture = function(params, callback){
  req = new Request(this.getFullPath() + this.url() + '/capture','POST');
  req.parameters = Merge(true,this._attributes,params);
  req.run(function(data){
      callback(data);
  });
};

Transaction.prototype.refund = function(params, callback){
  req = new Request(this.getFullPath() + this.url() + '/refund','POST');
  req.parameters = Merge(true,this._attributes,params);
  req.run(function(data){
      callback(data);
  });
};


module.exports=Transaction;