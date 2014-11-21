pagarme-nodejs
==============

Pagar.me's Node.js API

usage
-----

First of all require the PagarMe module, then call for objects that you need to work. See an example below with transaction:

```javascript
var Http = require('http');
var PagarMe = require('pagarme');

var transaction = PagarMe.transaction({
   card_number:'4901720080344448',
   card_holder_name:'Jose da Silva',
   card_expiration_month: '10',
   card_expiration_year: '15',
   card_cvv: '314',
   amount : 1000
  });
  
Http.createServer(function (req, res) {
  
   res.writeHead(200, {'Content-Type': 'application/json'});

   //charge the transaction and get the result of the Pagar.me API
   transaction.charge(function(result){
      res.end(JSON.stringify(result));
   });

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```


