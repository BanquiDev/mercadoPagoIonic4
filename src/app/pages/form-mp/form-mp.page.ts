import { Component, OnInit } from '@angular/core';
//import {mercadopago} from 'mercadopago/index'
//import * as mp from 'mPago';


declare var mp:any

@Component({
  selector: 'app-form-mp',
  
  templateUrl: './form-mp.page.html',
  styleUrls: ['./form-mp.page.scss'],
})
export class FormMpPage implements OnInit {

  constructor( ) { 

    
    mp.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
    // mercadoPago.getIdentificationTypes((status, response)=>{
    //   if (status !== 200){
    //     console.log(status)
    //   }else{
    //     console.log(response)
    //   }
    // })
  }

  ngOnInit() {
    
    
  }

}
