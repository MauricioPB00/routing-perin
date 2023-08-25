import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  getDadosDoSearch(searchId: string): Observable<any[]> {
    console.log("aa");
    console.log(searchId);
    return this.http.get<any[]>(`${this.baseUrl}/search/${searchId}`);
  }
}
