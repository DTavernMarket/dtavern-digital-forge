import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/pagina-produtos/pagina-produtos.component';
import { LojaArtesaoComponent } from './pages/loja-artesao/loja-artesao.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { authGuard } from './config/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'produtos', component: PaginaProdutosComponent },
  { path: 'produtos/:nomeNormalizado', component: ProdutoDetalheComponent },
  {
    path: 'lojas/:dominio',
    component: LojaArtesaoComponent,
    children: [
      {
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full'
      },
      {
        path: ':aba',
        component: LojaArtesaoComponent
      }
    ]
  },
  { path: 'novo-produto', component: CadastroProdutoComponent, canActivate: [authGuard] },
  { path: 'editar-produto', component: CadastroProdutoComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'meu-perfil', component: MeuPerfilComponent, canActivate: [authGuard] },
  { path: '**', component: PaginaNaoEncontradaComponent }
];
