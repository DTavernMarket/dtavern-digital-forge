import { Produto } from "./produto.model";
import { LojaResponse } from "./artesao.model";

export interface Venda {
    dataCompra: string | Date;
    loja: LojaResponse;
    produto: Produto;
    valorVenda: number;
}
