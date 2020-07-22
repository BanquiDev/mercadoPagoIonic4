import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import {  Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';


declare var Mercadopago: any;

@Component({
  selector: 'app-form-mp2',
  templateUrl: './form-mp2.page.html',
  styleUrls: ['./form-mp2.page.scss'],
})
export class FormMp2Page implements OnInit {
  docType:any;
  isLoading: boolean;
  mpForm:FormGroup;

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
 
  
  
  

  constructor(private backendService:BackendServiceService,
              public alertCtrl: AlertController,
              public loadingController: LoadingController,
              private fb:FormBuilder) {
  
    Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
    Mercadopago.getIdentificationTypes()
    
    //this.createForm()
   }

  ngOnInit() {

  }

  // createForm(){
  //     this.mpForm = this.fb.group({
  //       description: ['', Validators.required],
  //       transaction_amount:[ '', Validators.required],
  //       cardNumber: ['', Validators.required],
  //       cardholderName: ['', Validators.required],
  //       cardExpirationMonth:['',[Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  //       cardExpirationYear:['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  //       securityCode:['', [Validators.required, Validators.maxLength(4)]],
  //       docNumber:['', [Validators.required, Validators.maxLength(8)]],
  //       email:['', [Validators.required, Validators.email]]
  //     })
  // }

  pagar(event){
    var doSubmit = false;
    let pay = document.querySelector('#pay')
    if(pay){
        this.present()
        var $form = document.querySelector('#pay');

        Mercadopago.createToken(($form), (status, resp)=>{
          console.log(status, resp)
          if(status == 400){alert('Los datos de tu tarjeta no son validos. Por favor ingresalos nuevamente')}
            var form:HTMLFormElement = document.querySelector('#pay');

           
            
            
            this.formData.token = resp.id
            this.formData.identification.type = resp.cardholder.identification.type
            this.formData.identification.number = resp.cardholder.identification.number
            this.formData.installments = form.installments.value
            //console.log(this.formData)
            
            this.backendService.submitForm(this.formData).subscribe((response)=>{
              console.log(response)
              if(response){
                
                this.dismiss()
                
                if(response == 'approved'){ this.presentAlert('El pago ha sido aprobado')}
                else if(response == 'in_process'){ this.presentAlert('Estamos procesando tu pago. No te preocupes, en menos de 2 días hábiles te avisaremos por e-mail si se acreditó.')}
                else{
                  this.presentAlert('No pudimos procesar tu pago.')
                }
              }
            }, (error)=>{
              //console.log(error)
              this.presentAlert('Error de conexion con MercadoPago.')
            })                                     
        }, (error)=>{
          this.presentAlert('La tarjeta de credito es no es válida. Ingresa tus datos Nuevamente')
        })
    }
    
  }

  async presentAlert(message:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Info de Pago',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
      message:'Estamos procesando tu pago...'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}
