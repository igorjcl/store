import { ApiResponse } from './../model/ApiResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venda } from '../model/Venda';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  private readonly API = `${environment.api}/vendas`;

  constructor(private http: HttpClient) {}

  vender(venda: Venda): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.API, venda);
  }

  obterVendas(): Observable<ApiResponse<Venda[]>> {
    return this.http.get<ApiResponse<Venda[]>>(this.API);
  }

  filtrar(nome?: string, data?: string): Observable<ApiResponse<Venda[]>> {
    const params = new HttpParams()
      .set('nome', `${nome}`)
      .set('data', `${data}`);
    return this.http.get<ApiResponse<Venda[]>>(this.API, { params });
  }
}
