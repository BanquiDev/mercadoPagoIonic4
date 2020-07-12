import { Component, OnInit } from '@angular/core';

declare var Mercadopago:any



// let cardNumber = (<HTMLIonInputElement>document.getElementById('cardNumber'))
// if(cardNumber){

//   cardNumber.addEventListener('keyup', guessPaymentMethod);
//   cardNumber.addEventListener('change', guessPaymentMethod);
// }


// function guessPaymentMethod(event) {
//     console.log(event)
//     console.log(cardNumber)
//     let cardnumber = (<HTMLIonInputElement>document.getElementById("cardNumber")).value
//     console.log(cardNumber)
//     if(cardNumber){
//       if ((<any>cardnumber).length >= 6) {
//           let bin = (<any>cardnumber).substring(0,6);
//           Mercadopago.getPaymentMethod({
//               "bin": bin
//           }, setPaymentMethod);
//       }
//     }
// };

// function setPaymentMethod(status, response) {
//     if (status == 200) {
//         let paymentMethodId = response[0].id;
//         let element = (<HTMLIonInputElement>document.getElementById('payment_method_id'));
//         element.value = paymentMethodId;
//         getInstallments();
//     } else {
//         alert(`payment method info error: ${response}`);
//     }
// }
// function getInstallments(){
//   Mercadopago.getInstallments({
//       "payment_method_id": (<HTMLIonInputElement>document.getElementById('payment_method_id')).value,
//       "amount": parseFloat((<any>(<HTMLIonInputElement>document.getElementById('transaction_amount'))).value)

//   }, function (status, response) {
//       if (status == 200) {
//         console.log(response)
//           //(<HTMLInputElement>document.getElementById('installments')).options.length = 0;
//           response[0].payer_costs.forEach( installment => {
//               let opt = (<HTMLIonInputElement>document.createElement('ion-select-option'));
//               if(opt){
//               //opt.text = installment.recommended_message;
//               opt.value = installment.installments;
//               document.getElementById('installments').appendChild(opt);
//             }
//           });
//       } else {
//           alert(`installments method info error: ${response}`);
//       }
//   });
// }

// doSubmit = false;
// document.querySelector('#pay').addEventListener('submit', doPay);

// function doPay(event){
//     event.preventDefault();
//     if(!doSubmit){
//         var $form = document.querySelector('#pay');

//         Mercadopago.createToken($form, sdkResponseHandler);

//         return false;
//     }
// };

// function sdkResponseHandler(status, response) {
//     if (status != 200 && status != 201) {
//         alert("verify filled data");
//     }else{
//         var form = document.querySelector('#pay');
//         var card = document.createElement('input');
//         card.setAttribute('name', 'token');
//         card.setAttribute('type', 'hidden');
//         card.setAttribute('value', response.id);
//         form.appendChild(card);
//         doSubmit=true;
//         form.submit();
//     }
// };

@Component({
  selector: 'app-form-js',
  templateUrl: './form-js.page.html',
  styleUrls: ['./form-js.page.scss'],
})
export class FormJsPage implements OnInit {
  docType:any;

  constructor() { 
    
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158');
    Mercadopago.getIdentificationTypes((status, response)=>{
      if (status !== 200){
        
      }else{
        console.log(response)
        this.docType = response
        console.log(this.docType)
      }
    });
    console.log(Mercadopago)
  }

  ngOnInit() {
   
    console.log(cardNumber)
  }

  guessPaymentMethod(event) {
    console.log(event)
    console.log(cardNumber)
    let cardnumber = (<HTMLIonInputElement>document.getElementById("cardNumber")).value
    console.log(cardNumber)
    if(cardNumber){
      if ((<any>cardnumber).length >= 6) {
          let bin = (<any>cardnumber).substring(0,6);
          Mercadopago.getPaymentMethod({
              "bin": bin
          }, setPaymentMethod);
      }
    }
  }

  doPay(formulario){
    console.log(formulario)
  }
}
