var PagarMe = require('../pagarme.js');
var Model = require('./model.js');
var Request = require('./request.js');
var Merge = require('merge');
var NodeRSA = require('node-rsa');

function TransactionCommon(name,setup){

  this.payment_method = setup.payment_method == undefined? 'credit_card':setup.payment_method;
  this.installments = setup.installments == undefined? 1 :setup.installments;
  this.status = setup.status == undefined? 'local':setup.status;

  Model.call(this,name,setup);

}

TransactionCommon.prototype = Model.prototype;
TransactionCommon.prototype.constructor = TransactionCommon;
TransactionCommon.prototype.parent = Model.prototype;

TransactionCommon.prototype.clearCardData = function(callback){
  if (this._attributes.card_hash == undefined){
    this.getCardHash({card_number:this._attributes.card_number,card_holder_name: this._attributes.card_holder_name, card_expiration_date: this._attributes.card_expiration_date,card_cvv: this._attributes.card_cvv},function(hash){
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

TransactionCommon.prototype.getCardHash = function(card, callback){
  req = new Request(PagarMe.getFullPath() + '/transactions/card_hash_key','GET');
  req.run(function(data){
    var key = new NodeRSA(data['public_key']);
    var encryptedString = data.id + '_' + key.encrypt(card,'base64','utf8');
    callback(encryptedString);
  });
};

TransactionCommon.prototype.create = function(callback){
  
  var me=this;

  this.checkCardObject();
  
  if (this._attributes.hasOwnProperty('card_id') || this._attributes.hasOwnProperty('card_hash')){
      req = new Request(me.url(),'POST');
      req.parameters = me._attributes;
      req.run(function(data){
        var obj = Merge(true,me._attributes,data);
        callback(obj);
      });
  }
  else{
      this.clearCardData(function(hash){
        if (hash!=undefined && hash !=''){
          req = new Request(me.url(),'POST');
          req.parameters = me._attributes;
          req.run(function(data){
            var obj = Merge(true,me._attributes,data);
            callback(obj);
          });
        }
      });  
  }
  
};

TransactionCommon.prototype.checkCardObject = function(){
  if (this._attributes.hasOwnProperty('card')){
    if (this._attributes.card.hasOwnProperty('id')){
      if (this._attributes.card.id != '' || this._attributes.card.id != undefined){
          this._attributes.card_id = this._attributes.card.id;
        }
    }
    else{
      this._attributes.card_number = this._attributes.card._attributes.card_number;
      this._attributes.card_holder_name = this._attributes.card._attributes.card_holder_name;
      this._attributes.card_expiration_date = this._attributes.card._attributes.card_expiration_month + this._attributes.card._attributes.card_expiration_year;
      this._attributes.card_cvv = this._attributes.card._attributes.card_cvv;
    }
    delete this._attributes['card'];
  }
  else{
    if(this._attributes.hasOwnProperty('card_expiration_month') && this._attributes.hasOwnProperty('card_expiration_year'))
      this._attributes.card_expiration_date = this._attributes.card_expiration_month + this._attributes.card_expiration_year;
  }
};

TransactionCommon.prototype.save = function(callback){

  var me=this;
  this.checkCardObject();
  this.clearCardData(function(hash){
    me.save(callback);  
  });

};


module.exports=TransactionCommon;