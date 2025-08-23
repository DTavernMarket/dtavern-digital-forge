import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BarraNavegacaoComponent,
    RodapeComponent
  ],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao />
      
      <section class="flex items-center justify-center min-h-screen py-20">
        <div class="container mx-auto px-4 text-center">
          <!-- Ilustração -->
          <div class="mb-8">
            <div class="relative mx-auto w-64 h-64">
              <!-- Círculo de fundo -->
              <div class="absolute inset-0 bg-candlelight-gold/20 rounded-full animate-pulse"></div>
              
              <!-- Ícone de erro -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-32 h-32 bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-full flex items-center justify-center">
                  <svg class="w-16 h-16 text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Partículas decorativas -->
              <div class="absolute top-4 left-4 w-4 h-4 bg-candlelight-gold rounded-full animate-bounce"></div>
              <div class="absolute top-8 right-8 w-3 h-3 bg-warm-amber rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
              <div class="absolute bottom-8 left-8 w-2 h-2 bg-candlelight-gold rounded-full animate-bounce" style="animation-delay: 1s"></div>
              <div class="absolute bottom-4 right-4 w-3 h-3 bg-warm-amber rounded-full animate-bounce" style="animation-delay: 1.5s"></div>
            </div>
          </div>

          <!-- Texto do Erro -->
          <div class="space-y-6 max-w-2xl mx-auto">
            <div class="space-y-4">
              <h1 class="text-6xl md:text-8xl font-medieval font-bold text-scroll-beige">
                <span class="text-candlelight-gold">
                  404
                </span>
              </h1>
              <h2 class="text-2xl md:text-4xl font-semibold text-scroll-beige">
                Página Perdida no Labirinto
              </h2>
            </div>
            
            <p class="text-lg text-scroll-beige/70 leading-relaxed">
              Parece que esta página foi engolida por um portal dimensional ou se perdeu 
              em alguma masmorra esquecida. Não se preocupe, nossos aventureiros estão 
              procurando por ela!
            </p>

            <!-- Estatísticas Divertidas -->
            <div class="flex flex-wrap justify-center gap-6 text-sm">
              <div class="flex items-center space-x-2 bg-stone-gray/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <svg class="w-4 h-4 text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-scroll-beige/80">Tempo de busca: 2.5 segundos</span>
              </div>
              <div class="flex items-center space-x-2 bg-stone-gray/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <svg class="w-4 h-4 text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-scroll-beige/80">Portal dimensional: Ativo</span>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button 
                routerLink="/"
                class="px-8 py-3 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-base flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                Voltar ao Início
              </button>
              <button 
                routerLink="/produtos"
                class="px-8 py-3 border-2 border-candlelight-gold text-candlelight-gold rounded-lg font-medium hover:bg-candlelight-gold hover:text-tavern-wood transition-all text-base flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Explorar Produtos
              </button>
            </div>

            <!-- Dica -->
            <div class="mt-8 p-4 bg-stone-gray/40 backdrop-blur-sm border border-brass-accent/30 rounded-lg">
              <p class="text-sm text-scroll-beige/60">
                💡 <strong>Dica:</strong> Verifique se o URL está correto ou use a barra de navegação 
                para encontrar o que procura.
              </p>
            </div>
          </div>
        </div>
      </section>

      <app-rodape />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PaginaNaoEncontradaComponent {}
