import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadersDataService {

constructor() { }


GetHttpHeaders(): HttpHeaders {
    
  const headers = new HttpHeaders().set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*',)
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT',)  
    ;
  return headers;
}

}
