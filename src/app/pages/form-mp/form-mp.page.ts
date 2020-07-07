import { Component, OnInit } from '@angular/core';
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

  cardNumber:string;

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
    console.log(data)
  }

  
}
