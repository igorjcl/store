import { ProdutosRoutingModule } from './produtos-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { ListagemComponent } from './listagem/listagem.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [ProdutosComponent, AdicionarComponent, ListagemComponent],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxMaskModule,
    SharedModule,
    NgxCurrencyModule
  ],
  providers: [{
    provide: LOCALE_ID, 
    useValue: "pt-BR"
  }],
  bootstrap: [ProdutosComponent],
})
export class ProdutosModule {}
