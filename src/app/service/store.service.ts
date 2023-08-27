import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../base-url'; 

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = BASE_URL; 

  constructor(private http: HttpClient) { }

  getDadosDoStore(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/store`);
  }

  enviarDadosParaPHP(dados: any): Observable<any> {
    const url = `${this.baseUrl}/store`;
    console.log('aaaaa');
    console.log(dados);
    return this.http.post(url, dados);
  }
}
