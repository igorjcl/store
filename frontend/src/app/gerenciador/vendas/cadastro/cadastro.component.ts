import { ApiResponse } from './../../../core/model/ApiResponse';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { Produto } from 'src/app/core/model/Produto';
import { VendasService } from 'src/app/core/services/vendas.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutosService } from 'src/app/core/services/produtos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit, OnDestroy {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  private subsctiption$!: Subscription;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  produtos!: Produto[];

  produto!: Produto;

  form = this.fb.group({
    produto: this.fb.control(null, Validators.required),
    quantidade: this.fb.control('', Validators.required),
    valor: this.fb.control('', Validators.required),
    anotacao: this.fb.control(''),
    data: this.fb.control('', Validators.required),
  });

  constructor(
    private vs: VendasService,
    private ps: ProdutosService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subsctiption$ = this.ps
      .obterProdutos()
      .pipe(
        map(({ data }: ApiResponse<Produto[]>) =>
          data.filter((it: Produto) => it.estoque > 0)
        )
      )
      .subscribe((produtos: Produto[]) => {
        this.produtos = produtos;
      });
  }

  onSubmit() {
    this.vs.vender(this.form.value).subscribe(
      ({ message }: ApiResponse<any>) => {
        this.toastr.success(message);
        this.router.navigateByUrl('vendas/listagem');
      },
      (err) => {
        console.error(err);
        this.toastr.error('Houve algum error, tente novamente.');
      }
    );
  }

  formatter = (produto: Produto) => produto.nome;

  pesquisar = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.produtos
          : this.produtos.filter(
              (p: Produto) =>
                p.nome.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  selectedItem(item: any) {
    this.produto = item.item;
  }

  ngOnDestroy(): void {
    this.subsctiption$.unsubscribe();
  }
}
