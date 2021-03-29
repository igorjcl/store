import { ProdutosModule } from './produtos/produtos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciadorComponent } from './gerenciador.component';
import { GerenciadorRoutingModule } from './gerenciador-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GerenciadorComponent],
  imports: [CommonModule, GerenciadorRoutingModule, ProdutosModule, SharedModule],
  bootstrap: [GerenciadorComponent],
})
export class GerenciadorModule {}
