import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './components/aside/aside.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AsideComponent, FormatCurrencyPipe],
  imports: [
    CommonModule,
    RouterModule
  ], exports: [AsideComponent, FormatCurrencyPipe]
})
export class SharedModule { }
