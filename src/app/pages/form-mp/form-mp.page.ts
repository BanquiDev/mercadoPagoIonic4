import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {mercadopago} from 'mercadopago/index'
//import * as metodos from './metodos.js';


declare var Mercadopago:any



@Component({
  selector: 'app-form-mp',
  templateUrl: './form-mp.page.html',
  styleUrls: ['./form-mp.page.scss'],
})
export class FormMpPage implements OnInit {
  docType:any;


  @ViewChild('cardNumber', {static:true}) cardNumber:string
  @ViewChild('installments', {static:true}) installments:string;
  @ViewChild('payment_method_id', {static:true}) payment_method_id:string;
  @ViewChild('transaction_amount', {static:true}) transaction_amount:any;

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
    
  }
  pagar(){
    console.log()
  }

  guessPaymentMethod(event) {
    console.log(this.cardNumber)
    let cardnumber = this.cardNumber;

    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0,6);
        Mercadopago.getPaymentMethod({
            "bin": bin
        }, this.setPaymentMethod);
    }
  }

  setPaymentMethod(status, response) {
    if (status == 200) {
        let paymentMethodId = response[0].id;
        let element = this.payment_method_id;
        // element.value = paymentMethodId;
        this.getInstallments();
    } else {
        alert(`payment method info error: ${response}`);
    }
  }

  getInstallments(){
        Mercadopago.getInstallments({
        "payment_method_id": this.payment_method_id,
        "amount": parseFloat(this.transaction_amount)

    }, function (status, response) {
        if (status == 200) {
              this.installments.options.length = 0;
            response[0].payer_costs.forEach( installment => {
                let opt = document.createElement('option');
                opt.text = installment.recommended_message;
                opt.value = installment.installments;
                this.installments.appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    });
  }
}
