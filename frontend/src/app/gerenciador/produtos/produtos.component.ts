import { ApiResponse } from './../../core/model/ApiResponse';
import { ProdutosService } from './../../core/services/produtos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/core/model/Produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;

  produtos: Produto[] = [];

  constructor(private ps: ProdutosService) {}

  ngOnInit(): void {
    this.subscription$ = this.ps
      .obterProdutos()
      .subscribe(({ data }: ApiResponse<Produto[]>) => {
        this.produtos = data;
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
