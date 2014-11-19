var Transaction = require('./transaction2.js');

function Provider(){
}

Provider.prototype.transaction = function(setup){
  return new Transaction(setup);
}

module.exports = Provider;