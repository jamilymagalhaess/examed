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
  displayedColumns: string[] = ['nome', 'cpf','email', 'exame', 'data'];
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
    this.exameService.getAgendamentos().subscribe({
      next: (response) => {
         this.dataSource = new MatTableDataSource<Agendamento>(response.agendamentos);
         this.dataSource.paginator = this.paginator;
      }
    });
  }

  novoAgendamento(): void {
    this.router.navigate(['/agendar-exame']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
