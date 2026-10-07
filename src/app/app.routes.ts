import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaSobreComponent } from './pages/pagina-sobre/pagina-sobre.component';
import { PaginaTermosUsoComponent } from './pages/pagina-termos-uso/pagina-termos-uso.component';
import { PaginaPoliticaPrivacidadeComponent } from './pages/pagina-politica-privacidade/pagina-politica-privacidade.component';
import { PaginaEmDesenvolvimentoComponent } from './pages/pagina-em-desenvolvimento/pagina-em-desenvolvimento.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'sobre', component: PaginaSobreComponent },
  { path: 'termos-uso', component: PaginaTermosUsoComponent },
  { path: 'politica-privacidade', component: PaginaPoliticaPrivacidadeComponent },
  { path: 'em-desenvolvimento', component: PaginaEmDesenvolvimentoComponent },
  { path: '**', redirectTo: 'em-desenvolvimento' }
];
