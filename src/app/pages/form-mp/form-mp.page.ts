import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {mercadopago} from 'mercadopago/index'
//import * as metodos from './metodos.js';


declare var Mercadopago:any

var respuesta = {}

@Component({
  selector: 'app-form-mp',
  templateUrl: './form-mp.page.html',
  styleUrls: ['./form-mp.page.scss'],
})
export class FormMpPage implements OnInit {
  docType:any;
  doSubmit:boolean = false
  paymentMethodId:string;

  @ViewChild('cardNumber', {static:true}) cardNumber:string
  @ViewChild('installments', {static:true}) installments:string;
   
  @ViewChild('transaction_amount', {static:true}) transaction_amount:any;
  @ViewChild('formulario', {static:true}) formulario:Object;
  constructor( ) { 
    
    console.log(typeof Mercadopago)
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')

    Mercadopago.getIdentificationTypes((status, response)=>{
      if (status !== 200){
        console.log(status)
      }else{
        console.log(response)
        this.docType = response
        console.log(this.docType)
      }
    })
  }
  
  ngOnInit() {
    
    //mp.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
    this.paymentMethodId = '';
    console.log(typeof this.paymentMethodId)
  }
  pagar(){
    console.log()
  }

  // cardValue(event){
  //   console.log(event)
  //   this.cardNumber = event.detail.value
  // }

  guessPaymentMethod(event) {
    //console.log(event.detail.value)
    //  this.cardNumber = event.detail.value
    let cardnumber = event.detail.value;
    console.log(cardnumber)
    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0,6);
        console.log(bin)
        Mercadopago.getPaymentMethod({
            "bin": bin
        }, this.setPaymentMethod);
    }
  }

  setPaymentMethod(status, response) {
    if (status == 200) {

      console.log(response[0].id)
      //console.log(this.paymentMethodId)
      // console.log(typeof this.paymentMethodId)
      // this.paymentMethodId = response[0].id;
        //let element = this.payment_method_id;
        respuesta = response[0].id
        console.log(respuesta)
        //this.payment_method_id = paymentMethodId;
        //console.log(this.paymentMethodId)
        this.getInstallments();
    } else {
        console.log(response)
        alert(`payment method info error: ${response}`);
    }
  }

  getInstallments(){
        Mercadopago.getInstallments({
          
        "payment_method_id": respuesta,
        "amount": parseFloat(this.transaction_amount)

    }, function (status, response) {
        if (status == 200) {
            console.log(response)
              this.installments.options.length = 0;
            response[0].payer_costs.forEach( installment => {
                let opt = document.createElement('option');
                opt.text = installment.recommended_message;
                opt.value = installment.installments;
                this.installments.appendChild(opt);
                console.log(response)
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    });
  }

  doPay(formulario){
    
     if(!this.doSubmit){
        //var $form = document.querySelector('#pay');
        console.log(formulario)
        Mercadopago.createToken(formulario, this.sdkResponseHandler);

        return false;
     }
  };

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        alert("verify filled data");
    }else{
        var form = this.formulario
        // var card = document.createElement('input');
        // card.setAttribute('name', 'token');
        // card.setAttribute('type', 'hidden');
        // card.setAttribute('value', response.id);
        // form.appendChild(card);
        // doSubmit=true;
        // form.submit();
    }
  };
}
