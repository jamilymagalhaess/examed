import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarExameComponent } from './agendar-exame.component';

const routes: Routes = [{ path: '', component: AgendarExameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarExameRoutingModule {}
