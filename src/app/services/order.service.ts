import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.apiUrl;
  
  constructor(private httpClient : HttpClient) { }

  generateReport(data:any){
    return this.httpClient.post(this.url+
      "/order/generate", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  
  getPdf(data:any): Observable<Blob>{
    return this.httpClient.post(this.url+
      "/order/getPdf", data, {responseType:'blob'})
    } 
  
  getOrders(){
    return this.httpClient.get(this.url+ "/order/getOrders")
  }

  delete(id:any){
    return this.httpClient.post(this.url+
      "/order/delete/"+id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  

}
