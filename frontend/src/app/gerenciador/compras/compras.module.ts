import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasRoutingModule } from './compras-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { ComprasComponent } from './compras.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CadastroComponent, ListagemComponent, ComprasComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    SharedModule,
    NgxMaskModule,
  ],
  bootstrap: [ComprasComponent],
})
export class ComprasModule {}
