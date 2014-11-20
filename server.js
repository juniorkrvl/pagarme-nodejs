var request = require('request');
var http = require('http');
var querystring = require('querystring');
var qs = require('qs');

var PagarMe = require('./libs/pagarme.js');


var Model = require('./libs/pagarme/model.js');

//PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');

var transaction = PagarMe.transaction({
	amount:'550',
    card: {
     card_number:'4242424242424242',
     card_holder_name:'Test',
     card_cvv: '321',
     card_expiration_date: '1117'
    }
});

var card = PagarMe.card();

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
 
 card.findById('card_ci2nctt610006gy16cwx11spr',function(data){
  res.end(JSON.parse(data));
 });
 
//  transaction.charge(function(data){
//   res.end(JSON.parse(data));
//  });
 
// transaction.all(function(data){
//   res.end(JSON.parse(data)); 
// },1,1);
 
 
 
	
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