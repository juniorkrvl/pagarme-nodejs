var Helper = require('./helper.js');
var PagarMe = require('../libs/pagarme.js');
var Request = require('request');

describe('Plan',function(){

	beforeEach(function(){
		PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');
	});

	it('should be able to create a plan', function(done){
	  var plan = Helper.testPlan();
	  plan.create(function(result){
		  expect(result.id).toBeDefined();
		  expect(result.name).toEqual('Plano gold');
		  expect(result.trial_days).toEqual(5);
		  expect(result.days).toEqual(30);
		  expect(result.amount).toEqual(3000);
		  done();
	  });
	});
	
	it('should be able to search by anything', function(done){
		var plan = Helper.testPlan();
		plan.create(function(result){
			PagarMe.plan().findBy({trial_days:5},function(res){
				expect(res.length).toBeDefined();
				for(var i=0; i<res.length;i++){
				   expect(res[i].trial_days).toEqual(5);
				}
				done();
			},1,3);
		});
	});
	
});

