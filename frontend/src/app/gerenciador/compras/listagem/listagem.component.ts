import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Compra } from './../../../core/model/Compra';
import { ApiResponse } from './../../../core/model/ApiResponse';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComprasService } from 'src/app/core/services/compras.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  private subscription$!: Subscription;
  public isCollapsed = false;
  public compras: Compra[] = [];
  total = 0;

  form = this.fb.group({
    nome: this.fb.control(''),
    data: this.fb.control(''),
  });

  constructor(private cs: ComprasService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obterCompras();
  }

  obterCompras() {
    this.subscription$ = this.cs
      .obterVendas()
      .pipe(map(({ data }: ApiResponse<Compra[]>) => data))
      .subscribe((compras: Compra[]) => {
        this.compras = compras;

        this.setTotal();
      });
  }

  setTotal() {
    this.compras.map((compra: Compra) => {
      this.total += +compra.valor;
    });
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  filtrar() {
    const nome = (<FormControl>this.form.get('nome')).value;
    const data = (<FormControl>this.form.get('data')).value;
    this.cs.filtrar(nome, data).subscribe(({ data }: ApiResponse<Compra[]>) => {
      this.compras = data;
    });
  }

  limpar() {
    this.form.reset();
    this.form.get('nome')?.setValue('');
    this.form.get('data')?.setValue('');
    this.obterCompras();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
