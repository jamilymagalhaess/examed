import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento, Exame } from '../models/exame';

@Injectable({
  providedIn: 'root',
})
export class ExameService {
  private baseUrl = 'http://192.168.1.19:8080/api';

  constructor(private http: HttpClient) {}

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/agendamentos`);
  }

  recuperaExames(): Observable<Exame[]> {
    return this.http.get<Exame[]>(`${this.baseUrl}/recupera-exames`);
  }

  cadastraExame(exame: Exame): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastra-exame`, exame);
  }

  agendaExame(agendamento: Agendamento): Observable<any> {
    return this.http.post(`${this.baseUrl}/agenda-exame`, agendamento);
  }
}
