export interface Cliente {
  uuid: string;
  email: string;
  nome: string;
  avatar?: string;
  papel: PapelUsuario;
  favoritos: string[];
  historicoCompras: Compra[];
  dataCriacao: Date;
}

export enum PapelUsuario {
  CLIENTE = 'cliente',
  ARTESAO = 'artesao',
  ADMINISTRADOR = 'administrador'
}

export interface Compra {
  id: string;
  produtoId: string;
  tituloProduto: string;
  preco: number;
  dataCompra: Date;
}
