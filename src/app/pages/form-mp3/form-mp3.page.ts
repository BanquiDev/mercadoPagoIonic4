import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { BackendServiceService } from '../../services/backend-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

declare var Mercadopago: any;

@Component({
  selector: 'app-form-mp3',
  templateUrl: './form-mp3.page.html',
  styleUrls: ['./form-mp3.page.scss'],
})
export class FormMp3Page implements OnInit {
  docType:any;
  doSubmit
  uploadForm:FormGroup
  @ViewChild('form', {read:ViewContainerRef}) form;

  constructor(public backendService:BackendServiceService,
              private mpService: MercadoPagoService,
              private formBuilder: FormBuilder) {
    console.log(Mercadopago)
    //console.log(form)
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
    this.uploadForm = this.formBuilder.group({
      transaction_amount:[''],
      description: [''],
      installments:[''],
      payment_method_id:[''],
      token:[''],
      email:['']
    });
  }

  pagar(){
    console.log(this.uploadForm)
    var doSubmit = false;
    let pay = document.querySelector('#pay')
    if(pay){

        pay.addEventListener('submit', doPay);
    }
    console.log(this.uploadForm)
    console.log(this.form)
    Mercadopago.createToken((this.form), (status, resp)=>{
      console.log(status, resp)
      var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', resp.id);
        form.appendChild(card);
        doSubmit=true;
        console.log(form)
        //console.log(form.token.value)
        this.backendService.submitForm(form).subscribe((resp) =>{
          console.log(resp)
        })
    })
    function doPay(event){
    event.preventDefault();
    // console.log(data-checkout)
      if(!doSubmit){
        var $form = document.querySelector('#pay');
        
        //console.log($form)
        //Mercadopago.createToken($form, sdkResponseHandler)
        //console.log(formulario)
        //sdkResponseHandler()
        return false;
      }
    };

    // function sdkResponseHandler(status, response) {
    //   if (status != 200 && status != 201) {
    //       console.log(status, response)
    //       alert("verify filled data");
    //   }else{
    //       console.log(status, response)

    //       var form = document.querySelector('#pay');
    //       var card = document.createElement('input');
    //       card.setAttribute('name', 'token');
    //       card.setAttribute('type', 'hidden');
    //       card.setAttribute('value', response.id);
    //       form.appendChild(card);
    //       doSubmit=true;
    //       console.log(form)
    //       console.log(form.token.value)
    //       this.backendService.submitForm(form)
    //       // console.log(form.transaction_amount.value)
    //       // console.log(form.installments.value)
    //       // console.log(form.docNumber)
    //       // console.log(form.email.value)
    //       // console.log(form.token.value)
    //       // console.log(form)
    //       // console.log(form.docType.value)
    //       //formulario = form
    //       //console.log(formulario)
    //       //console.log(backendService)
    //       //return form
    //       //form.submit();
    //       // //backendService.submitForm(form)
          
    //       // this.form = form
    //       // //console.log(this.form)
    //        return this.form
    //   }
    // };    
    //console.log(this.form)
    //this.backendService.submitForm(this.form)
  }
}
