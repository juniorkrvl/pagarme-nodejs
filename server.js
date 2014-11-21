var request = require('request');
var http = require('http');
var PagarMe = require('./libs/pagarme.js');
var Helper = require('./spec/helper.js');

PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');


http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'application/json'});
  
  var transaction = Helper.testTransactionWithCustomer();
  transaction.charge(function(transaction){
    var transactions = PagarMe.transaction({}).findBy({customer:{document_number:'37469287884'}},function(list){
      console.log(list);
      for (item in list){
        console.log(item);
      }
    },1,2);
  });
  
 
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');