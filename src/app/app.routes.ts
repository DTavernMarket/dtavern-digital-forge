import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PaginaSobreComponent } from './pages/pagina-sobre/pagina-sobre.component';
import { PaginaTermosUsoComponent } from './pages/pagina-termos-uso/pagina-termos-uso.component';
import { PaginaPoliticaPrivacidadeComponent } from './pages/pagina-politica-privacidade/pagina-politica-privacidade.component';
import { PaginaEmDesenvolvimentoComponent } from './pages/pagina-em-desenvolvimento/pagina-em-desenvolvimento.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ConfirmarContaComponent } from './pages/confirmar-conta/confirmar-conta.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'sobre', component: PaginaSobreComponent },
  { path: 'termos-uso', component: PaginaTermosUsoComponent },
  { path: 'politica-privacidade', component: PaginaPoliticaPrivacidadeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'confirmar-conta', component: ConfirmarContaComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  { path: 'em-desenvolvimento', component: PaginaEmDesenvolvimentoComponent },
  { path: '**', redirectTo: 'em-desenvolvimento' }
];
