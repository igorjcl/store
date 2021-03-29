import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  total = 0;

  form = this.fb.group({
    nome: this.fb.control(''),
    data: this.fb.control(''),
  });

  constructor(
    private vs: VendasService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.obterVendas();
  }

  obterVendas() {
    this.subscription$ = this.vs.obterVendas().subscribe(
      ({ data }: ApiResponse<Venda[]>) => {
        this.vendas = data;
        this.setTotal();
      },
      (err) => {
        console.error(err);
        this.toastr.error('Houve algum error, tente novamente.');
      }
    );
  }

  setTotal() {
    this.vendas.map((venda: Venda) => {
      this.total += +venda.valor;
    });
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  filtrar() {
    const nome = (<FormControl>this.form.get('nome')).value;
    const data = (<FormControl>this.form.get('data')).value;
    this.vs.filtrar(nome, data).subscribe(({ data }: ApiResponse<Venda[]>) => {
      this.vendas = data;
    });
  }

  limpar() {
    this.form.reset();
    this.form.get('nome')?.setValue('');
    this.form.get('data')?.setValue('');
    this.obterVendas();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
