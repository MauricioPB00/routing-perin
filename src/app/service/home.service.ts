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
  excluirRegistros(idsParaExcluir: number[]): Observable<any[]> {
    console.log('chego no service');
    const endpoint = `${this.baseUrl}/store/delete`;
  
    return this.http.delete<any[]>(endpoint, { body: { ids: idsParaExcluir } });
  }
  enviarDados(prices: number[], data: string, opcao: number, numeroParcelas: string): Observable<any> {
    const endpoint = `${this.baseUrl}/store/save`; 

    const body = {
      prices: prices,
      data: data,
      opcao: opcao,
      payment_option: numeroParcelas,
    };
    console.log('body: ',body)

    return this.http.post<any>(endpoint, body);
  }


  enviarDadosCartao(prices: number[], data: string, opcao: number, numeroParcelass: string): Observable<any> {
    const endpoint = `${this.baseUrl}/store/saveCard`; 

    const body = {
      prices: prices,
      data: data,
      opcao: opcao,
      payment_option: numeroParcelass
    };
    console.log('body: ',body)

    return this.http.post<any>(endpoint, body);
  }

  enviarDadosCondi(prices: number[],data: string, condiInput: string, ids: number[], size: string[ ] ){
    const endpoint = `${this.baseUrl}/condi/saveCondi`; 

    const body = {
      prices: prices,
      data: data,
      condiInput: condiInput,
      ids: ids,
      size: size,
    };
    console.log('body: ',body)
    return this.http.post<any>(endpoint, body);
  }
}
