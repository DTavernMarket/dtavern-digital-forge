import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { ArtesaoService } from '../../services/artesao.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-exibicao-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="produtos" class="py-20 bg-tavern-wood">
      <div class="container mx-auto px-4">
        <!-- Cabeçalho da Seção -->
        <div class="text-center mb-20 space-y-4">
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            Tesouros para suas
            <span class="text-candlelight-gold"> Aventuras </span>
          </h2>

          <p class="text-lg text-scroll-beige/70 max-w-2xl mx-auto">
            Descubra criações únicas feitas por artesãos talentosos. Tokens, mapas, aventuras e
            muito mais para enriquecer suas campanhas.
          </p>
        </div>

        <!-- Grid de Produtos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            *ngFor="let produto of produtosEmDestaque"
            class="group bg-midnight-brown/50 backdrop-blur-sm border-brass-accent/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-lg"
          >
            <!-- Imagem do Produto -->
            <div class="relative overflow-hidden bg-tavern-wood/20 h-48">
              <!-- Imagem de Preview ou Placeholder -->
              <img
                *ngIf="produto.urlPreview"
                [src]="produto.urlPreview"
                [alt]="produto.nome"
                class="w-full h-full object-cover"
              />
              <div
                *ngIf="!produto.urlPreview"
                class="w-full h-full flex items-center justify-center"
              >
                <svg
                  class="w-16 h-16 text-scroll-beige/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div
                class="absolute inset-0 bg-tavern-wood/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <!-- Badge da Categoria -->
              <div class="absolute top-3 left-3">
                <span
                  class="bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ produto.categoriaCodigo }}
                </span>
              </div>
              <div *ngIf="produto.gratuito" class="absolute top-3 right-3">
                <span
                  class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  Grátis
                </span>
              </div>

              <!-- Botão Favorito -->
              <button
                class="absolute top-3 right-3 w-8 h-8 bg-stone-gray/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-candlelight-gold/20 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-scroll-beige hover:text-candlelight-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <!-- Informações do Produto -->
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <h3
                  class="text-lg font-semibold text-scroll-beige group-hover:text-candlelight-gold transition-colors"
                >
                  {{ produto.nome }}
                </h3>
              </div>

              <p class="text-sm text-scroll-beige/70 line-clamp-2">
                {{ produto.descricao || '' }}
              </p>

              <!-- Preço e Botão de Compra -->
              <div class="flex items-center justify-between pt-2">
                <div>
                  <span *ngIf="false" class="text-lg font-bold text-scroll-beige">
                    Grátis
                  </span>
                  <span *ngIf="!false" class="text-lg font-bold text-scroll-beige">
                    R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}
                  </span>
                  <span
                    *ngIf="0 > 0 && !false"
                    class="text-scroll-beige/60 text-sm line-through ml-2"
                  >
                    R$ {{ (produto.valorUnitario / (1 - produto.promocaoPorcentagem / 100)).toFixed(2).replace('.', ',') }}
                  </span>
                </div>
                <button
                  class="px-4 py-2 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-sm"
                >
                  {{ false ? 'Baixar' : 'Adicionar ao Carrinho' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Botão Ver Todos -->
        <div class="text-center">
          <button
            routerLink="/produtos"
            class="px-8 py-3 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all"
          >
            Ver Todos os Produtos
            <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class ExibicaoProdutosComponent {
  produtosEmDestaque: Produto[] = [];

  constructor(private produtoService: ProdutoService, private artesaoService: ArtesaoService) {
    // Por enquanto, deixar vazio até ter uma API para buscar produtos em destaque
    // TODO: Implementar busca de produtos em destaque do backend
  }

  rastrearProduto(index: number, produto: Produto) {
    return produto.nomeNormalizado || produto.nome;
  }

  getArtesaoDominio(nomeArtesao: string): string {
    const artesao = this.artesaoService
      .obterArtesoes()()
      .find((a) => a.nome === nomeArtesao);
    return artesao?.dominio || '';
  }
}
