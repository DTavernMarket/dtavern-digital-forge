import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaExplorarComponent } from './pages/pagina-explorar/pagina-explorar.component';
import { LojaArtesaoComponent } from './pages/loja-artesao/loja-artesao.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaSobreComponent } from './pages/pagina-sobre/pagina-sobre.component';
import { PaginaTermosUsoComponent } from './pages/pagina-termos-uso/pagina-termos-uso.component';
import { PaginaPoliticaPrivacidadeComponent } from './pages/pagina-politica-privacidade/pagina-politica-privacidade.component';
import { authGuard } from './config/auth.guard';
import { lojaOwnerGuard } from './config/loja-owner.guard';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { BibliotecaComponent } from './pages/biblioteca/biblioteca.component';
import { GerenciarProdutosComponent } from './pages/loja-artesao/gerenciar-produtos.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'explorar', component: PaginaExplorarComponent },
  { path: 'sobre', component: PaginaSobreComponent },
  { path: 'termos-uso', component: PaginaTermosUsoComponent },
  { path: 'politica-privacidade', component: PaginaPoliticaPrivacidadeComponent },
  { path: 'produtos/:nomeNormalizado', component: ProdutoDetalheComponent },
  {
    path: 'lojas/:dominio',
    component: LojaArtesaoComponent
  },
  {
    path: 'lojas/:dominio/gerenciar-produtos',
    component: GerenciarProdutosComponent,
    canActivate: [authGuard, lojaOwnerGuard]
  },
  // As telas de novo/editar produto exigem apenas autenticação.
  // A verificação de dono da loja é feita ao acessar "gerenciar-produtos"
  // e reforçada no backend.
  { path: 'novo-produto', component: CadastroProdutoComponent, canActivate: [authGuard] },
  { path: 'editar-produto', component: CadastroProdutoComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'meu-perfil', component: MeuPerfilComponent, canActivate: [authGuard] },
  { path: 'biblioteca', component: BibliotecaComponent, canActivate: [authGuard] },
  { path: '**', component: PaginaNaoEncontradaComponent }
];
