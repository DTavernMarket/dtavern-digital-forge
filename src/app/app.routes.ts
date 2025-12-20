import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/pagina-produtos/pagina-produtos.component';
import { LojaArtesaoComponent } from './pages/loja-artesao/loja-artesao.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'produtos', component: PaginaProdutosComponent },
  { path: 'lojas/:dominio', component: LojaArtesaoComponent },
  { path: 'novo-produto', component: CadastroProdutoComponent },
  { path: 'editar-produto', component: CadastroProdutoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];
