import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiResponse } from './../../../../../../backend/src/entities/ApiResponse';
import { ProdutosService } from './../../../core/services/produtos.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Produto } from 'src/app/core/model/Produto';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss'],
})
export class AdicionarComponent implements OnInit {
  @ViewChild('valor') valor!: ElementRef;

  produto!: Produto;
  form: FormGroup;

  constructor(
    private ps: ProdutosService,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      produto: this.fb.group({
        nome: this.fb.control('', Validators.required),
        descricao: this.fb.control(''),
        preco: this.fb.control(
          { value: 0, disabled: true },
          Validators.required
        ),
        estoque: this.fb.control(0, Validators.required),
      }),
      anotacao: this.fb.control('', Validators.required),
      valor: this.fb.control({ value: 0, disabled: true }),
      data: this.fb.control('', Validators.required),
      quantidade: this.fb.control(1),
    });
  }

  ngOnInit(): void {
    this.ar.params
      .pipe(switchMap((params: Params) => this.ps.obterProduto(params['id'])))
      .subscribe(({ data }: ApiResponse<Produto>) => {
        this.produto = data;
        this.setForm();
      });
  }

  setForm(): void {
    this.form.patchValue({
      produto: {
        nome: this.produto.nome,
        preco: this.produto.preco,
        descricao: this.produto.descricao,
      },
    });
  }

  setarValorTotal() {
    const valor = this.valor.nativeElement.value;

    this.form.get('valor')?.enable();
    this.form.get('valor')?.setValue(valor);
  }

  onSubmit() {
    this.setarValorTotal();
    this.ps.adicionarProduto(this.produto.id, this.form.value).subscribe(
      ({ message }: ApiResponse<any>) => {
        this.toastr.success(message);
        this.router.navigateByUrl('produtos/listagem');
      },
      (err) => {
        console.error(err);
        this.toastr.error('Houve algum error, tente novamente.');
      }
    );
  }
}
