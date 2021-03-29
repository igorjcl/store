import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciadorComponent } from './gerenciador.component';

const routes: Routes = [
  {
    path: '',
    component: GerenciadorComponent,
    children: [
      {
        path: '',
        redirectTo: '/produtos/listagem',
        pathMatch: 'full',
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./produtos/produtos.module').then((m) => m.ProdutosModule),
      },
      {
        path: 'compras',
        loadChildren: () =>
          import('./compras/compras.module').then((m) => m.ComprasModule),
      },
      {
        path: 'vendas',
        loadChildren: () =>
          import('./vendas/vendas.module').then((m) => m.VendasModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciadorRoutingModule {}
