import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasRoutingModule } from './compras-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { ComprasComponent } from './compras.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CadastroComponent, ListagemComponent, ComprasComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [ComprasComponent],
})
export class ComprasModule {}
