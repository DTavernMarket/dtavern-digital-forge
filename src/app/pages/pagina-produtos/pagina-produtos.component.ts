import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ProdutoService } from '../../services/produto.service';
import { ArtesaoService } from '../../services/artesao.service';
import { Produto, CategoriaProduto } from '../../models/produto.model';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao />

      <!-- Layout Principal: Filtros + Produtos -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Sidebar de Filtros (Esquerda) -->
            <div class="lg:w-80 flex-shrink-0">
              <div
                class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 sticky top-32"
              >
                <!-- Filtros de Busca -->
                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-scroll-beige mb-4">Filtros</h3>

                                     <!-- Barra de Busca -->
                   <div class="relative mb-4">
                     <input
                       type="text"
                       [ngModel]="termoBusca()"
                       (ngModelChange)="atualizarBusca($event)"
                       placeholder="Buscar produtos..."
                       class="w-full px-4 py-3 pl-10 bg-stone-gray/20 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50"
                     />
                     <svg
                       class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-scroll-beige/50"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                       />
                     </svg>
                   </div>

                   <!-- Ordenação -->
                   <div class="mb-4">
                     <label class="block text-sm font-medium text-scroll-beige/80 mb-2">
                       Ordenar por
                     </label>
                     <div class="relative">
                       <button
                         (click)="dropdownOrdenacao.set(!dropdownOrdenacao())"
                         class="w-full px-3 py-2 bg-stone-gray/20 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50 text-sm flex items-center justify-between"
                       >
                         <span>{{ obterTextoOrdenacao() }}</span>
                         <svg class="w-4 h-4 text-scroll-beige/60 transition-transform" [class.rotate-180]="dropdownOrdenacao()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                         </svg>
                       </button>
                       
                       <!-- Dropdown Customizado -->
                       <div
                         *ngIf="dropdownOrdenacao()"
                         class="absolute top-full left-0 right-0 mt-1 bg-midnight-brown border border-brass-accent/30 rounded-lg shadow-xl z-50"
                       >
                         <div class="py-1">
                           <button
                             *ngFor="let opcao of opcoesOrdenacao"
                             (click)="selecionarOrdenacao(opcao.value)"
                             class="w-full text-left px-3 py-1.5 text-scroll-beige hover:bg-stone-gray/40 transition-colors text-sm">
                             {{ opcao.label }}
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <!-- Categorias -->
                 <div class="mb-6">
                   <h3 class="text-lg font-semibold text-scroll-beige mb-4">Categorias</h3>
                   <div class="space-y-2">
                     <button
                       (click)="categoriaSelecionada.set('')"
                       [class]="
                         !categoriaSelecionada()
                           ? 'bg-candlelight-gold/20 text-candlelight-gold'
                           : 'text-scroll-beige/70 hover:text-scroll-beige'
                       "
                       class="w-full text-left px-3 py-2 rounded-lg transition-colors text-sm"
                     >
                       Todas as Categorias
                     </button>
                     <button
                       *ngFor="let categoria of categorias"
                       (click)="categoriaSelecionada.set(categoria)"
                       [class]="
                         categoriaSelecionada() === categoria
                           ? 'bg-candlelight-gold/20 text-candlelight-gold'
                           : 'text-scroll-beige/70 hover:text-scroll-beige'
                       "
                       class="w-full text-left px-3 py-2 rounded-lg transition-colors text-sm"
                     >
                       {{ categoria }}
                     </button>
                   </div>
                 </div>

                 <!-- Filtros Adicionais -->
                 <div class="mb-6">
                   <h3 class="text-lg font-semibold text-scroll-beige mb-4">Filtros Avançados</h3>

                   <!-- Faixa de Preço -->
                   <div class="mb-4">
                     <label class="block text-sm font-medium text-scroll-beige/80 mb-2">
                       Faixa de Preço
                     </label>
                     <div class="flex space-x-2">
                       <div class="w-1/3">
                         <label class="block text-xs font-medium text-scroll-beige/70 mb-1">Mínimo</label>
                         <div class="relative">
                           <span
                             class="absolute left-2 top-1/2 transform -translate-y-1/2 text-candlelight-gold/80 text-sm font-medium"
                           >
                             R$
                           </span>
                           <input
                             type="text"
                             [ngModel]="precoMinimoFormatado()"
                             (ngModelChange)="aplicarMascaraPreco($event, 'min')"
                             (blur)="aplicarFiltroPreco()"
                             placeholder="0,00"
                             class="w-full pl-8 pr-2 py-1 bg-stone-gray/20 border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50 text-sm"
                           />
                         </div>
                       </div>
                       <div class="w-1/3">
                         <label class="block text-xs font-medium text-scroll-beige/70 mb-1">Máximo</label>
                         <div class="relative">
                           <span
                             class="absolute left-2 top-1/2 transform -translate-y-1/2 text-candlelight-gold/80 text-sm font-medium"
                           >
                             R$
                           </span>
                           <input
                             type="text"
                             [ngModel]="precoMaximoFormatado()"
                             (ngModelChange)="aplicarMascaraPreco($event, 'max')"
                             (blur)="aplicarFiltroPreco()"
                             placeholder="0,00"
                             class="w-full pl-8 pr-2 py-1 bg-stone-gray/20 border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50 text-sm"
                           />
                         </div>
                       </div>
                     </div>
                   </div>

                   <!-- Avaliação Mínima -->
                   <div class="mb-4">
                     <label class="block text-sm font-medium text-scroll-beige/80 mb-2">
                       Avaliação Mínima
                     </label>
                     <div class="flex items-center space-x-2">
                       <div class="flex items-center">
                         <svg
                           class="w-4 h-4 text-candlelight-gold"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                         >
                           <path
                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                           />
                         </svg>
                         <span class="ml-1 text-scroll-beige/80">4.0+</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 <!-- Contador de Resultados -->
                 <div class="pt-4 border-t border-brass-accent/20">
                   <p class="text-sm text-scroll-beige/70">
                     {{ produtosFiltrados().length }} produto(s) encontrado(s)
                   </p>
                 </div>
               </div>
             </div>

             <!-- Área Principal dos Produtos (Direita) -->
             <div class="flex-1">
               <!-- Lista de Produtos em Formato Horizontal -->
               <div class="space-y-4">
                 <div
                   *ngFor="let produto of produtosFiltrados(); trackBy: rastrearProduto"
                   class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                 >
                  <div class="flex space-x-6">
                    <!-- Imagem do Produto -->
                    <div class="flex-shrink-0">
                      <div class="relative">
                        <img
                          [src]="produto.imagens[0]"
                          [alt]="produto.titulo"
                          class="w-32 h-32 object-cover rounded-lg"
                        />
                        <div class="absolute top-2 left-2">
                          <span
                            class="bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold px-2 py-1 rounded-full"
                          >
                            {{ produto.categoria }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Informações do Produto -->
                    <div class="flex-1 min-w-0">
                      <div class="space-y-3">
                        <!-- Título e Artesão -->
                        <div>
                          <h3
                            class="text-xl font-semibold text-scroll-beige hover:text-candlelight-gold transition-colors cursor-pointer"
                          >
                            {{ produto.titulo }}
                          </h3>
                          <p class="text-sm text-scroll-beige/60 mt-1">
                            por 
                            <a 
                              [routerLink]="['/loja', getArtesaoDominio(produto.nomeArtesao)]"
                              class="text-candlelight-gold hover:text-candlelight-gold/80 hover:underline transition-all duration-200 cursor-pointer"
                              (click)="$event.stopPropagation()"
                            >
                              {{ produto.nomeArtesao }}
                            </a>
                          </p>
                        </div>

                        <!-- Descrição -->
                        <p class="text-sm text-scroll-beige/70 line-clamp-2">
                          {{ produto.descricao }}
                        </p>

                        <!-- Avaliação e Downloads -->
                        <div class="flex items-center space-x-6 text-sm">
                          <div class="flex items-center space-x-1">
                            <div class="flex items-center">
                              <svg
                                class="w-4 h-4 text-candlelight-gold"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                              </svg>
                              <span class="ml-1 text-scroll-beige/80">{{ produto.avaliacao }}</span>
                              <span class="text-scroll-beige/60"
                                >({{ produto.numeroAvaliacoes }})</span
                              >
                            </div>
                          </div>
                          <div class="flex items-center space-x-1 text-scroll-beige/60">
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            <span>{{ produto.numeroDownloads }} downloads</span>
                          </div>
                          <div class="text-scroll-beige/60">
                            <span class="text-xs">{{ produto.tamanhoArquivo }}</span>
                          </div>
                        </div>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2">
                          <span
                            *ngFor="let tag of produto.tags.slice(0, 3)"
                            class="px-2 py-1 bg-stone-gray/50 text-scroll-beige/70 text-xs rounded-full"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Preço e Ações -->
                    <div class="flex-shrink-0 flex flex-col items-end justify-between">
                      <!-- Preço -->
                      <div class="text-right">
                        <div class="text-2xl font-bold text-scroll-beige">
                          R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}
                        </div>
                        <div class="text-sm text-scroll-beige/60">Download digital</div>
                      </div>

                      <!-- Botões de Ação -->
                      <div class="flex flex-col space-y-2">
                        <button
                          class="px-6 py-3 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-sm"
                        >
                          Adicionar ao Carrinho
                        </button>
                        <button
                          class="px-6 py-2 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-brass-accent/10 transition-colors text-sm"
                        >
                          Favoritar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <!-- Estado Vazio -->
               <div *ngIf="produtosFiltrados().length === 0" class="text-center py-12">
                 <svg
                   class="w-16 h-16 text-scroll-beige/30 mx-auto mb-4"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                 >
                   <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                   />
                 </svg>
                 <h3 class="text-xl font-semibold text-scroll-beige mb-2">
                   Nenhum produto encontrado
                 </h3>
                 <p class="text-scroll-beige/60">Tente ajustar os filtros ou termos de busca.</p>
               </div>

               <!-- Paginação -->
               <div *ngIf="produtosFiltrados().length > 0" class="mt-12 flex justify-center">
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
                     class="px-4 py-2 border border-brass-accent/30 rounded-lg text-scroll-beige hover:bg-candlelight-gold/50 transition-colors"
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
             </div>
           </div>
         </div>
       </section>

      <app-rodape />
    </div>
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
export class PaginaProdutosComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private artesaoService = inject(ArtesaoService);

  // Estados reativos para filtros
  termoBusca = signal('');
  categoriaSelecionada = signal('');
  ordenacaoSelecionada = signal('relevancia');
  paginaAtual = signal(1);
  dropdownOrdenacao = signal(false);

  // Filtros de preço
  precoMinimo = signal<number | null>(null);
  precoMaximo = signal<number | null>(null);

  // Categorias disponíveis
  categorias = Object.values(CategoriaProduto);

  // Opções de ordenação
  opcoesOrdenacao = [
    { value: 'relevancia', label: 'Mais Relevantes' },
    { value: 'preco-menor', label: 'Menor Preço' },
    { value: 'preco-maior', label: 'Maior Preço' },
    { value: 'avaliacao', label: 'Melhor Avaliação' },
    { value: 'downloads', label: 'Mais Downloads' },
    { value: 'recente', label: 'Mais Recentes' },
  ];

  // Signals formatados para exibição
  precoMinimoFormatado = computed(() => {
    const valor = this.precoMinimo();
    return valor ? this.formatarPreco(valor) : '';
  });

  precoMaximoFormatado = computed(() => {
    const valor = this.precoMaximo();
    return valor ? this.formatarPreco(valor) : '';
  });

  // Signal computado que reage automaticamente aos filtros
  produtosFiltrados = computed(() => {
    let produtos = this.produtoService.obterProdutos()();

    // Filtro por termo de busca
    if (this.termoBusca().trim()) {
      produtos = this.produtoService.buscarProdutos(this.termoBusca());
    }

    // Filtro por categoria
    if (this.categoriaSelecionada()) {
      produtos = produtos.filter((produto) => produto.categoria === this.categoriaSelecionada());
    }

    // Filtro por preço
    if (this.precoMinimo() !== null) {
      produtos = produtos.filter((produto) => produto.valorUnitario >= this.precoMinimo()!);
    }

    if (this.precoMaximo() !== null) {
      produtos = produtos.filter((produto) => produto.valorUnitario <= this.precoMaximo()!);
    }

    // Ordenação
    return this.ordenarProdutos(produtos);
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Verificar parâmetros da URL ao inicializar
    this.route.queryParams.subscribe((params) => {
      if (params['pesquisa']) {
        this.termoBusca.set(params['pesquisa']);
      }
      if (params['produto']) {
        // Aqui você pode implementar a lógica para destacar um produto específico
        // Por exemplo, rolar para o produto ou aplicar um filtro especial
      }
    });
  }

  atualizarBusca(termo: string) {
    this.termoBusca.set(termo);
    // Atualizar a URL com o termo de busca
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pesquisa: termo || null },
      queryParamsHandling: 'merge',
    });
  }

  // Métodos para o dropdown de ordenação
  obterTextoOrdenacao(): string {
    const opcao = this.opcoesOrdenacao.find((o) => o.value === this.ordenacaoSelecionada());
    return opcao ? opcao.label : 'Mais Relevantes';
  }

  selecionarOrdenacao(valor: string) {
    this.ordenacaoSelecionada.set(valor);
    this.dropdownOrdenacao.set(false);
  }

  // Métodos para máscara de preço
  aplicarMascaraPreco(valor: string, tipo: 'min' | 'max') {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros === '') {
      if (tipo === 'min') {
        this.precoMinimo.set(null);
      } else {
        this.precoMaximo.set(null);
      }
      return;
    }

    // Converte para centavos e depois para reais
    const valorEmCentavos = parseInt(apenasNumeros);
    const valorEmReais = valorEmCentavos / 100;

    if (tipo === 'min') {
      this.precoMinimo.set(valorEmReais);
    } else {
      this.precoMaximo.set(valorEmReais);
    }
  }

  formatarPreco(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }

  aplicarFiltroPreco() {
    // Este método é chamado quando o usuário sai do campo (blur)
    // Pode ser usado para aplicar filtros adicionais se necessário
    console.log('Filtros de preço aplicados:', {
      min: this.precoMinimo(),
      max: this.precoMaximo(),
    });
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
        return produtos.sort(
          (a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
        );
      default:
        return produtos;
    }
  }

  rastrearProduto(index: number, produto: Produto) {
    return produto.uuid;
  }

  getArtesaoDominio(nomeArtesao: string): string {
    const artesao = this.artesaoService.obterArtesoes()().find(a => a.nome === nomeArtesao);
    return artesao?.dominio || '';
  }
}
