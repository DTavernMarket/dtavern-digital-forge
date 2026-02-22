import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ArtesaoService } from '../../services/artesao.service';
import { LojaMaisVendas } from '../../models/artesao.model';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao [isFixed]="false" />

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
                       placeholder="Buscar artesãos..."
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

                 <!-- Contador de Resultados -->
                 <div class="pt-4 border-t border-brass-accent/20">
                   <p class="text-sm text-scroll-beige/70">
                     {{ artesoesFiltrados().length }} artesãos encontrados
                   </p>
                 </div>
               </div>
             </div>

             <!-- Área Principal dos Artesãos (Direita) -->
             <div class="flex-1">
               <!-- Lista de Artesãos em Formato Horizontal -->
               <div class="space-y-4">
                 <div
                   *ngFor="let artesao of artesoesFiltrados(); trackBy: rastrearArtesao"
                   class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                   [routerLink]="['/lojas', artesao.dominioLoja]"
                 >
                  <div class="flex space-x-6">
                    <!-- Ícone do Artesão -->
                    <div class="flex-shrink-0">
                      <div class="relative w-32 h-32 bg-tavern-wood/20 rounded-lg overflow-hidden flex items-center justify-center">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div class="absolute top-2 right-2">
                          <span
                            class="bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold px-2 py-1 rounded-full"
                          >
                            {{ artesao.qtdVendas }} venda(s)
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Informações do Artesão -->
                    <div class="flex-1 min-w-0">
                      <div class="space-y-3">
                        <!-- Nome -->
                        <div>
                          <h3
                            class="text-xl font-semibold text-scroll-beige hover:text-candlelight-gold transition-colors"
                          >
                            {{ artesao.nomeLoja }}
                          </h3>
                        </div>

                        <!-- Descrição -->
                        <p class="text-sm text-scroll-beige/70 line-clamp-2">
                          {{ artesao.descricaoLoja || 'Sem descrição disponível' }}
                        </p>

                        <!-- Domínio -->
                        <div class="pt-1">
                          <p class="text-sm text-scroll-beige/60">
                            @{{ artesao.dominioLoja }}
                          </p>
                        </div>

                      </div>
                    </div>

                    <!-- Informações de Vendas -->
                    <div class="flex-shrink-0 flex flex-col items-end justify-center">
                      <div class="text-right">
                        <div class="text-sm text-scroll-beige/60 mb-1">Total de vendas</div>
                        <div class="text-2xl font-bold text-candlelight-gold">
                          {{ artesao.qtdVendas }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <!-- Estado Vazio -->
               <div *ngIf="artesoesFiltrados().length === 0" class="text-center py-12">
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
                   Nenhum artesão encontrado
                 </h3>
                 <p class="text-scroll-beige/60">Tente ajustar os termos de busca.</p>
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
  private artesaoService = inject(ArtesaoService);
  private artesoes = signal<LojaMaisVendas[]>([]);
  private resultadoPaginado = signal<any>(null);

  // Computed para artesãos filtrados
  artesoesFiltrados = computed(() => {
    let artesoes = this.artesoes();
    const termo = this.termoBusca().toLowerCase().trim();

    // Filtrar por termo de busca
    if (termo) {
      artesoes = artesoes.filter((a) =>
        a.nomeLoja.toLowerCase().includes(termo) ||
        a.descricaoLoja.toLowerCase().includes(termo) ||
        a.dominioLoja.toLowerCase().includes(termo)
      );
    }

    // Ordenar
    switch (this.ordenacaoSelecionada()) {
      case 'vendas-maior':
        artesoes = artesoes.sort((a, b) => b.qtdVendas - a.qtdVendas);
        break;
      case 'vendas-menor':
        artesoes = artesoes.sort((a, b) => a.qtdVendas - b.qtdVendas);
        break;
      case 'nome-asc':
        artesoes = artesoes.sort((a, b) => a.nomeLoja.localeCompare(b.nomeLoja));
        break;
      case 'nome-desc':
        artesoes = artesoes.sort((a, b) => b.nomeLoja.localeCompare(a.nomeLoja));
        break;
      case 'relevancia':
      default:
        // Por padrão, manter a ordem do backend (mais vendas primeiro)
        artesoes = artesoes.sort((a, b) => b.qtdVendas - a.qtdVendas);
        break;
    }

    return artesoes;
  });

  rastrearArtesao(index: number, artesao: LojaMaisVendas) {
    return artesao.idLoja || artesao.dominioLoja;
  }

  // Estados reativos para filtros
  termoBusca = signal('');
  ordenacaoSelecionada = signal('relevancia');
  paginaAtual = signal(1);
  dropdownOrdenacao = signal(false);

  // Opções de ordenação
  opcoesOrdenacao = [
    { value: 'relevancia', label: 'Mais Relevantes' },
    { value: 'vendas-maior', label: 'Mais Vendas' },
    { value: 'vendas-menor', label: 'Menos Vendas' },
    { value: 'nome-asc', label: 'Nome (A-Z)' },
    { value: 'nome-desc', label: 'Nome (Z-A)' },
  ];


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Verificar parâmetros da URL ao inicializar
    this.route.queryParams.subscribe((params) => {
      if (params['pesquisa']) {
        this.termoBusca.set(params['pesquisa']);
      }
    });
    this.carregarArtesoes();
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

  private carregarArtesoes() {
    this.artesaoService.buscarLojasMaisVendas().subscribe({
      next: (resultado) => {
        this.resultadoPaginado.set(resultado);
        this.artesoes.set(resultado.content);
      },
      error: (error) => {
        console.error('Erro ao carregar artesãos:', error);
        this.artesoes.set([]);
      }
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

}
