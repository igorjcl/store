import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/core/model/Produto';
import { ProdutosService } from 'src/app/core/services/produtos.service';
import { ApiResponse } from '../../../../../../backend/src/entities/ApiResponse';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
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
