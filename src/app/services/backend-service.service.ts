import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var Mercadopago:any;
declare var doPay:any;
declare var formulario:any;

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(public http: HttpClient) { }

  submitForm(form){
    console.log(form)
    doPay(form)
    let data = formulario
    console.log(data)
    let json = JSON.stringify(formulario)
    let params = 'json='+json
    console.log(params)
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post('http://localhost:8000', params, {headers:headers} )
  }
}

