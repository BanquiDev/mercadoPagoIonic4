import { Component, OnInit } from '@angular/core';


declare var mercadoPago:any

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  
  
  dataCheckout = {
    description:'',
    transaction_amount: '',
    cardNumber: '',
    cardholderName: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    securityCode: '',
    docType: '',
    docNumber:''
  }
  
  constructor () {}

  ngOnInit(){
    console.log(mercadoPago)
    if(mercadoPago){
      mercadoPago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
      mercadoPago.getIdentificationTypes((status, response)=>{
        if (status !== 200){
          console.log(status)
        }else{
          console.log(response)
        }
      })
    }
  }
  pagar(){
    console.log(this.dataCheckout)
    
  }
}
