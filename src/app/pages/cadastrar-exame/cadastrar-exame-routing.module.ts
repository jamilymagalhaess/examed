import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarExameComponent } from './cadastrar-exame.component';

const routes: Routes = [{ path: '', component: CadastrarExameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarExameRoutingModule {}
