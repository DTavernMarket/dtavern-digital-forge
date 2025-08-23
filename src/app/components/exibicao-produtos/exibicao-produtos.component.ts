import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-exibicao-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="produtos" class="py-20 bg-tavern-wood">
      <div class="container mx-auto px-4">
        <!-- Cabeçalho da Seção -->
        <div class="text-center mb-16 space-y-4">
          <div class="inline-flex items-center space-x-2 bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-full px-4 py-2 text-sm mb-4">
            <svg class="w-4 h-4 text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-scroll-beige font-medium">Produtos em Destaque</span>
          </div>
          
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            Tesouros para suas
            <span class="text-candlelight-gold">
              Aventuras
            </span>
          </h2>
          
          <p class="text-lg text-scroll-beige/70 max-w-2xl mx-auto">
            Descubra criações únicas feitas por artesãos talentosos. 
            Tokens, mapas, aventuras e muito mais para enriquecer suas campanhas.
          </p>
        </div>

        <!-- Grid de Produtos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div 
            *ngFor="let produto of produtosEmDestaque(); trackBy: rastrearProduto"
            class="group bg-stone-gray/80 backdrop-blur-sm border-brass-accent/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-lg"
          >
            <!-- Imagem do Produto -->
            <div class="relative overflow-hidden">
              <img 
                [src]="produto.imagens[0]" 
                [alt]="produto.titulo"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-tavern-wood/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Badge da Categoria -->
              <div class="absolute top-3 left-3">
                <span class="bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold px-3 py-1 rounded-full">
                  {{ produto.categoria }}
                </span>
              </div>

              <!-- Botão Favorito -->
              <button class="absolute top-3 right-3 w-8 h-8 bg-stone-gray/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-candlelight-gold/20 transition-colors">
                <svg class="w-4 h-4 text-scroll-beige hover:text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <!-- Informações do Produto -->
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <h3 class="text-lg font-semibold text-scroll-beige group-hover:text-candlelight-gold transition-colors">
                  {{ produto.titulo }}
                </h3>
                <p class="text-sm text-scroll-beige/60">
                  por {{ produto.nomeArtesao }}
                </p>
              </div>

              <p class="text-sm text-scroll-beige/70 line-clamp-2">
                {{ produto.descricao }}
              </p>

              <!-- Avaliação e Downloads -->
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-candlelight-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="ml-1 text-scroll-beige/80">{{ produto.avaliacao }}</span>
                    <span class="text-scroll-beige/60">({{ produto.numeroAvaliacoes }})</span>
                  </div>
                </div>
                <div class="flex items-center space-x-1 text-scroll-beige/60">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  <span>{{ produto.numeroDownloads }}</span>
                </div>
              </div>

              <!-- Preço e Botão de Compra -->
              <div class="flex items-center justify-between pt-2">
                <div class="text-lg font-bold text-scroll-beige">
                  R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}
                </div>
                <button class="px-4 py-2 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-sm">
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Botão Ver Todos -->
        <div class="text-center">
          <button routerLink="/produtos" class="px-8 py-3 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all">
            Ver Todos os Produtos
            <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ExibicaoProdutosComponent {
  private produtoService = inject(ProdutoService);
  
  produtosEmDestaque = this.produtoService.obterProdutosEmDestaque();

  rastrearProduto(index: number, produto: any) {
    return produto.uuid;
  }
}
