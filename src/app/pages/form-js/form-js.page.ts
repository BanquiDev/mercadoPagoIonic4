import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import  '../../../assets/mp.js'

declare var Mercadopago:any
declare var guessPaymentMethod:any
declare var hola:any
declare var cardNumber:string;
declare var doPay:any;
//declare function guessPaymentMethod(num:any)
declare function setPaymentMethod()

@Component({
  selector: 'app-form-js',
  templateUrl: './form-js.page.html',
  styleUrls: ['./form-js.page.scss'],
})
export class FormJsPage implements OnInit {
  docType:any;
  @ViewChild('cardNumber', { read:ElementRef, static:false})cardNumber:ElementRef
  constructor(private element:ElementRef) { 
    
  
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158');
    Mercadopago.getIdentificationTypes((status, response)=>{
      if (status !== 200){
        
      }else{
        console.log(response)
        this.docType = response
        console.log(this.docType)
      }
    });
    //console.log(Mercadopago)
    hola()
   // console.log(guessPaymentMethod())
  }

  ngOnInit() {
    
    //console.log(cardNumber)
  }
  guessPayment(event){
    guessPaymentMethod(event.detail.value)
   // console.log(event.detail.value)
   // console.log(this.cardNumber)
   // console.log('paga la concha de tu madre')
   // console.log(guessPaymentMethod)
   // console.log()
  }
//   guessPaymentMethod(event) {
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
//   }

//   doPay(formulario){
//     console.log(formulario)
//   }

  pagar(event){
    console.log('pagar')
    doPay(event)
  }
 }
