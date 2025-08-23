import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ProdutoService } from '../../services/produto.service';
import { Produto, CategoriaProduto } from '../../models/produto.model';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BarraNavegacaoComponent,
    RodapeComponent
  ],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao />
      
      <!-- Cabeçalho da Página -->
      <section class="pt-20 pb-12 bg-ash-smoke/30">
        <div class="container mx-auto px-4">
          <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-6xl font-medieval font-bold text-scroll-beige">
              Catálogo de
              <span class="text-candlelight-gold">
                Produtos
              </span>
            </h1>
            <p class="text-lg text-scroll-beige/70 max-w-2xl mx-auto">
              Descubra milhares de produtos digitais criados por artesãos talentosos para suas aventuras de RPG.
            </p>
          </div>
        </div>
      </section>

      <!-- Filtros e Busca -->
      <section class="py-8 bg-stone-gray/50 backdrop-blur-sm border-b border-brass-accent/30">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <!-- Barra de Busca -->
            <div class="relative flex-1 max-w-md">
              <input
                type="text"
                [ngModel]="termoBusca()"
                (ngModelChange)="termoBusca.set($event)"
                placeholder="Buscar produtos..."
                class="w-full px-4 py-3 pl-12 bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-scroll-beige/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <!-- Filtros -->
            <div class="flex flex-wrap gap-4">
              <select
                [ngModel]="categoriaSelecionada()"
                (ngModelChange)="categoriaSelecionada.set($event)"
                class="px-4 py-3 bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50"
              >
                <option value="">Todas as Categorias</option>
                <option *ngFor="let categoria of categorias" [value]="categoria">
                  {{ categoria }}
                </option>
              </select>

              <select
                [ngModel]="ordenacaoSelecionada()"
                (ngModelChange)="ordenacaoSelecionada.set($event)"
                class="px-4 py-3 bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50"
              >
                <option value="relevancia">Mais Relevantes</option>
                <option value="preco-menor">Menor Preço</option>
                <option value="preco-maior">Maior Preço</option>
                <option value="avaliacao">Melhor Avaliação</option>
                <option value="downloads">Mais Downloads</option>
                <option value="recente">Mais Recentes</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Grid de Produtos -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <!-- Resultados -->
          <div class="mb-8">
            <p class="text-scroll-beige/70">
              {{ produtosFiltrados().length }} produto(s) encontrado(s)
            </p>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              *ngFor="let produto of produtosFiltrados(); trackBy: rastrearProduto"
              class="group bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-lg"
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
              <div class="p-4 space-y-3">
                <div class="space-y-1">
                  <h3 class="text-lg font-semibold text-scroll-beige group-hover:text-candlelight-gold transition-colors line-clamp-2">
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
                    <svg class="w-4 h-4 text-candlelight-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-scroll-beige/80">{{ produto.avaliacao }}</span>
                    <span class="text-scroll-beige/60">({{ produto.numeroAvaliacoes }})</span>
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
                  <button class="px-3 py-2 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-sm">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>

          @if(produtosFiltrados().length > 0) {
          <!-- Paginação -->
          <div class="mt-12 flex justify-center">
            <div class="flex space-x-2">
              <button 
                class="px-4 py-2 border border-brass-accent/30 rounded-lg text-scroll-beige hover:bg-candlelight-gold/10 transition-colors"
                [disabled]="paginaAtual() === 1"
              >
                Anterior
              </button>
              <button 
                class="px-4 py-2 bg-candlelight-gold text-tavern-wood rounded-lg font-medium"
              >
                1
              </button>
              <button 
                class="px-4 py-2 border border-brass-accent/30 rounded-lg text-scroll-beige hover:bg-candlelight-gold/10 transition-colors"
              >
                2
              </button>
              <button 
                class="px-4 py-2 border border-brass-accent/30 rounded-lg text-scroll-beige hover:bg-candlelight-gold/10 transition-colors"
              >
                3
              </button>
              <button 
                class="px-4 py-2 border border-brass-accent/30 rounded-lg text-scroll-beige hover:bg-candlelight-gold/10 transition-colors"
              >
                Próxima
              </button>
            </div>
          </div>
          }
          @if(produtosFiltrados().length === 0) {
          <!-- Estado Vazio -->
          <div class="text-center py-12">
            <svg class="w-16 h-16 text-scroll-beige/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Nenhum produto encontrado</h3>
            <p class="text-scroll-beige/60">Tente ajustar os filtros ou termos de busca.</p>
          </div>
          }
        </div>
      </section>

      <app-rodape />
    </div>
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
export class PaginaProdutosComponent {
  private produtoService = inject(ProdutoService);
  
  // Estados reativos para filtros
  termoBusca = signal('');
  categoriaSelecionada = signal('');
  ordenacaoSelecionada = signal('relevancia');
  paginaAtual = signal(1);

  // Categorias disponíveis
  categorias = Object.values(CategoriaProduto);

  // Signal computado que reage automaticamente aos filtros
  produtosFiltrados = computed(() => {
    let produtos = this.produtoService.obterProdutos()();

    // Filtro por termo de busca
    if (this.termoBusca().trim()) {
      produtos = this.produtoService.buscarProdutos(this.termoBusca());
    }

    // Filtro por categoria
    if (this.categoriaSelecionada()) {
      produtos = produtos.filter(produto => produto.categoria === this.categoriaSelecionada());
    }

    // Ordenação
    return this.ordenarProdutos(produtos);
  });

  constructor() {
  }

  ordenarProdutos(produtos: Produto[]): Produto[] {
    switch (this.ordenacaoSelecionada()) {
      case 'preco-menor':
        return produtos.sort((a, b) => a.valorUnitario - b.valorUnitario);
      case 'preco-maior':
        return produtos.sort((a, b) => b.valorUnitario - a.valorUnitario);
      case 'avaliacao':
        return produtos.sort((a, b) => b.avaliacao - a.avaliacao);
      case 'downloads':
        return produtos.sort((a, b) => b.numeroDownloads - a.numeroDownloads);
      case 'recente':
        return produtos.sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
      default:
        return produtos;
    }
  }

  rastrearProduto(index: number, produto: Produto) {
    return produto.uuid;
  }
}
