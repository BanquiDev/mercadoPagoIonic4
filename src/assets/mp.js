
var cardNumber = document.getElementById('cardNumber')

if(cardNumber){
    console.log(cardNumber)
    cardNumber.addEventListener('keyup', guessPaymentMethod);
    cardNumber.addEventListener('change', guessPaymentMethod);
}
    
    function guessPaymentMethod(event) {
        let cardnumber = document.getElementById("cardNumber").value;
       
        if (cardnumber.length >= 6) {
            let bin = cardnumber.substring(0,6);
            Mercadopago.getPaymentMethod({
                
                "bin": bin
            }, setPaymentMethod);
        }
    };
    
    function setPaymentMethod(status, response) {
        if (status == 200) {
           // console.log(status, response)
            let paymentMethodId = response[0].id;
            let element = document.getElementById('payment_method_id');
            element.value = paymentMethodId;
            console.log(paymentMethodId)
            getInstallments();
        } else {
            //console.log(response)
            alert('El numero de Tarjeta no es válido. Por favor ingreselo nuevamente');
        }
    }

    function getInstallments(){
        Mercadopago.getInstallments({
            "payment_method_id": document.getElementById('payment_method_id').value,
            "amount": parseFloat(document.getElementById('transaction_amount').value)
            
        }, function (status, response) {
            if (status == 200) {
                document.getElementById('installments').options.length = 0;
                //console.log(response[0].payer_costs)
                response[0].payer_costs.forEach( installment => {
                    let opt = document.createElement('option');
                    opt.text = installment.recommended_message;
                    opt.value = installment.installments;
                    //console.log(opt)
                    document.getElementById('installments').appendChild(opt);
                });
            } else {
                //console.log('Hubo un Error. Reingrese el numero de Tarjeta')
                alert('Hubo un Error. Reingrese el numero de Tarjeta');
            }
        });
    }    
  
