import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-midnight-brown/90 backdrop-blur-sm border-b border-brass-accent/30">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-20 py-2">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="assets/images/DTavern-icone.png" alt="DTavern" class="w-12 h-12 object-contain" />
            </div>
            <span class="text-xl font-medieval font-bold text-scroll-beige">DTavern</span>
          </div>

          <!-- Barra de Pesquisa Centralizada -->
          <div class="flex-1 max-w-2xl mx-8 relative">
            <div class="relative">
              <input
                type="text"
                [(ngModel)]="termoPesquisa"
                (input)="onPesquisaChange()"
                (keyup.enter)="realizarPesquisa()"
                placeholder="Pesquisar produtos, aventuras, mapas..."
                class="w-full px-4 py-3 pl-12 pr-4 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold focus:border-transparent transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-scroll-beige/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <button
                *ngIf="termoPesquisa()"
                (click)="limparPesquisa()"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-scroll-beige/60 hover:text-scroll-beige transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Resultados da Pesquisa em Tempo Real -->
            <div 
              *ngIf="resultadosPesquisa().length > 0 && termoPesquisa() && mostrarResultados()"
              class="absolute top-full left-0 right-0 mt-2 bg-midnight-brown/95 border border-brass-accent/40 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
            >
              <div class="p-2">
                <div 
                  *ngFor="let produto of resultadosPesquisa()"
                  (click)="selecionarProduto(produto)"
                  class="flex items-center space-x-3 p-3 hover:bg-tavern-wood/20 rounded-lg cursor-pointer transition-colors"
                >
                  <img [src]="produto.imagens[0]" [alt]="produto.titulo" class="w-12 h-12 object-cover rounded-lg">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-scroll-beige font-semibold truncate">{{ produto.titulo }}</h4>
                    <p class="text-scroll-beige/70 text-sm truncate">{{ produto.descricao }}</p>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="text-candlelight-gold font-bold">R$ {{ produto.valorUnitario.toFixed(2) }}</span>
                      <span class="text-scroll-beige/60 text-xs">por {{ produto.nomeArtesao }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex items-center space-x-4">
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

        <!-- Menu de Navegação -->
        <div class="flex items-center justify-center py-3">
          <div class="flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium">
              Início
            </a>
            <a routerLink="/produtos" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium">
              Produtos
            </a>
            <a href="#artesaos" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium">
              Artesãos
            </a>
            <a href="#sobre" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium">
              Sobre
            </a>
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

    <!-- Espaçador para compensar a navbar fixa -->
    <div class="h-32"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BarraNavegacaoComponent {
  menuAberto = signal(false);
  termoPesquisa = signal('');
  mostrarResultados = signal(false);
  
  resultadosPesquisa = computed(() => {
    const termo = this.termoPesquisa();
    if (!termo || termo.length < 2) return [];
    return this.produtoService.buscarProdutos(termo).slice(0, 5);
  });

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {
    // Esconder resultados quando clicar fora
    effect(() => {
      if (this.termoPesquisa()) {
        this.mostrarResultados.set(true);
      }
    });
  }

  onPesquisaChange() {
    if (this.termoPesquisa().length >= 2) {
      this.mostrarResultados.set(true);
    } else {
      this.mostrarResultados.set(false);
    }
  }

  realizarPesquisa() {
    if (this.termoPesquisa().trim()) {
      this.router.navigate(['/produtos'], { 
        queryParams: { 
          pesquisa: this.termoPesquisa().trim() 
        } 
      });
      this.mostrarResultados.set(false);
    }
  }

  selecionarProduto(produto: Produto) {
    this.router.navigate(['/produtos'], { 
      queryParams: { 
        produto: produto.uuid 
      } 
    });
    this.mostrarResultados.set(false);
    this.termoPesquisa.set('');
  }

  limparPesquisa() {
    this.termoPesquisa.set('');
    this.mostrarResultados.set(false);
  }
}
