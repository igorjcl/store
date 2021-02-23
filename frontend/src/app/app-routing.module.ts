import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./gerenciador/gerenciador.module').then(
        (m) => m.GerenciadorModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./gerenciador/gerenciador.module').then(
        (m) => m.GerenciadorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
