import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secao-o-que-e-dtavern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="o-que-e-dtavern" class="py-20 bg-midnight-brown/35">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            O que é o <span class="text-candlelight-gold">DTavern</span>?
          </h2>

          <p class="text-lg text-scroll-beige/80 leading-relaxed">
            O DTavern é o marketplace de RPG onde você encontra conteudos digitais para suas mesas
            e também publica suas criações para vender com sua própria identidade.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article
            class="bg-tavern-wood/80 border border-brass-accent/30 rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div
              class="w-12 h-12 mx-auto mb-4 rounded-full bg-candlelight-gold/20 text-candlelight-gold flex items-center justify-center"
              aria-hidden="true"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Descubra</h3>
            <p class="text-scroll-beige/75">
              Explore mapas, tokens, aventuras e trilhas criadas por artesãos da comunidade.
            </p>
          </article>

          <article
            class="bg-tavern-wood/80 border border-brass-accent/30 rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div
              class="w-12 h-12 mx-auto mb-4 rounded-full bg-candlelight-gold/20 text-candlelight-gold flex items-center justify-center"
              aria-hidden="true"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 4h12M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Compre</h3>
            <p class="text-scroll-beige/75">
              Adquira conteúdo gratuito ou pago em poucos cliques e acesse sua biblioteca digital.
            </p>
          </article>

          <article
            class="bg-tavern-wood/80 border border-brass-accent/30 rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div
              class="w-12 h-12 mx-auto mb-4 rounded-full bg-candlelight-gold/20 text-candlelight-gold flex items-center justify-center"
              aria-hidden="true"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Publique</h3>
            <p class="text-scroll-beige/75">
              Crie sua loja, divulgue seu trabalho e venda materiais para jogadores e mestres.
            </p>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SecaoOQueEDtavernComponent {}
