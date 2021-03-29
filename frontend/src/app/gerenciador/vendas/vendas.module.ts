import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasRoutingModule } from './vendas-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { VendasComponent } from './vendas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VendasComponent, CadastroComponent, ListagemComponent],
  imports: [
    CommonModule,
    VendasRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  bootstrap: [VendasComponent],
})
export class VendasModule {}
