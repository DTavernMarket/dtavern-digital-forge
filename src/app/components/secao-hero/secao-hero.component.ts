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
      <div class="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
        <img 
          src="/assets/images/tavern-hero.jpg" 
          alt="Taverna Medieval"
          class="w-full h-full object-cover opacity-20"
        />
      </div>

      <!-- Partículas Mágicas Animadas -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="particulas-magicas"></div>
      </div>

      <!-- Conteúdo Principal -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto space-y-8">
          <!-- Badge de Destaque -->
          <div class="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-tavern-brass/30 rounded-full px-6 py-3 text-sm">
            <svg class="w-5 h-5 text-accent animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-foreground font-medium">Bem-vindo à Forja Digital</span>
          </div>

          <!-- Título Principal -->
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-medieval font-bold text-foreground leading-tight">
            DTavern
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-magical-glow to-accent animate-pulse">
              Digital Forge
            </span>
          </h1>

          <!-- Subtítulo -->
          <p class="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            O mercado digital definitivo para suas aventuras de RPG. 
            Descubra tokens únicos, mapas épicos e aventuras memoráveis criadas por artesãos talentosos.
          </p>

          <!-- Estatísticas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
              <div class="text-foreground/70">Produtos Únicos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div class="text-foreground/70">Artesãos Talentosos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-accent mb-2">10k+</div>
              <div class="text-foreground/70">Downloads</div>
            </div>
          </div>

          <!-- Botões CTA -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button routerLink="/produtos" class="px-8 py-4 bg-gradient-to-r from-accent to-magical-glow text-tavern-wood rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
              Explorar Produtos
              <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
            <button class="px-8 py-4 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-tavern-wood transition-all duration-300 text-lg">
              Seja um Artesão
              <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .particulas-magicas {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 69, 0, 0.1) 0%, transparent 50%);
      animation: float 20s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      33% {
        transform: translateY(-20px) rotate(120deg);
      }
      66% {
        transform: translateY(10px) rotate(240deg);
      }
    }
  `]
})
export class SecaoHeroComponent {}
