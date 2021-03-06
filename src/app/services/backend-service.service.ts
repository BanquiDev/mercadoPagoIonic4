import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(public http: HttpClient) { 
   }

  submitForm(form): Observable<any>{
   
    const json = JSON.stringify(form);
    const params = 'json=' + json;
      //console.log(form)
      //console.log(params)
    const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    //console.log(parseFloat(form.token.value))
    return this.http.post('http://localhost:8000', params, {headers:headers, observe: 'body', responseType: 'json'});
  }
}

