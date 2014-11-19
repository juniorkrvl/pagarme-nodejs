var request = require('request');
var http = require('http');
var querystring = require('querystring');
var qs = require('qs');
var PagarMe = require('./libs/pagarme.js');
var Provider = require('./libs/pagarme/provider.js');

var Model = require('./libs/pagarme/model.js');

PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');

var transaction = PagarMe.transaction({
	amount:'550',
    card: {
     card_number:'4242424242424242',
     card_holder_name:'Test',
     card_cvv: '321',
     card_expiration_date: '1117'
    }
});

var trans = PagarMe.transaction({
 amount:'1011',
 card_hash: '100385_LezH8mWeY01tdknuP8hOr3vJR930fJTTYUZ4D/0T4tGB8DdCDOKoafgnxYFm4lZD4HhKISn6aASDyT72kPumNIfo+tzGjTW1BRGRxcKyf90oDTKwsUYZ37n9E1oELU2W8SvvCDzgSr2kFkTDqY3hxNJDPQVDTkvdM0wIwinxYzIiqDOgBm+R5c1eHhaC6JwXichLD7oc78lbUNGj/4uooSRcU+Sw84BeG0KD1PDNlrO2T+pSczdqJhXJM9hqlze3R6Abu5+VV2WUhulzYYGsgHYHChj1cTA+bTGPEP98BaA80axM83J0dNvBi6mPz7QqM1tottF1pYFShYM85Qkgog=='
});

//transaction.charge(function(data){
// console.log(data);
//});

var customer = new Model('customer',{
	document_number:'37469287884',
    name:'Junior',
	email:'interpryse@gmail.com'
});

http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'application/json'});
 
  trans.charge(function(data){
   res.end(JSON.parse(data));
  });
 
	
//  m.create(function(data){
//	  res.end(data);
//  });
	

  //api.postTransaction({
  //	  amount: 50,
  //	  card: {card_number:'11', card_cvv: '321',card_expiration_date:'1117',card_holder_name:'Test'}
  //});
	
// var headers = {
//	'User-Agent':'Super Agent/0.0.1',
//	'Content-Type':'application/x-www-form-urlencoded'
// }
// 
// var options = {
//    url: 'https://api.pagar.me/1/transactions',
//    method: 'POST',
//    headers: headers,
//    form: {'api_key': 'ak_test_degoc5yK7aIZ6We84UenZicTICiSeI',
//		   'amount': '1099',
//		   'payment_method': 'credit_card',
//		   'card_number': '4242424242424242',
//		   'card_holder_name': 'Test',
//		   'card_cvv': '321',
//		   'card_expiration_date':'1117',
//		   'installments' : '1'
//		  }
//}
 
// request(options,function(error, res, body){
//	 if(!error && res.statusCode == 200)
//		 console.log(body);
//	 else
//		 console.log(res);
// });
	
  //api.generateCardHash({card_number:'11', card_cvv: '321',card_expiration_date:'1117',card_holder_name:'Test'},function(data){
  //  res.end(data);
  //});
	
  //console.log(api._card_hash);
  
  //pagarme.getCardHash(function(data){
  //   res.end(data.public_key);
  //});
  
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');