import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ExameService } from '../services/exame.service';

interface Agendamento {
  id: number;
  nome: string;
  cpf: string;
  tipoExame: string;
  dataExame: Date;
  email: string;
  cartaoSus: string;
}

@Component({
  selector: 'app-listar-exame',
  templateUrl: './listar-exame.component.html',
  styleUrls: ['./listar-exame.component.scss'],
  standalone: false,
})
export class ListarExameComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf', 'exame', 'data', 'acoes'];
  dataSource = new MatTableDataSource<Agendamento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // private exameService: ExameService
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarAgendamentos(): void {
    // Simulando dados - substitua pela chamada real ao serviço
    const dadosMock: Agendamento[] = [
      {
        id: 1,
        nome: 'João Silva',
        cpf: '12345678901',
        tipoExame: 'Hemograma Completo',
        dataExame: new Date('2023-12-15'),
        email: 'joao@email.com',
        cartaoSus: '123456789012345',
      },
      {
        id: 2,
        nome: 'Maria Oliveira',
        cpf: '98765432109',
        tipoExame: 'Ultrassonografia Abdominal',
        dataExame: new Date('2023-12-20'),
        email: 'maria@email.com',
        cartaoSus: '987654321098765',
      },
    ];

    this.dataSource.data = dadosMock;

    // Chamada real ao serviço (descomente quando implementar)
    // this.exameService.listarAgendamentos().subscribe({
    //   next: (agendamentos) => {
    //     this.dataSource.data = agendamentos;
    //   },
    //   error: (err) => {
    //     console.error('Erro ao carregar agendamentos:', err);
    //     this.snackBar.open('Erro ao carregar agendamentos', 'Fechar', {
    //       duration: 5000,
    //       panelClass: ['error-snackbar']
    //     });
    //   }
    // });
  }

  novoAgendamento(): void {
    this.router.navigate(['/agendar-exame']);
  }

  editarAgendamento(agendamento: Agendamento): void {
    this.router.navigate(['/agendar-exame', agendamento.id]);
  }

  cancelarAgendamento(agendamento: Agendamento): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Cancelamento',
        message: `Deseja realmente cancelar o agendamento de ${agendamento.nome} para ${agendamento.tipoExame}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Simulando exclusão - substitua pela chamada real ao serviço
        this.dataSource.data = this.dataSource.data.filter(
          (a) => a.id !== agendamento.id
        );
        this.snackBar.open('Agendamento cancelado com sucesso!', 'Fechar', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });

        // Chamada real ao serviço (descomente quando implementar)
        // this.exameService.cancelarAgendamento(agendamento.id).subscribe({
        //   next: () => {
        //     this.carregarAgendamentos();
        //     this.snackBar.open('Agendamento cancelado com sucesso!', 'Fechar', {
        //       duration: 5000,
        //       panelClass: ['success-snackbar']
        //     });
        //   },
        //   error: (err) => {
        //     console.error('Erro ao cancelar agendamento:', err);
        //     this.snackBar.open('Erro ao cancelar agendamento', 'Fechar', {
        //       duration: 5000,
        //       panelClass: ['error-snackbar']
        //     });
        //   }
        // });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
