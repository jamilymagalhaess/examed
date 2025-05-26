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
import { ExameService } from '../../services/exame.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamento } from '../../models/exame';

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
  tiposExame = [
    { id: 1, nome: 'Hemograma Completo' },
    { id: 2, nome: 'Glicemia em Jejum' },
    { id: 3, nome: 'Colesterol Total' },
    { id: 4, nome: 'Urina Tipo 1' },
    { id: 5, nome: 'Eletrocardiograma' },
    { id: 6, nome: 'Ultrassonografia Abdominal' },
  ];

  constructor(
    private fb: FormBuilder,
    private exameService: ExameService,
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
    const formValue = this.agendamentoForm.value;

    const dataHoraISO = new Date(formValue.dataExame);
    dataHoraISO.setHours(9, 30, 0, 0);
    const payload: Agendamento = {
      data_hora: this.formatDateToMySQL(dataHoraISO),
      id_exame: Number(formValue.tipoExame),
      instrucoes: formValue.instrucoes,
      nome_paciente: formValue.nome,
      email_paciente: formValue.email,
      cpf: formValue.cpf,
      cartao_sus: formValue.cartaoSus,
    };

    this.exameService.agendaExame(payload).subscribe({
      next: () => {
        this.snackBar.open('Exame agendado com sucesso!', 'Fechar', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
        this.agendamentoForm.reset();
      },
    });
  }

  formatDateToMySQL(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`;
  }
}
