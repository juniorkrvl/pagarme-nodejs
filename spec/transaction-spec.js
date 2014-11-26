var Helper = require('./helper.js');
var PagarMe = require('../libs/pagarme.js');
var Request = require('request');

describe('Transaction',function(){

  beforeEach(function(){
    PagarMe.setApiKeys('ak_test_degoc5yK7aIZ6We84UenZicTICiSeI','ek_test_y2xsJCewfhfc9WBTB79HnCmUWQ86df');
  });
  
  it('should be able to charge', function(done){
    
    var transaction = Helper.testTransaction();
    expect(transaction.status).toEqual('local');
    
    transaction.charge(function(data){
      expect(data.status).toEqual('paid');
      done();
    });
    
  }); 

  it('should be able to charge with a saved card', function(done){
    var card = Helper.testCard();
    
    card.create(function(card){
      
      var transaction = PagarMe.transaction({
        card: card,
        amount: 1000,
        payment_method: 'credit_card'
      });

      transaction.charge(function(result){
        expect(result.status).toBe('paid');
        done();
      });
      
    });
    
  });

  it('should be able to charge with an unsaved card',function(done){

    var card = Helper.testCard();
    
    var transaction = PagarMe.transaction({
      card: card,
      amount: 1000,
      payment_method: 'credit_card'
    });

    transaction.charge(function(result){
      expect(result.status).toBe('paid');
      done();
    });
    
  });

  it('should return a card object',function(done){
    var transaction = Helper.testTransaction();
    transaction.create(function(transaction){
      expect(transaction.card.id).toBeDefined();
      expect(transaction.card.first_digits).toBe('490172');
      expect(transaction.card.last_digits).toBe('4448');
      done();
    })
  });
  

  it('should be able to find by anything',function(done){
    var transaction = Helper.testTransactionWithCustomer();
    transaction.charge(function(result){
      transaction.findBy({customer: {document_number:36433809847}},function(res){
        expect(res.length).toEqual(3);
        for(var i=0; i<result.length;i++){
          expect(res[i].customer.document_number).toEqual(36433809847);
        }
        done();
      },1,3);
    });
  
  });
  
  it('should be able to create transaction with boleto', function(done){
    
    var transaction = PagarMe.transaction({
      payment_method: 'boleto',
      amount: '1000'
    });
    
    transaction.charge(function(result){
      expect(result.payment_method).toEqual('boleto');
      expect(result.status).toEqual('waiting_payment');
      expect(result.amount).toEqual(1000);  
      done();
    });

  });
  
  it('should be able to send metadata', function(done){
    var transaction = Helper.testTransaction();
    transaction._attributes.metadata = {event: {name:'Pagarme Event',id:335}};
    transaction.charge(function(result){
      expect(result.metadata).toBeDefined();
      
      transaction.findById(result.id, function(transaction2){
        expect(Number(transaction2.metadata.event.id)).toEqual(335);
        expect(transaction2.metadata.event.name).toEqual('Pagarme Event');
        done();
      });
    
    });
  });
  
  it('should be able to find a transaction', function(done){
    var transaction = Helper.testTransaction();
    transaction.charge(function(result){
      transaction.findById(result.id,function(transaction2){
        expect(transaction2.id).toEqual(result.id);
        done();
      });
    });
  });
  
//  it('should be able to refund', function(done){
//    var transaction = Helper.testTransaction();
//    transaction.charge(function(result){
//      
//    });
//  });
  

});