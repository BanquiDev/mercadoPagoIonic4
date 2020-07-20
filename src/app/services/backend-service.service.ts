import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  formArray
  constructor(public http: HttpClient) {
    
   }

  submitForm(form):Observable<any>{
   
   let json = JSON.stringify(form)
   let params = 'json='+json
  // console.log(hardForm)
      console.log(params)
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    //console.log(parseFloat(form.token.value))
    return this.http.post('http://localhost:8000', params, {headers:headers})
                          
  }
}

