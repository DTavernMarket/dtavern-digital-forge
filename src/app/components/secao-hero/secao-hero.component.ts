import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AmbientacaoHeroComponent } from '../ambientacao-hero/ambientacao-hero.component';

@Component({
  selector: 'app-secao-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, AmbientacaoHeroComponent],
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <app-ambientacao-hero />

      <!-- Conteúdo Principal -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto space-y-8">
          <!-- Título Principal -->
          <img
           src="assets/images/dtavern/ESCRITA/CREME.svg" 
              alt="DTavern"
              class="inline-block h-9 md:h-[3.25rem] lg:h-[3.9rem] w-auto align-middle ml-2"
            />
          <h3 class="text-5xl md:text-7xl lg:text-7xl font-medieval font-bold leading-tight">
            <span class="block text-candlelight-gold text-[1.575rem] md:text-[2.625rem] lg:text-[2.625rem] mt-2">
              Histórias incríveis começam aqui.
            </span>
          </h3>

          <!-- Subtítulo -->
          <p class="text-xl md:text-2xl text-scroll-beige/80 max-w-3xl mx-auto leading-relaxed">
            Crie sua loja, publique seus materiais e venda diretamente para sua comunidade.
          </p>

          <!-- Botões CTA -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

          <div class="hero-divisor" aria-hidden="true">
            <span class="hero-divisor__line"></span>
            <span class="hero-divisor__mark"></span>
            <span class="hero-divisor__line hero-divisor__line--invert"></span>
          </div>

          <p class="text-base md:text-lg text-scroll-beige/75 font-medium">
            Uma taverna para quem cria RPG.
          </p>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <button
        type="button"
        (click)="rolarParaProximaSecao()"
        aria-label="Rolar para a seção Como funciona"
        class="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-candlelight-gold/80 hover:text-candlelight-gold transition-colors"
      >
        <span class="text-xs uppercase tracking-[0.2em] text-scroll-beige/70">Role para ver mais</span>
        <span class="w-10 h-10 flex items-center justify-center motion-safe:animate-bounce">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .hero-divisor {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.65rem;
      }

      .hero-divisor__line {
        width: clamp(2.5rem, 12vw, 6rem);
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 211, 106, 0.35));
      }

      .hero-divisor__line--invert {
        background: linear-gradient(90deg, rgba(255, 211, 106, 0.35), transparent);
      }

      .hero-divisor__mark {
        width: 0.4rem;
        height: 0.4rem;
        transform: rotate(45deg);
        background: rgba(255, 211, 106, 0.45);
        border: 1px solid rgba(197, 139, 61, 0.6);
      }
    `,
  ],
})
export class SecaoHeroComponent {
  rolarParaProximaSecao(): void {
    const elementoProximaSecao = document.getElementById('o-que-e-dtavern');
    if (elementoProximaSecao) {
      elementoProximaSecao.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
