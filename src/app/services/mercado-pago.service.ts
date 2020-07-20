import { Injectable } from '@angular/core';

declare var Mercadopago:any;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor() { }
  crearToken(){

    //Mercadopago.createToken(form)
  }
}
