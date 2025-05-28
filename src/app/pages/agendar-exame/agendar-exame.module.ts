import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AgendarExameComponent } from './agendar-exame.component';
import { AgendarExameRoutingModule } from './agendar-exame-routing.module';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  imports: [
    AgendarExameRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  declarations: [AgendarExameComponent],
  exports: [AgendarExameComponent],
})
export class AgendarExameModule {}
