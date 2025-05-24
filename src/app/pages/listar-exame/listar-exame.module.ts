import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ListarExameRoutingModule } from './listar-exame-routing.module';
import { ListarExameComponent } from './listar-exame.component';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [ListarExameComponent],
  imports: [
    CommonModule,
    ListarExameRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class ListarExameModule {}
