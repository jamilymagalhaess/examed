export interface Agendamento {
  nome_paciente: string;
  email_paciente: string;
  data_hora: string;
  id_exame: number;
  instrucoes: string;
  cpf: string;
  cartao_sus: string;
}

export interface Exame {
  id?: number;
  nome: string;
  descricao: string;
}
