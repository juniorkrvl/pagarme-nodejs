var Helper = require('./helper.js');
var PagarMe = require('../libs/pagarme.js');
var Request = require('request');

describe('Credit Card',function(){

  beforeEach(function(){
    PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');
  });
	
	it('should be able to create', function(done){
		var card = Helper.testCard();
		card.create(function(res){
			expect(res.id).toBeDefined();
			expect(res.first_digits).toEqual('411111');
			expect(res.last_digits).toEqual('1111');
			done();
		});
	});
	
	it('should be able to find by id', function(done){
		var card = Helper.testCard();
		card.create(function(res){
			var card2 = PagarMe.card({}).findById(res.id,function(result){
				expect(result.id).toEqual(res.id);
				expect(result.first_digits).toEqual(res.first_digits);
				expect(result.last_digits).toEqual(res.last_digits);
				done();
			});
		});
	});
	
}) ;