import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ClienteService } from '../../services/cliente.service';
import { Produto } from '../../models/produto.model';

@Component({
    selector: 'app-biblioteca',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
    template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown font-body">
      <app-barra-navegacao [isFixed]="false" />

      <!-- Layout Principal -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <!-- Título da Página -->
          <div class="mb-8">
            <h1 class="text-3xl font-medieval font-bold text-scroll-beige mb-2">Minha Biblioteca</h1>
            <p class="text-scroll-beige/70">Produtos que você comprou e adicionou à sua biblioteca</p>
          </div>

          <!-- Barra de Busca -->
          <div class="mb-6">
            <div class="relative max-w-md flex gap-2">
              <div class="relative flex-1">
                <input
                  type="text"
                  [(ngModel)]="termoBusca"
                  (keyup.enter)="buscarProdutos()"
                  placeholder="Buscar na biblioteca..."
                  class="w-full px-4 py-3 pl-10 bg-tavern-wood/20 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50 focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50"
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
              <button
                (click)="buscarProdutos()"
                class="px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors"
              >
                Buscar
              </button>
            </div>
          </div>

          <!-- Loading -->
          @if (carregando()) {
            <div class="flex justify-center items-center py-20">
              <svg
                class="animate-spin h-8 w-8 text-candlelight-gold"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          }

          <!-- Grid de Produtos -->
          @if (!carregando() && produtos().length > 0) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              @for (produto of produtos(); track produto.nomeNormalizado) {
                <div
                  [routerLink]="['/produtos', produto.nomeNormalizado]"
                  class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl overflow-hidden hover:border-candlelight-gold/50 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <!-- Imagem do Produto -->
                  <div
                    class="relative aspect-square overflow-hidden bg-gradient-to-br from-midnight-brown/40 to-tavern-wood/20"
                  >
                    @if (produto.midiaPreview?.url) {
                      <img
                        [src]="produto.midiaPreview?.url || ''"
                        [alt]="produto.nome"
                        class="w-full h-full object-cover"
                      />
                    } @else {
                      <div class="w-full h-full flex items-center justify-center">
                        <svg
                          class="w-20 h-20 text-scroll-beige/20 group-hover:text-scroll-beige/30 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    }

                    <!-- Badge de Categoria -->
                    <div class="absolute top-3 left-3">
                      <span
                        class="px-3 py-1.5 bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold rounded-md shadow-lg backdrop-blur-sm"
                      >
                        {{ produto.categoriaCodigo }}
                      </span>
                    </div>

                    <!-- Badge Grátis -->
                    @if (produto.gratuito) {
                      <div class="absolute top-3 right-3">
                        <span
                          class="px-3 py-1.5 bg-green-500/90 text-white text-xs font-semibold rounded-md shadow-lg backdrop-blur-sm"
                        >
                          Grátis
                        </span>
                      </div>
                    }
                  </div>

                  <!-- Informações do Produto -->
                  <div class="p-5 space-y-3">
                    <!-- Nome do Produto -->
                    <h3
                      class="font-semibold text-scroll-beige text-lg group-hover:text-candlelight-gold transition-colors line-clamp-2 min-h-[3.5rem]"
                    >
                      {{ produto.nome }}
                    </h3>

                    <!-- Resumo/Descrição -->
                    <p class="text-scroll-beige/70 text-sm line-clamp-3 min-h-[4rem]">
                      {{ produto.descricao.substring(0, 100) }}...
                    </p>

                    <!-- Preço -->
                    <div class="flex items-center justify-between pt-2 border-t border-brass-accent/20">
                      <div class="flex flex-col">
                        @if (produto.gratuito) {
                          <span class="text-candlelight-gold font-bold text-xl">
                            Grátis
                          </span>
                        } @else {
                          <div class="flex items-baseline gap-2">
                            <span class="text-candlelight-gold font-bold text-xl">
                              R$
                              {{
                                (produto.valorPromocional != null
                                  ? produto.valorPromocional
                                  : produto.valorUnitario
                                )
                                  .toFixed(2)
                                  .replace('.', ',')
                              }}
                            </span>
                            @if (produto.promocaoPorcentagem && produto.promocaoPorcentagem > 0 && produto.valorPromocional != null) {
                              <span
                                class="text-scroll-beige/50 text-sm line-through"
                              >
                                R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}
                              </span>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Paginação -->
            @if (totalPages() > 1) {
              <div class="mt-8 flex justify-center items-center gap-4">
                <button
                  (click)="irParaPagina(paginaAtual() - 1)"
                  [disabled]="paginaAtual() === 0"
                  class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <span class="text-scroll-beige/70">
                  Página {{ paginaAtual() + 1 }} de {{ totalPages() }}
                </span>
                <button
                  (click)="irParaPagina(paginaAtual() + 1)"
                  [disabled]="paginaAtual() >= totalPages() - 1"
                  class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            }
          }

          <!-- Mensagem quando não há produtos -->
          @if (!carregando() && produtos().length === 0) {
            <div class="text-center py-12">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 class="text-xl font-semibold text-scroll-beige mb-2">Sua biblioteca está vazia</h3>
              <p class="text-scroll-beige/70">
                @if (termoBusca) {
                  Nenhum produto encontrado com esse termo de busca.
                } @else {
                  Você ainda não comprou nenhum produto. Explore nossa loja e adicione produtos à sua biblioteca!
                }
              </p>
            </div>
          }
        </div>
      </section>

      <app-rodape />
    </div>
  `,
})
export class BibliotecaComponent implements OnInit {
    private clienteService = inject(ClienteService);

    produtos = signal<Produto[]>([]);
    carregando = signal<boolean>(true);
    termoBusca = '';
    paginaAtual = signal<number>(0);
    totalPages = signal<number>(0);
    totalElements = signal<number>(0);
    tamanhoPagina = 12;

    ngOnInit(): void {
        this.buscarProdutos();
    }

    buscarProdutos(): void {
        this.carregando.set(true);
        this.paginaAtual.set(0); // Resetar para primeira página ao buscar

        this.clienteService
            .getBibliotecaCliente(0, this.tamanhoPagina, this.termoBusca || undefined)
            .subscribe({
                next: (resultado) => {

                    if (resultado) {
                        this.produtos.set(resultado.content);
                        this.totalPages.set(resultado.totalPages);
                        this.totalElements.set(resultado.totalElements);
                        this.carregando.set(false);
                    }
                },
                error: (error) => {
                    console.error('Erro ao carregar biblioteca:', error);
                    this.produtos.set([]);
                    this.carregando.set(false);
                },
            });
    }

    irParaPagina(pagina: number): void {
        if (pagina < 0 || pagina >= this.totalPages()) {
            return;
        }

        this.carregando.set(true);
        this.paginaAtual.set(pagina);

        this.clienteService
            .getBibliotecaCliente(pagina, this.tamanhoPagina, this.termoBusca || undefined)
            .subscribe({
                next: (resultado) => {
                    this.produtos.set(resultado.content);
                    this.totalPages.set(resultado.totalPages);
                    this.totalElements.set(resultado.totalElements);
                    this.carregando.set(false);
                },
                error: (error) => {
                    console.error('Erro ao carregar biblioteca:', error);
                    this.produtos.set([]);
                    this.carregando.set(false);
                },
            });
    }
}

