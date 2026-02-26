import { PagedResult } from "./produto.model";

// Interface para a resposta do backend (LojaResponse)
export interface LojaResponse {
  dominio: string;
  nome: string;
  email: string;
  descricao: string;
  caminhoImagemPerfil: string;
  caminhoImagemHeader: string;
}

// Interface mantida para compatibilidade com código existente
// Campos adicionais são opcionais e podem ser preenchidos com valores padrão
export interface Artesao {
  dominio: string;
  nome: string;
  biografia: string;
  /** Caminho da imagem de perfil da loja (retornado pelo backend) */
  caminhoImagemPerfil?: string;
  /** Caminho da imagem de header/capa da loja (retornado pelo backend) */
  caminhoImagemHeader?: string;
}

export interface RedesSociais {
  website?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
}

export interface CadastroLojaRequest {
  nomeLoja: string;
  email: string;
  password: string;
}

// DTO para lojas com mais vendas
export interface LojaMaisVendas {
  descricaoLoja: string;
  dominioLoja: string;
  idLoja: string;
  nomeLoja: string;
  qtdVendas: number;
}