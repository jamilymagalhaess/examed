import { Component, OnInit} from '@angular/core';
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
import { ExameService } from '../../services/exame.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamento, Exame } from '../../models/exame';

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
  tipoExame: Exame[] = [];

  constructor(
    private fb: FormBuilder,
    private exameService: ExameService,
    private snackBar: MatSnackBar
  ) {
   this.agendamentoForm = this.fb.group({
    nome_paciente: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    email_paciente: ['', [Validators.required, Validators.email]],
    id_exame: ['', Validators.required],
    instrucoes: [''],
    cpf: ['', Validators.required],
    cartao_sus: ['', Validators.required],
    data_hora: ['', [Validators.required]],
  });
  }

  ngOnInit(){
     this.exameService.recuperaExames().subscribe({
      next: (response) => {
        this.tipoExame = response.exames;
      }
    });
  }

  onSubmit(): void {
    if (this.agendamentoForm.valid) {
      const formValue = this.agendamentoForm.value;

      const payload: Agendamento = {
        ...formValue,
        data_hora: this.formatDateToMySQL(formValue.data_hora)
      };

      this.exameService.agendaExame(payload).subscribe({
        next: () => {
          this.snackBar.open('Exame agendado com sucesso!', 'Fechar', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
          this.agendamentoForm.reset();
        },
        error: (err) => {
          const errorMsg = err?.error?.message || 'Erro ao agendar o exame.';
          this.snackBar.open(errorMsg, 'Fechar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        }
      });
    }
  }

  formatDateToMySQL(date: Date): string {
    const dataHora = new Date(date);
    dataHora.setHours(9, 30, 0, 0); // Define hora como 09:30:00

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${dataHora.getFullYear()}-${pad(dataHora.getMonth() + 1)}-${pad(dataHora.getDate())} ${pad(dataHora.getHours())}:${pad(dataHora.getMinutes())}:${pad(dataHora.getSeconds())}`;
  }

  onExameSelecionado(idExameSelecionado: number | undefined) {
    const exameSelecionado = this.tipoExame.find(e => e.id_exame === idExameSelecionado);
    if (exameSelecionado) {
      this.agendamentoForm.patchValue({
        instrucoes: exameSelecionado.instrucoes || ''
      });
    }
  }

}
