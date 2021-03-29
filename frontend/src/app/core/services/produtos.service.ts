import { ApiResponse } from './../model/ApiResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Produto } from '../model/Produto';
import { Observable } from 'rxjs';
import { Compra } from '../model/Compra';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private readonly API = `${environment.api}/produtos`;

  constructor(private http: HttpClient) {}

  obterProdutos(): Observable<ApiResponse<Produto[]>> {
    return this.http.get<ApiResponse<Produto[]>>(this.API);
  }

  obterProduto(id: number): Observable<ApiResponse<Produto>> {
    return this.http.get<ApiResponse<Produto>>(`${this.API}/${id}`);
  }

  adicionarProduto(id: number, compra: Compra): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.API}/${id}`, compra);
  }
}
