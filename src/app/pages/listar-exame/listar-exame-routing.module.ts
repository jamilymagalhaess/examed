import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarExameComponent } from './listar-exame.component';

const routes: Routes = [{ path: '', component: ListarExameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarExameRoutingModule {}
