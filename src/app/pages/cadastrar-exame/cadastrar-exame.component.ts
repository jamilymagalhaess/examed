import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExameService } from '../../services/exame.service';

@Component({
  selector: 'app-cadastrar-exame',
  templateUrl: './cadastrar-exame.component.html',
  styleUrls: ['./cadastrar-exame.component.scss'],
  standalone: false,
})
export class CadastrarExameComponent implements OnInit {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private exameService: ExameService
  )
  {
    this.cadastroForm = this.fb.group({
      tipo_exame: ['', Validators.required],
      instrucoes: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;

      this.exameService.cadastraExame(formData).subscribe({
        next: () => {
          this.snackBar.open('Exame cadastrado com sucesso!', 'Fechar', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
          this.cadastroForm.reset();
        },
        error: (err) => {
          const errorMsg = err?.error?.message || 'Erro ao cadastrar o exame.';
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
}
