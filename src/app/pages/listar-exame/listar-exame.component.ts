import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExameService } from '../../services/exame.service';
import { Agendamento } from '../../models/exame';

@Component({
  selector: 'app-listar-exame',
  templateUrl: './listar-exame.component.html',
  styleUrls: ['./listar-exame.component.scss'],
  standalone: false,
})
export class ListarExameComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf', 'exame', 'data','hora'];
  dataSource = new MatTableDataSource<Agendamento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private exameService: ExameService
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarAgendamentos(): void {
  const dadosMock: Agendamento[] = [
    {
      nome_paciente: "Ana Souza",
      email_paciente: "ana.souza@email.com",
      data_hora: "2025-06-01T09:30:00",
      id_exame: 1,
      tipo_exame: "Hemograma Completo",
      instrucoes: "Jejum de 8 horas",
      cpf: "123.456.789-00",
      cartao_sus: "1234 5678 9012 3456"
    },
    {
      nome_paciente: "Carlos Pereira",
      email_paciente: "carlos.pereira@email.com",
      data_hora: "2025-06-02T14:00:00",
      id_exame: 2,
      tipo_exame: "Raio-X Torácico",
      instrucoes: "Não precisa de jejum",
      cpf: "987.654.321-00",
      cartao_sus: "6543 2109 8765 4321"
    }
  ];

      this.dataSource.data = dadosMock;

    // this.exameService.getAgendamentos().subscribe({
    //   next: (agendamentos) => {
    //     debugger
    //     this.dataSource.data = agendamentos;
    //   }
    // });
  }

  novoAgendamento(): void {
    this.router.navigate(['/agendar-exame']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
