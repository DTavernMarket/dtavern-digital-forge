import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/pagina-produtos/pagina-produtos.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'produtos', component: PaginaProdutosComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];
