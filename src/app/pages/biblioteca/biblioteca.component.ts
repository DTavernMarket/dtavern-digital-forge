import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { Venda } from '../../models/venda.model';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-biblioteca',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
    template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown font-body flex flex-col">
      <app-barra-navegacao [isFixed]="false" />

      <!-- Layout Principal -->
      <section class="py-8 flex-1">
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
                  class="w-full px-4 py-3 pl-10 bg-tavern-wood/20 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50"
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

          <!-- Lista de Produtos em Formato Horizontal -->
          @if (!carregando() && biblioteca().length > 0) {
            <div class="space-y-4">
              @for (item of biblioteca(); track item.produto.nomeNormalizado) {
                <div
                  class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div class="flex space-x-6">
                    <!-- Imagem do Produto -->
                    <div class="flex-shrink-0">
                      <div class="relative w-32 h-32 bg-tavern-wood/20 rounded-lg overflow-hidden">
                        @if (item.produto.midiaPreview?.url) {
                          <img
                            [src]="item.produto.midiaPreview?.url || ''"
                            [alt]="item.produto.nome"
                            class="w-full h-full object-cover"
                          />
                        } @else {
                          <div class="w-full h-full flex items-center justify-center">
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
                        }
                        <!-- Badge de Categoria -->
                        <div class="absolute top-2 left-2">
                          <span
                            class="bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold px-2 py-1 rounded-full"
                          >
                            {{ item.produto.categoriaCodigo }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Informações do Produto -->
                    <div class="flex-1 min-w-0">
                      <div class="space-y-3">
                        <!-- Nome do Produto -->
                        <div>
                          <h3
                            [routerLink]="['/produtos', item.produto.nomeNormalizado]"
                            class="text-xl font-semibold text-scroll-beige hover:text-candlelight-gold transition-colors cursor-pointer inline-block"
                          >
                            {{ item.produto.nome }}
                          </h3>
                        </div>

                        <!-- Descrição -->
                        <p class="text-sm text-scroll-beige/70 line-clamp-2">
                          {{ item.produto.descricao.substring(0, 100) || '' }}...
                        </p>

                        <!-- Nome da Loja -->
                        @if (item.produto.nomeLoja && item.produto.dominioLoja) {
                          <div class="pt-1">
                            <p class="text-sm text-scroll-beige/60">
                              por
                              <a
                                [routerLink]="['/lojas', item.produto.dominioLoja]"
                                class="text-candlelight-gold hover:text-candlelight-gold/80 hover:underline transition-all duration-200 cursor-pointer"
                                (click)="$event.stopPropagation()"
                              >
                                {{ item.produto.nomeLoja }}
                              </a>
                            </p>
                          </div>
                        }

                        <!-- Data de Compra -->
                        <div class="pt-1">
                          <p class="text-xs text-scroll-beige/60">
                            Comprado em {{ formatarData(item.dataCompra) }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Botão de Download -->
                    <div class="flex-shrink-0 flex items-center">
                      <button
                        (click)="onDownload($event, item); $event.stopPropagation()"
                        [disabled]="baixando(item.produto.nomeNormalizado)"
                        class="px-6 py-3 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {{ baixando(item.produto.nomeNormalizado) ? 'Baixando...' : 'Download' }}
                      </button>
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
          @if (!carregando() && biblioteca().length === 0) {
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
export class BibliotecaComponent implements OnInit {
    private clienteService = inject(ClienteService);
    private produtoService = inject(ProdutoService);

    biblioteca = signal<Venda[]>([]);
    carregando = signal<boolean>(true);
    termoBusca = '';
    paginaAtual = signal<number>(0);
    totalPages = signal<number>(0);
    totalElements = signal<number>(0);
    tamanhoPagina = 12;
    produtosBaixando = signal<Set<string>>(new Set());

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
                        this.biblioteca.set(resultado.content);
                        this.totalPages.set(resultado.totalPages);
                        this.totalElements.set(resultado.totalElements);
                        this.carregando.set(false);
                    }
                },
                error: (error) => {
                    console.error('Erro ao carregar biblioteca:', error);
                    this.biblioteca.set([]);
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
                    if (resultado) {
                        this.biblioteca.set(resultado.content);
                        this.totalPages.set(resultado.totalPages);
                        this.totalElements.set(resultado.totalElements);
                        this.carregando.set(false);
                    }
                },
                error: (error) => {
                    console.error('Erro ao carregar biblioteca:', error);
                    this.biblioteca.set([]);
                    this.carregando.set(false);
                },
            });
    }

    formatarData(data: Date | string): string {
        const dataObj = typeof data === 'string' ? new Date(data) : data;
        return dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    async onDownload($event: Event, venda: Venda): Promise<void> {
        console.log('onDownload', venda);

        if (!venda || !venda.produto) {
            console.error('Venda ou produto não encontrado', venda);
            alert('Erro: não foi possível identificar o produto para download.');
            return;
        }

        const nomeNormalizado = venda.produto.nomeNormalizado;

        if (!nomeNormalizado) {
            console.error('Nome normalizado do produto não encontrado');
            alert('Erro: não foi possível identificar o produto para download.');
            return;
        }

        // Adicionar produto à lista de downloads em andamento
        this.produtosBaixando.update(set => {
            const newSet = new Set(set);
            newSet.add(nomeNormalizado);
            return newSet;
        });

        try {
            const blob = await firstValueFrom(
                this.produtoService.downloadMidiaConteudoProdutoCliente(nomeNormalizado)
            );

            // Criar URL temporária para o blob
            const url = window.URL.createObjectURL(blob);

            // Usar nome normalizado como nome de arquivo padrão
            const nomeArquivo = `${venda.produto.nomeNormalizado}-conteudo`;

            // Criar elemento <a> temporário para fazer o download
            const link = document.createElement('a');
            link.href = url;
            link.download = nomeArquivo;
            document.body.appendChild(link);
            link.click();

            // Limpar
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao baixar arquivo de conteúdo:', error);
            alert('Erro ao baixar o arquivo. Verifique se você tem permissão para baixar este produto.');
        } finally {
            // Remover produto da lista de downloads em andamento
            this.produtosBaixando.update(set => {
                const newSet = new Set(set);
                newSet.delete(nomeNormalizado);
                return newSet;
            });
        }
    }

    baixando(nomeNormalizado: string): boolean {
        return this.produtosBaixando().has(nomeNormalizado);
    }
}

