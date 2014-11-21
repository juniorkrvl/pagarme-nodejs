var request = require('request');
var http = require('http');
var PagarMe = require('./libs/pagarme.js');
var Helper = require('./spec/helper.js');

PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');


http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'application/json'});
  
  var transaction = Helper.testTransaction();
  transaction.charge(function(result){
    res.end(JSON.stringify(result));
  });
  

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');