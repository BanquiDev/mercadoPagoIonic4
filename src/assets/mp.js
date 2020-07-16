//var backendService = require('../app/services/backend-service.service')
import * as backendService from '../app/services/backend-service.service'

function hola(){
    console.log('hola')
    console.log(Mercadopago)
}

var cardNumber = document.getElementById('cardNumber')

if(cardNumber){
    console.log(cardNumber)
    cardNumber.addEventListener('keyup', guessPaymentMethod);
    cardNumber.addEventListener('change', guessPaymentMethod);
}
    
    function guessPaymentMethod(event) {
        let cardnumber = document.getElementById("cardNumber").value;
        console.log('adivinar')
        console.log(cardnumber)
        if (cardnumber.length >= 6) {
            let bin = cardnumber.substring(0,6);
            console.log(bin)
            Mercadopago.getPaymentMethod({
                
                "bin": bin
            }, setPaymentMethod);
        }
    };
    
    function setPaymentMethod(status, response) {
        if (status == 200) {
            console.log(status, response)
            let paymentMethodId = response[0].id;
            let element = document.getElementById('payment_method_id');
            element.value = paymentMethodId;
            console.log(paymentMethodId)
            getInstallments();
        } else {
            alert(`payment method info error: ${response}`);
        }
    }

    function getInstallments(){
        Mercadopago.getInstallments({
            "payment_method_id": document.getElementById('payment_method_id').value,
            "amount": parseFloat(document.getElementById('transaction_amount').value)
            
        }, function (status, response) {
            if (status == 200) {
                document.getElementById('installments').options.length = 0;
                console.log(response[0].payer_costs)
                response[0].payer_costs.forEach( installment => {
                    let opt = document.createElement('option');
                    opt.text = installment.recommended_message;
                    opt.value = installment.installments;
                    console.log(opt)
                    document.getElementById('installments').appendChild(opt);
                });
            } else {
                alert(`installments method info error: ${response}`);
            }
        });
    }    
    
    doSubmit = false;
    let pay = document.querySelector('#pay')
    if(pay){

        pay.addEventListener('submit', doPay);
    }

    function doPay(event){
        event.preventDefault();
       // console.log(data-checkout)
        if(!doSubmit){
            var $form = document.querySelector('#pay');
            console.log($form)
            Mercadopago.createToken($form, sdkResponseHandler);

            return false;
        }
    };

    function sdkResponseHandler(status, response) {
        if (status != 200 && status != 201) {
            console.log(status, response)
            alert("verify filled data");
        }else{
            console.log(status, response)
            var form = document.querySelector('#pay');
            var card = document.createElement('input');
            card.setAttribute('name', 'token');
            card.setAttribute('type', 'hidden');
            card.setAttribute('value', response.id);
            form.appendChild(card);
            doSubmit=true;
            console.log(form.description.value)
            //form.submit();
            backendService.submitForm(form)
            //console.log(backendService)
        }
    };    
