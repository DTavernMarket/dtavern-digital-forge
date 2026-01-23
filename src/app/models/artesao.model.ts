import { PagedResult } from "./produto.model";

// Interface para a resposta do backend (LojaResponse)
export interface LojaResponse {
  dominio: string;
  nome: string;
  email: string;
  descricao: string;
}

// Interface mantida para compatibilidade com código existente
// Campos adicionais são opcionais e podem ser preenchidos com valores padrão
export interface Artesao {
  dominio: string;
  nome: string;
  biografia: string;
}

export interface RedesSociais {
  website?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
}
