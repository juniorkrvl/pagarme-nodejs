var Request = require('./request2.js');
var PagarMe = require('../pagarme.js');

function Model(name,attr){
	this._name = name;
	this._attributes = attr;
}

//var inherit = Object.create(Model.prototype);
//inherit.constructor = Model;
//Model.prototype = inherit;
//Model.constructor = Model;

Model.prototype.urlId = function(){
	if (!this.hasOwnProperty('id')){
	   console.log('Invalid ID')
	   return '';
	}
	return this.url() + '/' + this.id;
};

Model.prototype.url = function(){
	return '/' + this._name + 's';
};

Model.prototype.create = function(callback){
	console.log(this._attributes);
	req = new Request(PagarMe.getFullPath() + this.url(),'POST');
	req.parameters = this._attributes;
	req.run(function(data){
		callback(JSON.stringify(data));
	});
};


module.exports = Model;