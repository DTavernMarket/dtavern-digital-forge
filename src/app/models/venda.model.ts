import { Produto } from "./produto.model";
import { LojaResponse } from "./artesao.model";

export type StatusPagamento = 'PENDENTE' | 'APROVADO' | 'RECUSADO' | 'CANCELADO';

export interface Venda {
    dataCompra: string | Date;
    loja: LojaResponse;
    produto: Produto;
    valorVenda: number;
    statusPagamento: StatusPagamento;
}
