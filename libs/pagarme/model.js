var Request = require('./request.js');
var Merge = require('merge');
var PagarMe = require('../pagarme.js');

function Model(name,attr){
	this._name = name;
	this._attributes = attr;
}

Model.prototype.url = function(){
	return PagarMe.getFullPath() + '/' + this._name + 's';
};

Model.prototype.create = function(callback){
	req = new Request(this.url(),'POST');
	req.parameters = this._attributes;
	req.run(function(data){
		callback(data);
	});
};

Model.prototype.save = function(callback){
	req = new Request(this.url(),'PUT');
	req.parameters = this._attributes;
	req.run(function(data){
		console.log(data);
		callback(data);
	});
};

Model.prototype.findById = function(id,callback){
	req = new Request(this.url() + '/' + id,'GET');
	req.run(function(data){
		callback(data);
	});
};

Model.prototype.findBy = function(hash, callback, page, count){
	
	page = page || 1;
	count = count || 10;
	
	req = new Request(this.url(),'GET');
	req.parameters = Merge(true,hash,{page:page,count:count});
	req.run(function(data){
		callback(data);
	});
};

Model.prototype.all = function(callback, page, count){
	page = page || 1;
	count = count || 10;
	
	req = new Request(this.url(),'GET');
	req.parameters = {page:page, count:count};
	req.run(function(data){
		callback(data);
	});
	
};

Model.prototype.test = function(callback){
  callback('teste');
};


module.exports = Model;