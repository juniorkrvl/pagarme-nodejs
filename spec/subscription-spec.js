var Helper = require('./helper.js');
var PagarMe = require('../libs/pagarme.js');
var Request = require('request');

describe('Subscription',function(){

	beforeEach(function(){
		PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');
	});
	
	it('should be able to create subscription with plan', function(done){
		var plan = Helper.testPlan();
		plan.create(function(plan_result){
			
			expect(plan_result.id).toBeDefined();
			expect(plan_result.name).toEqual('Plano gold');
			expect(plan_result.trial_days).toEqual(5);
			expect(plan_result.days).toEqual(30);
			expect(plan_result.amount).toEqual(3000);
			
			var subscription = Helper.testSubscription();
			subscription.plan = plan_result;
			subscription.create(function(result){
				expect(result.id).toBeDefined();
				done();
			});
			
		});
		
	});
	
	it('should be able to create subscription with plan and unsaved card', function(done){
		var plan = Helper.testPlan();
		var card = Helper.testCard();
		
		plan.create(function(plan_result){
			
			var subscription = PagarMe.subscription({
				postback_url:'http://test.com/postback',
				payment_method:'credit_card',
				card: card,
				plan: plan_result,
				customer: {	email:'customer@pagar.me'}
			});
			
			subscription.create(function(result){
				expect(result.id).toBeDefined();
				expect(plan_result).toBeDefined();
				//expect(result.plan.id).toEqual(plan_result.id);
				done();
			});
			
		});
		
	});
	

});