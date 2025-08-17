import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { SecaoHeroComponent } from '../../components/secao-hero/secao-hero.component';
import { ExibicaoProdutosComponent } from '../../components/exibicao-produtos/exibicao-produtos.component';
import { SecaoArtesoesComponent } from '../../components/secao-artesoes/secao-artesoes.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    CommonModule,
    BarraNavegacaoComponent,
    SecaoHeroComponent,
    ExibicaoProdutosComponent,
    SecaoArtesoesComponent,
    RodapeComponent
  ],
  template: `
    <div class="min-h-screen bg-background font-body">
      <app-barra-navegacao />
      <app-secao-hero />
      <app-exibicao-produtos />
      <app-secao-artesoes />
      <app-rodape />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PaginaInicialComponent {}
