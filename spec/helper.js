var PagarMe = require('../libs/pagarme.js');
var Merge = require('merge');

exports.testTransaction = function(params){
  return PagarMe.transaction(Merge(true,{
   card_number:'4901720080344448',
   card_holder_name:'Jose da Silva',
   card_expiration_month: '10',
   card_expiration_year: '15',
   card_cvv: '314',
   amount : 1000
  },params));
};

exports.testCard = function(params){
  return PagarMe.card(Merge(true,{
    card_number:'4111111111111111',
    card_holder_name: 'Jose da Silva',
    card_expiration_month:'10',
    card_expiration_year:'15',
    card_cvv: '314'
  }));
};

exports.testTransactionWithCustomer = function(params){
 return PagarMe.transaction(Merge(true,{
   amount:1000,
   card_number: '4901720080344448',
   card_holder_name: 'Jose da Silva',
   card_expiration_month: '10',
   card_expiration_year: '15',
   card_cvv: '314',
   customer: {
     name:'Jose da Silva',
     document_number: '36433809847',
     email: 'interpryse@gmail.com',
     address: {
       street: 'Av. Brigadeiro Faria Lima',
       neighborhood: 'Itaim bib',
       zipcode: '01452000',
       street_number: 2941
     },
     phone: {
       ddd:12, 
       number: '981433533'
     },
     sex:'M',
     born_at: '1970-10-11',
   },
 },params));
};

exports.testBankAccount = function(params){
	return PagarMe.bankAccount(Merge(true,{
		bank_code:'237',
		agencia: '1935',
		agencia_dv: '9',
		conta: '23398',
		conta_dv: '9',
		legal_name: 'foo bar loem',
		document_number: '111.111.111-11'
	},params));
};

exports.testPlan = function(params){
	return PagarMe.plan(Merge(true,{
		name:'Plano gold',
		trial_days:5,
		days: 30,
		amount: 3000
	},params));
};

exports.testSubscription = function(params){
	return PagarMe.subscription(Merge(true,{
		payment_method:'credit_card',
		card_number: '4901720080344448',
		card_holder_name: 'Jose da Silva',
		card_expiration_month: '10',
		card_expiration_year: '15',
		card_cvv: '314',
		postback_url: 'http://test.com/postback',
		customer: {
			email: 'customer@pagar.me'
		}
	},params));
};

