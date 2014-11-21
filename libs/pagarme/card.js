var TransactionCommon = require('./transaction_common.js');
var PagarMe = require('../pagarme.js');

function Card(setup){
  TransactionCommon.call(this,'card',setup);
}

Card.prototype = TransactionCommon.prototype;
Card.prototype.constructor = Card;
Card.prototype.parent = TransactionCommon.prototype;

module.exports = Card;