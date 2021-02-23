import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/core/model/ApiResponse';
import { Venda } from 'src/app/core/model/Venda';
import { VendasService } from 'src/app/core/services/vendas.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit, OnDestroy {
  private subscription$!: Subscription;
  public isCollapsed = false;
  public vendas!: Venda[];

  constructor(private vs: VendasService) {}

  ngOnInit(): void {
    this.subscription$ = this.vs
      .obterVendas()
      .subscribe(({ data }: ApiResponse<Venda[]>) => {
        this.vendas = data;
      });
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
