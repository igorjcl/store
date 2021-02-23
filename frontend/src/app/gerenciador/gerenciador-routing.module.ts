import { AdicionarComponent } from './produtos/adicionar/adicionar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciadorComponent } from './gerenciador.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
  {
    path: '',
    component: GerenciadorComponent,
    children: [
      {
        path: '',
        redirectTo: '/produtos',
        pathMatch: 'full',
      },
      {
        path: 'produtos',
        component: ProdutosComponent,
      },
      {
        path: 'produtos/:id',
        component: AdicionarComponent,
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
