export interface Agendamento {
  nome_paciente: string;
  email_paciente: string;
  data_hora: string;
  id_exame: number;
  tipo_exame: string;
  instrucoes: string;
  cpf: string;
  cartao_sus: string;
}

export interface Exame {
  id_exame?: number;
  tipo_exame: string;
  instrucoes: string;
}
