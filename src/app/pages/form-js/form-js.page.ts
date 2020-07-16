import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import  '../../../assets/mp.js'
import { NgForm } from '@angular/forms';
import { BackendServiceService } from '../../services/backend-service.service';

declare var Mercadopago:any
declare var guessPaymentMethod:any
declare var hola:any
declare var doPay:any;


@Component({
  selector: 'app-form-js',
  templateUrl: './form-js.page.html',
  styleUrls: ['./form-js.page.scss'],
})
export class FormJsPage implements OnInit {
  docType:any;
  loginForm;

  @ViewChild('cardNumber', { read:ElementRef, static:false})cardNumber:ElementRef
  constructor(private element:ElementRef,
              private backendService:BackendServiceService) { 
    
  
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158');
    Mercadopago.getIdentificationTypes((status, response)=>{
      if (status !== 200){
        
      }else{
        console.log(response)
        this.docType = response
        console.log(this.docType)
      }
    });
  
    hola()
  
  }

  ngOnInit() {
    
   
  }

  guessPayment(event){
    guessPaymentMethod(event.detail.value)
    console.log(this.cardNumber)
  }

  pagar(event){
    console.log(event)
    //doPay(event)
    this.backendService.submitForm(event).subscribe((resp)=>{
      console.log(resp)
    })
  }

  onSubmit(form){
    this.backendService.submitForm(form).subscribe((resp)=>{
      console.log(resp)
    })
  }
 }
