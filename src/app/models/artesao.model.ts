export interface Artesao {
  uuid: string;
  dominio: string; // identificador amigavel da loja do artesao
  nome: string;
  biografia: string;
  avatar: string;
  especialidades: string[];
  avaliacao: number;
  numeroAvaliacoes: number;
  numeroProdutos: number;
  numeroSeguidores: number;
  dataEntrada: Date;
  redesSociais: RedesSociais;
}

export interface RedesSociais {
  website?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
}
