import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ExameService } from '../services/exame.service';

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
    private snackBar: MatSnackBar
  ) // private exameService: ExameService
  {
    this.cadastroForm = this.fb.group({
      nomeExame: ['', Validators.required],
      codigoExame: [''],
      descricao: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;

      // Simulando chamada ao serviço (descomente quando implementar)
      // this.exameService.cadastrarExame(formData).subscribe({
      //   next: () => {
      this.snackBar.open('Exame cadastrado com sucesso!', 'Fechar', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
      this.cadastroForm.reset();
      //   },
      //   error: (err) => {
      //     console.error('Erro ao cadastrar exame:', err);
      //     this.snackBar.open('Erro ao cadastrar exame. Tente novamente.', 'Fechar', {
      //       duration: 5000,
      //       panelClass: ['error-snackbar']
      //     });
      //   }
      // });
    }
  }
}
