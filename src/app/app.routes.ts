import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaSobreComponent } from './pages/pagina-sobre/pagina-sobre.component';
import { PaginaEmDesenvolvimentoComponent } from './pages/pagina-em-desenvolvimento/pagina-em-desenvolvimento.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'sobre', component: PaginaSobreComponent },
  { path: 'em-desenvolvimento', component: PaginaEmDesenvolvimentoComponent },
  { path: '**', redirectTo: 'em-desenvolvimento' }
];
