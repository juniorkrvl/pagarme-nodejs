var request = require('request');
var http = require('http');
var PagarMe = require('./libs/pagarme.js');
var Helper = require('./spec/helper.js');

PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');


http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'application/json'});
  
  var transaction = Helper.testTransactionWithCustomer();
  transaction.charge(function(result){
    transaction.findBy({customer: {document_number:36433809847}},function(result){
      res.end(JSON.stringify(result));
      for(var i=0; i<result.length;i++){
        console.log(result[i].customer.document_number);
      }
    },1,3);
  });
  

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');