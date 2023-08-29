import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class InvoicingService {
  private baseUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  getDadosDaVenda(): Observable<any[]> {
    console.log("aa");
    return this.http.get<any[]>(`${this.baseUrl}/invoicing/`);
  }
}
