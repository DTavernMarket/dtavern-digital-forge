export interface Produto {
  uuid: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaProduto;
  imagens: string[];
  artesaoId: string;
  nomeArtesao: string;
  avaliacao: number;
  numeroAvaliacoes: number;
  numeroDownloads: number;
  tamanhoArquivo: string;
  requisitos: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  valorUnitario: number;
}

export enum CategoriaProduto {
  TOKENS = 'Tokens',
  MAPAS = 'Mapas',
  AVENTURAS = 'Aventuras',
  TRILHAS_SONORAS = 'Trilhas Sonoras',
  FERRAMENTAS = 'Ferramentas',
  OUTROS = 'Outros'
}
