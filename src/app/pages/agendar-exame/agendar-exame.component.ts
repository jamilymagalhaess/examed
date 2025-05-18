import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
//import { ExameService } from '../services/exame.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-agendar-exame',
  templateUrl: './agendar-exame.component.html',
  styleUrls: ['./agendar-exame.component.scss'],
  standalone: false,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AgendarExameComponent implements OnInit {
  agendamentoForm: FormGroup;
  tiposExame: string[] = [
    'Hemograma Completo',
    'Glicemia em Jejum',
    'Colesterol Total',
    'Urina Tipo 1',
    'Eletrocardiograma',
    'Ultrassonografia Abdominal',
  ];

  constructor(
    private fb: FormBuilder,
    // private exameService: ExameService,
    private snackBar: MatSnackBar
  ) {
    this.agendamentoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoExame: ['', Validators.required],
      instrucoes: [''],
      cpf: ['', Validators.required],
      cartaoSus: ['', Validators.required],
      dataExame: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.agendamentoForm.valid) {
      const formData = this.agendamentoForm.value;

      // this.exameService.agendarExame(formData).subscribe({
      //   next: () => {
      //     this.snackBar.open('Exame agendado com sucesso!', 'Fechar', {
      //       duration: 5000,
      //       panelClass: ['success-snackbar']
      //     });
      //     this.agendamentoForm.reset();
      //   },
      //   error: (err) => {
      //     console.error('Erro ao agendar exame:', err);
      //     this.snackBar.open('Erro ao agendar exame. Tente novamente.', 'Fechar', {
      //       duration: 5000,
      //       panelClass: ['error-snackbar']
      //     });
      //   }
      // });
    }
  }
}
