import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var Mercadopago:any;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor() { }

  getIdentificationTypes(){

    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
    Mercadopago.getIdentificationTypes()
  }

  getPaymentsMethods(value){
    // console.log(value)
    let cardnumber = value
    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0,6);
      return new Observable ((bin)=>{
        Mercadopago.getPaymentMethod({"bin":bin}, (status, response)=>{
          console.log(status, response)
        })
      })  
    }
  }

  crearToken(){

    //Mercadopago.createToken(form)
  }
}
