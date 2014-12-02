var Helper = require('./helper.js');
var PagarMe = require('../libs/pagarme.js');
var Request = require('request');

describe('Bank Account',function(){

  beforeEach(function(){
    PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');
  });
	
	it('should be able to create a bank_account',function(done){
		var bank = Helper.testBankAccount();
		bank.create(function(result){
			expect(result.bank_code).toEqual('237');
			done();
		});
	});
	
	it('should be able to search by anything', function(done){
		var bank = Helper.testBankAccount();
		PagarMe.bankAccount().findBy({bank_code:'237'},function(res){
			expect(res.length).toBeDefined();
			for(var i=0; i<res.length;i++){
			   expect(res[i].bank_code).toEqual('237');
			}
			done();
		},1,1);
	});
  
});

