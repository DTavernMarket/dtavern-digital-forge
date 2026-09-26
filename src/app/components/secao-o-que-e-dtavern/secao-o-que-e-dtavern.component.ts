import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secao-o-que-e-dtavern',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="o-que-e-dtavern" class="py-20 bg-midnight-brown/35">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
          <span class="text-candlelight-gold">Sua loja de RPG</span>, pronta para vender 
          </h2>

          <p class="text-lg text-scroll-beige/80 leading-relaxed">
          Crie sua loja, publique seus materiais e venda conteúdos digitais de RPG com sua própria identidade.
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

  <svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 10l2-5h12l2 5
         M5 10h14
         M6 10v9h12v-9
         M8 10v2
         M12 10v2
         M16 10v2
         M9 19v-5h6v5"
    />
  </svg>
            </div>
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Crie sua loja</h3>
            <p class="text-scroll-beige/75">
              Monte sua página dentro do DTavern com nome, identidade visual, descrição e links para divulgar seu trabalho.
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
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Publique seus produtos</h3>
            <p class="text-scroll-beige/75">
              Cadastre mapas, tokens, aventuras, trilhas e outros materiais digitais para deixar sua loja pronta para vender.
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
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Venda e entregue</h3>
            <p class="text-scroll-beige/75">
              Divulgue suas criações para sua comunidade e venda seus produtos diretamente pelo DTavern.
            </p>
          </article>
        </div>

        <div class="mt-10 flex justify-center">
          <button
            [routerLink]="['/cadastro']"
            [queryParams]="{ cadastro: 'artesao' }"
            class="px-8 py-4 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
          >
            Criar minha loja
            <svg
              class="w-5 h-5 ml-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
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
export class SecaoOQueEDtavernComponent { }
