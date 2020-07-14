import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { Observable } from 'rxjs';
//import {mercadopago} from 'mercadopago/index'
//import * as metodos from './metodos.js';


declare var Mercadopago:any

var respuesta = {}
var transaction_amount = ''
var installments = {}
var nCuotas = []
var msjCuotas = [];

  function getInstallments(){
    Mercadopago.getInstallments({
      
    "payment_method_id": respuesta,
    "amount": parseFloat(transaction_amount)

    }, function (status, response:Observable<any>) {
    if (status == 200) {
        console.log(response[0].payer_costs)
        installments = response[0].payer_costs
      
        //  this.installments.options.length = 0;
            response[0].payer_costs.forEach( installment => {
            //let opt = document.createElement('option');
            msjCuotas.push( installment.recommended_message);
            nCuotas.push(installment.installments);
           // console.log(installment.installments)
            
           // this.installments.appendChild(opt);
            
        });
    } else {
        alert(`installments method info error: ${response}`);
      }
      console.log(msjCuotas)
            console.log(nCuotas)
    });
  }

@Component({
  selector: 'app-form-mp',
  templateUrl: './form-mp.page.html',
  styleUrls: ['./form-mp.page.scss'],
})
export class FormMpPage implements OnInit {
  docType:any;
  doSubmit:boolean = false
  paymentMethodId:string;
  installmentOptions = []
    
  

  @ViewChild('cardNumber', {static:true}) cardNumber:string
  @ViewChild('installments', {static:true}) installments:string;
  @ViewChild('options', {static:true}) options:string;
  @ViewChild('transaction_amount', {static:true}) transaction_amount:any;
  @ViewChild('formulario', {static:true}) formulario:Object;

  constructor( ) { 
    
    console.log(Mercadopago)
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')

    Mercadopago.getIdentificationTypes((status, response)=>{
      if (status !== 200){
        
      }else{
        console.log(response)
        this.docType = response
        console.log(this.docType)
      }
    })
    console.log(installments)
  }
  
  ngOnInit() {
    
    //mp.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
    this.paymentMethodId = '';
  //  console.log(typeof this.paymentMethodId)
  //  console.log(this.transaction_amount.value)
  }
  

  guessPaymentMethod(event) {
   
    let cardnumber = event.detail.value;
     transaction_amount = this.transaction_amount.value
    
    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0,6);
        
        Mercadopago.getPaymentMethod({
            "bin": bin
        }, this.setPaymentMethod);

        this.installmentOptions[0] = nCuotas

        
        this.installmentOptions[1] = msjCuotas
        console.log(this.installmentOptions)
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
        getInstallments();
        
        
    } else {
        console.log(response)
        alert(`payment method info error: ${response}`);
    }
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
