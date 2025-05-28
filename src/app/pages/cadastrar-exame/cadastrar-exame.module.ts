import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CadastrarExameRoutingModule } from './cadastrar-exame-routing.module';
import { CadastrarExameComponent } from './cadastrar-exame.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CadastrarExameComponent],
  imports: [
    CommonModule,
    CadastrarExameRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CadastrarExameModule {}
