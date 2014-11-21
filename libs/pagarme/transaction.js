var TransactionCommon = require('./transaction_common.js');
var Merge = require('merge');
var Request = require('./request.js');
var PagarMe = require('../pagarme.js');

function Transaction(setup){
  TransactionCommon.call(this,'transaction',setup);
}

Transaction.prototype = TransactionCommon.prototype;
Transaction.prototype.constructor = Transaction;
Transaction.prototype.parent = TransactionCommon.prototype;

//inherit from TransactionCommon
//var inherit = Object.create(TransactionCommon.prototype);
//inherit.constructor = Transaction;
//Transaction.prototype = inherit;

Transaction.prototype.calculateInstallments = function(callback){
  req = new Model.Request(this.getFullPath() + this.url() + '/calculate_installments_amount','GET');
  req.parameters = Merge(true,this._attributes,params);
  req.run(function(data){
      callback(data);
  });
};

Transaction.prototype.charge = function(callback){
  this.parent.create.call(this,callback);
  //this.create(callback);  
};

Transaction.prototype.capture = function(callback, params){
  var me=this;
  params = params || {};
  req = new Request(me.url() + '/capture','POST');
  req.parameters = Merge(true,me._attributes,params);
  req.run(function(data){
      callback(data);
  });
};

Transaction.prototype.refund = function(callback, params){
  var me=this;
  params = params || {};
  req = new Request(me.url() + '/refund','POST');
  req.parameters = Merge(true,me._attributes,params);
  console.log(me._attributes);
  req.run(function(data){
      callback(data);
  });
};

module.exports=Transaction;