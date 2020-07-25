import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { BackendServiceService } from '../../services/backend-service.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';

declare var Mercadopago: any;

@Component({
  selector: 'app-form-mp4',
  templateUrl: './form-mp4.page.html',
  styleUrls: ['./form-mp4.page.scss'],
})
export class FormMp4Page implements OnInit, OnDestroy {
  docType: string;
  isLoading: boolean;
  mpForm: NgForm;
  payment_method_id: string;
  thumbnail: string;
  formData = {
    description: '',
    transaction_amount: '',
    installments: '',
    email: '',
    payment_method_id: '',
    identification: {
      type: '',
      number: ''
    },
    token: ''
  };
    cardForm: FormGroup;
    cardNumber = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(15)]);
    constructor(private backendService: BackendServiceService,
                public alertCtrl: AlertController,
                public loadingController: LoadingController,
                private mpService: MercadoPagoService,
                private fb: FormBuilder) {
                /*this.mpService.getIdentificationTypes()*/

                Mercadopago.setPublishableKey('TEST-a3935daa-4d33-4f19-8f2b-62e117cc4158');
                this.tiposDeDocumentos();

                this.fb.group({
                  cardNumber: ['', [Validators.required, Validators.maxLength(18)]],
                  cardHolderName: ['', [Validators.required]]
                });
              }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {

    console.log(this.mpForm);
  }

  card(event){
   
    const cardNumber = event.target.value;
    this.mpService.getPaymentsMethods(cardNumber);
    
    if (cardNumber.length >= 6 && cardNumber.length < 7) {
          let bin = cardNumber.substring(0,6);
          
          Mercadopago.getPaymentMethod({
          'bin': bin
          }, (status, response) => {
            if (status === 200) {
              console.log(status, response);
              this.payment_method_id = response[0].id;
              this.thumbnail = response[0].thumbnail;
              console.log(this.thumbnail);
              const thumbnail = document.createElement('img');
              thumbnail.src = this.thumbnail;
              thumbnail.setAttribute('id', 'logoTarjeta')
              console.log(thumbnail);
              document.getElementById('cardNumber').appendChild(thumbnail);

              Mercadopago.getInstallments({
              "payment_method_id": this.payment_method_id,
              "amount": parseFloat(this.formData.transaction_amount)
              },  (status: any, response: any) => {
                if (status === 200) {
                   // <HTMLOptionElement>document.getElementById('installments').options.length = 0;
                    console.log(response[0].payer_costs);
                    response[0].payer_costs.forEach( installment => {
                        const opt: HTMLIonSelectOptionElement = document.createElement('ion-select-option');
                        opt.innerText = installment.recommended_message;
                        opt.value = installment.installments;
                        document.getElementById('installments').appendChild(opt);
                    });
                } else {
                  console.log(status, response);
                  this.presentAlert('Hubo un Error. Reingrese el numero de Tarjeta');
                }
             });
            }else{
              console.log(status, response);
              
              this.presentAlert('El numero de Tarjeta no es válido. Por favor ingreselo nuevamente');
            }
          });
      }
  }

  pagar(){
    
    const pay = document.querySelector('#pay');
    if (pay){
        this.present();
        const $form = document.querySelector('#pay');

        Mercadopago.createToken(($form), (status, resp) => {
          
          const form: HTMLFormElement = document.querySelector('#pay');
          console.log(status, resp);
          if(status === 400){
            console.log(resp.message);
            console.log(resp.cause[0].description)
            this.dismiss();
            this.presentAlert('Los datos de tu tarjeta no son validos. Por favor ingresalos nuevamente');
            form.reset();
            document.getElementById('logoTarjeta').remove();
            this.tiposDeDocumentos();
            return;
          }
          
          this.formData.token = resp.id;
          this.formData.identification.type = resp.cardholder.identification.type;
          this.formData.identification.number = resp.cardholder.identification.number;
          this.formData.installments = form.installments.value;
          this.formData.payment_method_id = this.payment_method_id;
          console.log(this.formData);
          
          this.backendService.submitForm(this.formData).subscribe((response) => {
              console.log(response);
              if (response) {
                if (response.status === 'approved'){
                  this.presentAlert(`¡Listo! Se acreditó tu pago. En tu resumen verás el cargo de $ ${this.formData.transaction_amount}`);
                  this.dismiss();
                  this.mpForm.reset();
                  form.reset();
                  document.getElementById('logoTarjeta').remove();
                }
                else if (response.status === 'in_process'){
                  if(response.status_detail === 'pending_contingency'){
                    this.presentAlert('Estamos procesando tu pago. No te preocupes, en menos de 2 días hábiles te avisaremos por e-mail si se acreditó.');
                    this.dismiss();
                    form.reset();
                    document.getElementById('logoTarjeta').remove();
                  }else{
                    this.presentAlert('No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó o si necesitamos más información.');
                    this.dismiss();
                    form.reset();
                    document.getElementById('logoTarjeta').remove();
                  }
                }
                else{
                  switch(response.status_detail){
                    case 'cc_rejected_call_for_authorize':
                      this.presentAlert(`Debes autorizar ante ${this.formData.payment_method_id} el pago de amount.`);
                      this.dismiss();
                      form.reset();
                      document.getElementById('logoTarjeta').remove();
                      break;
                    case 'cc_rejected_insufficient_amount':
                      this.presentAlert(`Tu Tarjeta ${this.formData.payment_method_id} no tiene fondos suficientes`);
                      this.dismiss();
                      form.reset();
                      document.getElementById('logoTarjeta').remove();
                      break;
                    case 'cc_rejected_duplicated_payment':
                      this.presentAlert(`Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.`);
                      this.dismiss();
                      form.reset();
                      document.getElementById('logoTarjeta').remove();
                      break;
                    default:
                    this.presentAlert('No pudimos procesar tu pago.');
                    this.dismiss();
                    form.reset();
                    document.getElementById('logoTarjeta').remove();
                    break;  
                  }
                }
              }
            }, (error) => {
              console.log(error);
              this.dismiss();
              this.presentAlert('Error de conexion con MercadoPago.');
              form.reset();
              document.getElementById('logoTarjeta').remove();
            });
        });
    }
  }

  async presentAlert(message: string) {
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

  tiposDeDocumentos(){
    Mercadopago.getIdentificationTypes((status, response) => {
      if (status !== 200){
        this.presentAlert('Hubo un Problema. Actualice la página');
      }else{
        this.docType = response;
      }
    });
  }
}
