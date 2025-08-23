import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secao-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background com Imagem -->
      <div class="absolute inset-0">
        <img
          src="images/tavern-hero.jpg"
          alt="Taverna Medieval"
          class="w-full h-full object-cover"
        />
        <!-- Overlay escuro para melhorar legibilidade do texto -->
        <div class="absolute inset-0 bg-tavern-wood/80"></div>
      </div>

      <!-- Conteúdo Principal -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto space-y-8">
          <!-- Título Principal -->
          <h1
            class="text-5xl md:text-7xl lg:text-8xl font-medieval font-bold text-scroll-beige leading-tight"
          >
            Bem-vindo à <div class="block text-candlelight-gold">DTavern</div>
          </h1>

          <!-- Subtítulo -->
          <p class="text-xl md:text-2xl text-scroll-beige/80 max-w-3xl mx-auto leading-relaxed">
            O mercado digital definitivo para suas aventuras de RPG. Descubra tokens únicos, mapas
            épicos e aventuras memoráveis criadas por artesãos talentosos.
          </p>

          <!-- Estatísticas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-candlelight-gold mb-2">500+</div>
              <div class="text-scroll-beige/70">Produtos Únicos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-candlelight-gold mb-2">50+</div>
              <div class="text-scroll-beige/70">Artesãos Talentosos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-candlelight-gold mb-2">10k+</div>
              <div class="text-scroll-beige/70">Downloads</div>
            </div>
          </div>

          <!-- Botões CTA -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              routerLink="/produtos"
              class="px-8 py-4 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
            >
              Explorar Produtos
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
            <button
              class="px-8 py-4 border-2 border-candlelight-gold text-candlelight-gold rounded-lg font-medium hover:bg-candlelight-gold hover:text-tavern-wood transition-all duration-300 text-lg"
            >
              Seja um Artesão
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          class="w-6 h-6 text-scroll-beige/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
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
export class SecaoHeroComponent {}
