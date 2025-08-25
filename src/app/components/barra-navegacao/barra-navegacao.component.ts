import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-midnight-brown/80 backdrop-blur-sm border-b border-brass-accent/30">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="assets/images/DTavern-icone.png" alt="DTavern" class="w-12 h-12 object-contain" />
            </div>
            <span class="text-xl font-medieval font-bold text-scroll-beige">DTavern</span>
          </div>

          <!-- Menu Desktop -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Início
            </a>
            <a routerLink="/produtos" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Produtos
            </a>
            <a href="#artesaos" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Artesãos
            </a>
            <a href="#sobre" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Sobre
            </a>
          </div>

          <!-- Ações -->
          <div class="flex items-center space-x-4">
            <!-- Busca -->
            <button class="p-2 text-scroll-beige hover:text-candlelight-gold transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- Carrinho -->
            <button class="p-2 text-scroll-beige hover:text-candlelight-gold transition-colors relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-candlelight-gold text-tavern-wood text-xs rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            <!-- Perfil -->
            <button class="p-2 text-scroll-beige hover:text-candlelight-gold transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </button>

            <!-- Menu Mobile -->
            <button 
              (click)="menuAberto.set(!menuAberto())"
              class="md:hidden p-2 text-scroll-beige hover:text-candlelight-gold transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu Mobile -->
        <div 
          *ngIf="menuAberto()"
          class="md:hidden py-4 border-t border-brass-accent/30"
        >
          <div class="flex flex-col space-y-4">
            <a routerLink="/" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Início
            </a>
            <a routerLink="/produtos" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Produtos
            </a>
            <a href="#artesaos" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Artesãos
            </a>
            <a href="#sobre" class="text-scroll-beige hover:text-candlelight-gold transition-colors">
              Sobre
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BarraNavegacaoComponent {
  menuAberto = signal(false);
}
