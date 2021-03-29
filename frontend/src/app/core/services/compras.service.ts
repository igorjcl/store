import { Compra } from './../model/Compra';
import { ApiResponse } from './../model/ApiResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Produto } from '../model/Produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private readonly API = `${environment.api}/compras`;

  constructor(private http: HttpClient) {}

  cadastrarVenda(compra: Compra): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.API, compra);
  }

  obterVendas(): Observable<ApiResponse<Compra[]>> {
    return this.http.get<ApiResponse<Compra[]>>(this.API);
  }

  filtrar(nome?: string, data?: string): Observable<ApiResponse<Compra[]>> {
    const params = new HttpParams()
      .set('nome', `${nome}`)
      .set('data', `${data}`);
    return this.http.get<ApiResponse<Compra[]>>(this.API, { params });
  }
}
