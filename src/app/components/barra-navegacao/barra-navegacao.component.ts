import { Component, signal, computed, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { ArtesaoService } from '../../services/artesao.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <nav [class]="isFixed ? 'fixed top-0 left-0 right-0 z-50 bg-midnight-brown/90 backdrop-blur-sm border-b border-brass-accent/30' : 'relative bg-midnight-brown/90 backdrop-blur-sm border-b border-brass-accent/30'">
      <div class="container mx-auto px-4">
        <!-- Container principal com 3 seções -->
        <div class="flex items-center justify-between py-4">
          
          <!-- SEÇÃO ESQUERDA: Logo -->
          <div class="flex items-center justify-center">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="assets/images/DTavern-icone.png" alt="DTavern" class="w-8 h-8 object-contain" />
            </div>
            <span class="text-lg font-medieval font-bold text-scroll-beige ml-2">DTavern</span>
          </div>

          <!-- SEÇÃO MEIO: Barra de Pesquisa e Menu -->
          <div class="flex-1 max-w-2xl mx-8 flex flex-col items-center space-y-2">
            <!-- Barra de Pesquisa -->
            <div class="relative w-full">
              <input
                type="text"
                [(ngModel)]="termoPesquisa"
                (input)="onPesquisaChange()"
                (keyup.enter)="realizarPesquisa()"
                placeholder="Pesquisar produtos, aventuras, mapas..."
                class="w-full px-2 py-1 pl-8 pr-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold focus:border-transparent transition-all duration-200 text-sm"
              />
              <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-scroll-beige/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <button
                *ngIf="termoPesquisa()"
                (click)="limparPesquisa()"
                class="absolute inset-y-0 right-0 pr-2 flex items-center text-scroll-beige/60 hover:text-scroll-beige transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

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
                    <div class="w-12 h-12 bg-tavern-wood/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-scroll-beige/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-scroll-beige font-semibold truncate">{{ produto.nome }}</h4>
                      <p class="text-scroll-beige/70 text-sm truncate">{{ produto.resumo || produto.descricao }}</p>
                      <div class="flex items-center space-x-2 mt-1">
                        <span *ngIf="produto.gratuito" class="text-green-500 font-bold text-sm">Grátis</span>
                        <span *ngIf="!produto.gratuito" class="text-candlelight-gold font-bold">R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Menu de Navegação -->
            <div class="flex items-center space-x-8">
              <a routerLink="/" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium text-sm">
                Início
              </a>
              <a routerLink="/produtos" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium text-sm">
                Produtos
              </a>
              <a href="#artesaos" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium text-sm">
                Artesãos
              </a>
              <a href="#sobre" class="text-scroll-beige hover:text-candlelight-gold transition-colors font-medium text-sm">
                Sobre
              </a>
            </div>
          </div>

          <!-- SEÇÃO DIREITA: Ações -->
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

        <!-- Menu Mobile -->
        <div 
          *ngIf="menuAberto()"
          class="md:hidden py-4 border-t border-brass-accent/30"
        >
          <div class="flex flex-col space-y-4">
            <a routerLink="/" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors text-sm">
              Início
            </a>
            <a routerLink="/produtos" routerLinkActive="text-candlelight-gold" class="text-scroll-beige hover:text-candlelight-gold transition-colors text-sm">
              Produtos
            </a>
            <a href="#artesaos" class="text-scroll-beige hover:text-candlelight-gold transition-colors text-sm">
              Artesãos
            </a>
            <a href="#sobre" class="text-scroll-beige hover:text-candlelight-gold transition-colors text-sm">
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
  @Input() isFixed: boolean = true;

  private produtoService = inject(ProdutoService);
  private artesaoService = inject(ArtesaoService);
  private router = inject(Router);
  

  menuAberto = signal(false);
  termoPesquisa = signal('');
  mostrarResultados = signal(false);
  resultadosPesquisa = signal<Produto[]>([]);

  constructor() {
    // Esconder resultados quando clicar fora
    effect(() => {
      if (this.termoPesquisa()) {
        this.mostrarResultados.set(true);
      }
    });
  }

  onPesquisaChange() {
    const termo = this.termoPesquisa();
    if (termo.length >= 2) {
      this.mostrarResultados.set(true);
      // Buscar produtos com paginação (primeira página, 5 resultados)
      this.produtoService.buscarProdutos(termo, 0, 5).subscribe({
        next: (resultado) => {
          this.resultadosPesquisa.set(resultado.content);
        },
        error: (error) => {
          console.error('Erro ao buscar produtos:', error);
          this.resultadosPesquisa.set([]);
        }
      });
    } else {
      this.mostrarResultados.set(false);
      this.resultadosPesquisa.set([]);
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
        produto: produto.nomeNormalizado 
      } 
    });
    this.mostrarResultados.set(false);
    this.termoPesquisa.set('');
  }

  limparPesquisa() {
    this.termoPesquisa.set('');
    this.mostrarResultados.set(false);
  }

  getArtesaoDominio(nomeArtesao: string): string {
    const artesao = this.artesaoService.obterArtesoes()().find(a => a.nome === nomeArtesao);
    return artesao?.dominio || '';
  }

}
