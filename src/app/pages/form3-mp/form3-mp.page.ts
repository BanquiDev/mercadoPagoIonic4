import { Component, OnInit } from '@angular/core';

declare var Mercadopago:any

@Component({
  selector: 'app-form3-mp',
  templateUrl: './form3-mp.page.html',
  styleUrls: ['./form3-mp.page.scss'],
})
export class Form3MpPage implements OnInit {
  docType:any;
  
  constructor() { 
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
  }

  ngOnInit() {
  }

}
