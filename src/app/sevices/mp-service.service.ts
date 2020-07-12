import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


declare var Mercadopago:any

@Injectable({
  providedIn: 'root'
})
export class MpServiceService {

  constructor() {

   }
    setPublishableKey(){

      return  Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')

    }

    getIdentificationTypes():Observable<any>{

      return Mercadopago.getIdentificationTypes()
    }
   
  //  setPaymentMethod(status, response) {
  //   if (status == 200) {

  //     console.log(response[0].id)
  //     //console.log(this.paymentMethodId)
  //     // console.log(typeof this.paymentMethodId)
  //     // this.paymentMethodId = response[0].id;
  //       //let element = this.payment_method_id;
  //       respuesta = response[0].id
  //       console.log(respuesta)
  //       //this.payment_method_id = paymentMethodId;
  //       //console.log(this.paymentMethodId)
  //       getInstallments();
        
        
  //   } else {
  //       console.log(response)
  //       alert(`payment method info error: ${response}`);
  //   }
  // }
}
