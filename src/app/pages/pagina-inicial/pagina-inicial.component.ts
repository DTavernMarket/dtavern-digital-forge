import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { SecaoHeroComponent } from '../../components/secao-hero/secao-hero.component';
import { SecaoOQueEDtavernComponent } from '../../components/secao-o-que-e-dtavern/secao-o-que-e-dtavern.component';
import { SecaoParaQuemEComponent } from '../../components/secao-para-quem-e/secao-para-quem-e.component';
import { SecaoArtesoesComponent } from '../../components/secao-artesoes/secao-artesoes.component';
import { SecaoCtaFinalComponent } from '../../components/secao-cta-final/secao-cta-final.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    CommonModule,
    BarraNavegacaoComponent,
    SecaoHeroComponent,
    SecaoOQueEDtavernComponent,
    SecaoParaQuemEComponent,
    SecaoArtesoesComponent,
    SecaoCtaFinalComponent,
    RodapeComponent
  ],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao [isFixed]="true" />
      <div>
        <app-secao-hero />
        <app-secao-o-que-e-dtavern />
        <app-secao-para-quem-e />
        <app-secao-artesoes />
        <app-secao-cta-final />
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
