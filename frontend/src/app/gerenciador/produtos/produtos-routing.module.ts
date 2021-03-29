import { AdicionarComponent } from './adicionar/adicionar.component';
import { ProdutosComponent } from './produtos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    children: [
      {
        path: 'listagem',
        component: ListagemComponent,
      },
      {
        path: 'adicionar/:id',
        component: AdicionarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
