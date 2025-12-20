export interface Produto {
  categoriaCodigo: string;
  descricao: string;
  gratuito: boolean;
  nome: string;
  nomeNormalizado: string;
  promocaoPorcentagem: number;
  resumo: string;
  valorUnitario: number;
  nomeLoja: string;
  dominioLoja: string;
  urlPreview?: string;
}

export interface PagedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}


