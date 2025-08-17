import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-tavern-brass/30">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-accent to-magical-glow rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-tavern-wood" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-xl font-medieval font-bold text-foreground">DTavern</span>
          </div>

          <!-- Menu Desktop -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-accent" class="text-foreground hover:text-accent transition-colors">
              Início
            </a>
            <a routerLink="/produtos" routerLinkActive="text-accent" class="text-foreground hover:text-accent transition-colors">
              Produtos
            </a>
            <a href="#artesaos" class="text-foreground hover:text-accent transition-colors">
              Artesãos
            </a>
            <a href="#sobre" class="text-foreground hover:text-accent transition-colors">
              Sobre
            </a>
          </div>

          <!-- Ações -->
          <div class="flex items-center space-x-4">
            <!-- Busca -->
            <button class="p-2 text-foreground hover:text-accent transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- Carrinho -->
            <button class="p-2 text-foreground hover:text-accent transition-colors relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
              </svg>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-accent text-tavern-wood text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <!-- Perfil -->
            <button class="p-2 text-foreground hover:text-accent transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </button>

            <!-- Menu Mobile -->
            <button 
              (click)="menuAberto.set(!menuAberto())"
              class="md:hidden p-2 text-foreground hover:text-accent transition-colors"
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
          class="md:hidden py-4 border-t border-tavern-brass/30"
        >
          <div class="flex flex-col space-y-4">
            <a routerLink="/" routerLinkActive="text-accent" class="text-foreground hover:text-accent transition-colors">
              Início
            </a>
            <a routerLink="/produtos" routerLinkActive="text-accent" class="text-foreground hover:text-accent transition-colors">
              Produtos
            </a>
            <a href="#artesaos" class="text-foreground hover:text-accent transition-colors">
              Artesãos
            </a>
            <a href="#sobre" class="text-foreground hover:text-accent transition-colors">
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
