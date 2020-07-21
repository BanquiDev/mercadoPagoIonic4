import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service.service';
import { Observable } from 'rxjs';
import { MercadoPagoService } from '../../services/mercado-pago.service';

declare var Mercadopago: any;

@Component({
  selector: 'app-form-mp2',
  templateUrl: './form-mp2.page.html',
  styleUrls: ['./form-mp2.page.scss'],
})
export class FormMp2Page implements OnInit {
  docType:any;
  doSubmit
  formData = { 
    description: '',
    transaction_amount: 0,
    installments:'',
    email:'',
    payment_method_id:'',
    identification: {
      type:'',
      number:''
    },
    token:'',  }
  @ViewChild('form', {read:ViewContainerRef}) form;

  constructor(public backendService:BackendServiceService,
              private mpService: MercadoPagoService) {
   // console.log(Mercadopago)
  
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
    Mercadopago.getIdentificationTypes()
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

  pagar(event){
    console.log(event)
    var doSubmit = false;
    let pay = document.querySelector('#pay')
    if(pay){
        
        //pay.addEventListener('submit', doPay);
        console.log(this.form)
        var $form = document.querySelector('#pay');
        Mercadopago.createToken(($form), (status, resp)=>{
          console.log(status, resp)
          var form:HTMLFormElement = document.querySelector('#pay');
            // var card = document.createElement('input');
            // card.setAttribute('name', 'token');
            // card.setAttribute('type', 'hidden');
            // card.setAttribute('value', resp.id);
            // form.appendChild(card);
            // //console.log(card)
            console.log(resp.cardholder.identification.number)
            //doSubmit=true;
            this.formData.token = resp.id
            this.formData.identification.type = resp.cardholder.identification.type
            this.formData.identification.number = resp.cardholder.identification.number
            this.formData.installments = form.installments.value
            console.log(this.formData)
             // console.log(card)
           // this.backendService.submitForm(this.formData).subscribe(response => console.log(response),
            //                                                        error => console.log(error))
        })
    }
    // function doPay(event){
    // event.preventDefault();
    // // console.log(data-checkout)
    //   if(!doSubmit){
    //     var $form = document.querySelector('#pay');
        
    //     return false;
    //   }
    // };

    
  }
}
