import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-em-desenvolvimento',
  standalone: true,
  imports: [CommonModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao [isFixed]="false" />

      <section class="flex items-center justify-center min-h-[70vh] py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto text-center bg-midnight-brown/70 border border-brass-accent/40 rounded-xl p-8 md:p-10">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-candlelight-gold/20 text-candlelight-gold flex items-center justify-center">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M5.2 19h13.6c1.5 0 2.4-1.6 1.7-2.8L13.7 4.8a2 2 0 00-3.4 0L3.5 16.2c-.7 1.2.2 2.8 1.7 2.8z"
                />
              </svg>
            </div>

            <h1 class="text-3xl md:text-4xl font-medieval font-bold text-scroll-beige mb-3">
              Estamos trabalhando nisso
            </h1>
            <p class="text-scroll-beige/80 text-base md:text-lg leading-relaxed mb-8">
              Esta funcionalidade ainda está em desenvolvimento. Estamos preparando tudo para lançar em breve.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                routerLink="/"
                class="px-6 py-3 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber transition-colors"
              >
                Voltar ao início
              </a>
              <button
                type="button"
                (click)="voltarPaginaAnterior()"
                class="px-6 py-3 border-2 border-candlelight-gold text-candlelight-gold rounded-lg font-medium hover:bg-candlelight-gold hover:text-tavern-wood transition-colors"
              >
                Voltar para a página anterior
              </button>
            </div>
          </div>
        </div>
      </section>

      <app-rodape />
    </div>
  `,
})
export class PaginaEmDesenvolvimentoComponent {
  voltarPaginaAnterior(): void {
    window.history.back();
  }
}
