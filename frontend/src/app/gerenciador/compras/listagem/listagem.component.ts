import { Compra } from './../../../core/model/Compra';
import { ApiResponse } from './../../../core/model/ApiResponse';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from 'src/app/core/model/Produto';
import { ComprasService } from 'src/app/core/services/compras.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  private subscription$!: Subscription;
  public isCollapsed = false;
  public compras: Compra[] = [];

  constructor(private cs: ComprasService) {}

  ngOnInit(): void {
    this.subscription$ = this.cs
      .obterVendas()
      .subscribe(({ data }: ApiResponse<Compra[]>) => {
        this.compras = data;
      });
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
