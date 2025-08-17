import { Produto } from './produto.model';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  valorTotal: number;
}

export interface Carrinho {
  itens: ItemCarrinho[];
  valorTotal: number;
  numeroItens: number;
}
