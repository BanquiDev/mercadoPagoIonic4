import { Component, OnInit, ViewChild } from '@angular/core';
import { MpServiceService } from '../../sevices/mp-service.service';

declare var Mercadopago:any

@Component({
  selector: 'app-form2-mp',
  templateUrl: './form2-mp.page.html',
  styleUrls: ['./form2-mp.page.scss'],
})
export class Form2MpPage implements OnInit {

   docType;
   @ViewChild('transaction_amount', {static:true}) transaction_amount:any;

  constructor(private mpService: MpServiceService) {

    this.mpService.setPublishableKey()

    // this.mpService.getIdentificationTypes().subscribe((status, resp)=>{
    //   if (status !== 200){
        
    //       }else{
    //         console.log(resp)
    //         this.docType = resp
    //         console.log(this.docType)
    //       }
    // })
    // Mercadopago.getIdentificationTypes((status, response)=>{
    //   if (status !== 200){
        
    //   }else{
    //     console.log(response)
    //     this.docType = response
    //     console.log(this.docType)
    //   }
    // })
   }

  ngOnInit() {
  }

  // guessPaymentMethod(event) {
  //   //console.log(event.detail.value)
  //   //  this.cardNumber = event.detail.value
  //   let cardnumber = event.detail.value;
  //   transaction_amount = this.transaction_amount.value
    
  //   if (cardnumber.length >= 6) {
  //       let bin = cardnumber.substring(0,6);
        
  //       Mercadopago.getPaymentMethod({
  //           "bin": bin
  //       }, this.setPaymentMethod);

  //       this.installmentOptions = nCuotas
  //       this.installmentMessage = msjCuotas
  //       console.log(this.installmentOptions)
  //   }
  // }
}
