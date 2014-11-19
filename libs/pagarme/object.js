var _name = '';
var _attributes = {};

function PagarMeObject(name,attributes){
  this._name = name || '';
  this._attributes = attributes || {};
  this.update(attributes);
}

//PagarMeObject.build = function(attributes){
//  return new PagarMeObject(attributes);
//};

PagarMeObject.prototype.update = function(attr_values){

  // update all keys
  for (var key in attr_values){
    var value = attr_values[key];
    if (!this.hasOwnProperty[key])
        this[key] = value;
  }
  
};

PagarMeObject.prototype.create = function(attributes){
  for (var item in attributes)
    if(!this.hasOwnProperty[key])
      this[key]=undefined;
};

module.exports = PagarMeObject;