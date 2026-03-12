export interface Produto {
  categoriaCodigo: string;
  descricao: string;
  gratuito: boolean;
  nome: string;
  nomeNormalizado: string;
  valorUnitario: number;
  promocaoPorcentagem?: number;
  valorPromocional?: number | null;
  nomeLoja: string;
  dominioLoja: string;
  midiaPreview?: Midia | null;
}

export interface Midia {
  idMidia: string;
  nomeArquivo: string;
  url: string;
  alturaPx: number;
  larguraPx: number;
  mimeType: string;
  tamanhoBytes: number;
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

export interface ProdutoCompleto {
  id: string;
  categoriaCodigo: string;
  descricao?: string;
  gratuito: boolean;
  disponivel: boolean;
  nome: string;
  nomeNormalizado: string;
  valorUnitario: number;
  promocaoPorcentagem?: number | null;
  valorPromocional?: number | null;
  nomeLoja: string;
  dominioLoja: string;
  midiaPreview: Midia;
  midiaConteudo: Midia;
}

/** DTO retornado pelo endpoint de produtos mais vendidos (ProdutosMaisVendidosProjection). */
export interface ProdutosMaisVendidosDTO {
  quantidadeVendas: number;
  idProduto: string;
  nomeProduto: string;
  nomeProdutoNormalizado: string;
  codigoCategoria: string;
  nomeCategoria: string;
  descricaoProduto: string;
  valorUnitario: number;
  promocaoPorcentagem: number | null;
  valorPromocional: number | null;
  urlPreview: string;
  flagGratuito: boolean;
}


export interface CategoriaProduto {
  codigo: string;
  nome: string;
}