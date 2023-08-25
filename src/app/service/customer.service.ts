import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../base-url';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerService {
    private baseUrl = BASE_URL;
  
    constructor(private http: HttpClient) { }
  
    enviarDadosClientePHP(dados: any): Observable<any> {
        const url = `${this.baseUrl}/customer`; 
        console.log('aaaaa');
        console.log(dados);
        return this.http.post(url, dados);
      }
  }