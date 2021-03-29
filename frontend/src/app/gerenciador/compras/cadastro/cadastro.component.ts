import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../core/model/ApiResponse';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComprasService } from 'src/app/core/services/compras.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  @ViewChild('valor') valor!: ElementRef;

  form = this.fb.group({
    produto: this.fb.group({
      nome: this.fb.control('', Validators.required),
      descricao: this.fb.control(''),
      preco: this.fb.control('', Validators.required),
      estoque: this.fb.control(1, Validators.required),
    }),
    anotacao: this.fb.control('', Validators.required),
    valor: this.fb.control({ value: 0, disabled: true }),
    data: this.fb.control('', Validators.required),
    quantidade: this.fb.control(1),
  });

  constructor(
    private cs: ComprasService,
    private fb: FormBuilder,
    private ar: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  limparFormulario() {
    this.form.reset();
  }

  onSubmit() {
    this.setarQuantidadeDeProdutoNaVenda();
    this.setarValorTotal();
    this.cs.cadastrarVenda(this.form.value).subscribe(
      ({ message }: ApiResponse<any>) => {
        this.ar.navigateByUrl('compras/listagem');
        this.toastr.success(message);
      },
      (err) => {
        console.error(err);
        this.toastr.error('Houve algum error, tente novamente.');
      },
      () => this.limparFormulario()
    );
  }

  setarValorTotal() {
    const valor = this.valor.nativeElement.value;

    this.form.get('valor')?.enable();
    this.form.get('valor')?.setValue(valor);
  }

  setarQuantidadeDeProdutoNaVenda() {
    const quantidade = (<FormGroup>this.form.get('produto')).get('estoque')
      ?.value;
    this.form.get('quantidade')?.setValue(quantidade);
  }
}
