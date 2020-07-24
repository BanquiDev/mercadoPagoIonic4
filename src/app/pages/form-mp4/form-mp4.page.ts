import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { BackendServiceService } from '../../services/backend-service.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';

declare var Mercadopago:any;

@Component({
  selector: 'app-form-mp4',
  templateUrl: './form-mp4.page.html',
  styleUrls: ['./form-mp4.page.scss'],
})
export class FormMp4Page implements OnInit {
  docType:string;
  isLoading: boolean;
  mpForm:NgForm
  payment_method_id:string;
  thumbnail:string;
  formData = { 
    description: '', 
    transaction_amount: '',
    installments:'',
    email:'',
    payment_method_id:'',
    identification: {
      type:'',
      number:''
    },
    token:'',  }
    cardForm:FormGroup 
    cardNumber = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(15)])
    constructor(private backendService:BackendServiceService,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private mpService:MercadoPagoService,
    private fb:FormBuilder) {
     
      //this.mpService.getIdentificationTypes() 
      Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158')
      Mercadopago.getIdentificationTypes((status, response)=>{
        if (status !== 200){
          this.presentAlert('Hubo un Problema. Actualice la página')
        }else{ 
          this.docType = response
        }
      })

      this.fb.group({
         "cardNumber":["", [Validators.required, Validators.maxLength(18)]],
        "cardHolderName":["", [Validators.required]]
      })
     }

  ngOnInit() {

    console.log(this.cardForm)
  }
  card(event){
  
    //console.log(event.target.value)
    let cardNumber = event.target.value
    this.mpService.getPaymentsMethods(cardNumber)
    // guessPaymentMethod(cardNumber)

      let cardnumber = cardNumber;
    //  console.log(cardNumber)
      if (cardnumber.length >= 6 && cardnumber.length < 7) {
          let bin = cardnumber.substring(0,6);
          Mercadopago.getPaymentMethod({
              
              "bin": bin
          }, (status, response)=>{
            if (status == 200) {
              console.log(status, response)
              this.payment_method_id = response[0].id;
              this.thumbnail = response[0].thumbnail
              console.log(this.thumbnail)
              let thumbnail = document.createElement('img')
              thumbnail.src = this.thumbnail
              console.log(thumbnail)
               document.getElementById('cardNumber').appendChild(thumbnail)

              Mercadopago.getInstallments({
                "payment_method_id": this.payment_method_id,
                "amount": parseFloat(this.formData.transaction_amount)
                
              }, function (status, response) {
                if (status == 200) {
                   // <HTMLOptionElement>document.getElementById('installments').options.length = 0;
                    console.log(response[0].payer_costs)
                    response[0].payer_costs.forEach( installment => {
                        let opt = document.createElement('ion-select-option');
                        opt.innerText = installment.recommended_message;
                        opt.value = installment.installments;
                        document.getElementById('installments').appendChild(opt);
                    });
                } else {
                  console.log(status, response)
                    
                  alert('Hubo un Error. Reingrese el numero de Tarjeta');
                }
             });
            }else{
              console.log(status, response)
              this.presentAlert('El numero de Tarjeta no es válido. Por favor ingreselo nuevamente')
            }
          });
      }
  }

  pagar(){
    
    let pay = document.querySelector('#pay')
    if(pay){
        this.present()
        var $form = document.querySelector('#pay');

        Mercadopago.createToken(($form), (status, resp)=>{
          console.log(status, resp)
          if(status == 400){
            
            alert('Los datos de tu tarjeta no son validos. Por favor ingresalos nuevamente')
            return
          }
          var form:HTMLFormElement = document.querySelector('#pay');
          
          this.formData.token = resp.id
          this.formData.identification.type = resp.cardholder.identification.type
          this.formData.identification.number = resp.cardholder.identification.number
          this.formData.installments = form.installments.value
          this.formData.payment_method_id = this.payment_method_id
          console.log(this.formData)
          
            
          
            
            this.backendService.submitForm(this.formData).subscribe((response)=>{
              console.log(response)
              if(response){
                
                this.dismiss()
                
                if(response.status == 'approved'){ 
                  this.presentAlert('El pago ha sido aprobado')
                  this.mpForm.reset()
                }
                else if(response.status == 'in_process')
                { this.presentAlert('Estamos procesando tu pago. No te preocupes, en menos de 2 días hábiles te avisaremos por e-mail si se acreditó.')
                this.mpForm.reset()
                }
                else{
                  this.presentAlert('No pudimos procesar tu pago.')
                  this.mpForm.reset()
                }
              }
            }, (error)=>{
              console.log(error)
              this.presentAlert('Error de conexion con MercadoPago.')
            })                                     
        }, (error)=>{
          console.log(error)
          this.presentAlert('La tarjeta de credito es no es válida. Ingresa tus datos Nuevamente')
        })
    }
    console.log(this.mpForm)
   this.mpForm.reset()

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
