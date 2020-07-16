import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(public http: HttpClient) { }

  submitForm(form){
    console.log(form)
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post('http://localhost:8000', form, {headers:headers} )
  }
}

