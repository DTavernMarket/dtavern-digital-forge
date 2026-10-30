import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { SecaoHeroComponent } from '../../components/secao-hero/secao-hero.component';
import { SecaoComoFuncionaComponent } from '../../components/secao-como-funciona/secao-como-funciona.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    CommonModule,
    BarraNavegacaoComponent,
    SecaoHeroComponent,
    SecaoComoFuncionaComponent,
    RodapeComponent
  ],
  template: `
    <div class="min-h-svh bg-tavern-wood font-body">
      <app-barra-navegacao [isFixed]="true" />
      <div>
        <app-secao-hero />
        <app-secao-como-funciona />
        <app-rodape />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PaginaInicialComponent {}
