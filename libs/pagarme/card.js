var TransactionCommon = require('./transaction_common.js');
var PagarMe = require('../pagarme.js');

function Card(setup){
  TransactionCommon.call(this,'card',setup);
}

//inherit from TransactionCommon
//var inherit = Object.create(TransactionCommon.prototype);
//inherit.constructor = Card;
//Card.prototype = inherit;

Card.prototype = TransactionCommon.prototype;
Card.prototype.constructor = Card;
Card.prototype.parent = TransactionCommon.prototype;

module.exports = Card;