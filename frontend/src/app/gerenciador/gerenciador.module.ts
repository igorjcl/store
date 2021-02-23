import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciadorComponent } from './gerenciador.component';
import { GerenciadorRoutingModule } from './gerenciador-routing.module';
import { AsideComponent } from './components/aside/aside.component';
import { ProdutosComponent } from './produtos/produtos.component';

@NgModule({
  declarations: [GerenciadorComponent, AsideComponent, ProdutosComponent],
  imports: [CommonModule, GerenciadorRoutingModule],
  bootstrap: [GerenciadorComponent],
})
export class GerenciadorModule {}
