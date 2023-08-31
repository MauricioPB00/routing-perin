import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../base-url';

@Injectable({
    providedIn: 'root'
  })
  export class CondiService {
    private baseUrl = BASE_URL;
  
    constructor(private http: HttpClient) { }
  
      getDadosDoCondi(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/condi`);
      }
  }
