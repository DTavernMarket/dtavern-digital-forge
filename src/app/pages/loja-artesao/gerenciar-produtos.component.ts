import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, OnDestroy, OnInit, signal, effect, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { DialogEditarLojaComponent } from '../../components/dialog-editar-loja/dialog-editar-loja.component';
import { Artesao } from '../../models/artesao.model';
import { Produto } from '../../models/produto.model';
import { ArtesaoService } from '../../services/artesao.service';
import { AuthService } from '../../services/auth.service';
import { OpcaoSelect, SelectCustomizadoComponent } from "../../components/select-customizado/select-customizado.component";
import { CategoriaProdutoService } from '../../services/categoria-produto.service';
@Component({
    selector: 'app-gerenciar-produtos',
    standalone: true,
    imports: [CommonModule, FormsModule, BarraNavegacaoComponent, RouterModule, DialogEditarLojaComponent, SelectCustomizadoComponent],
    template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="true" />

      <!-- Botão flutuante para voltar para a loja -->
      <button
        type="button"
        (click)="voltarParaLoja()"
        class="fixed top-28 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-full bg-candlelight-gold text-tavern-wood font-semibold shadow-lg hover:bg-brass-accent/90 transition-colors"
      >
        Voltar para a loja
      </button>

      <!-- Header da Loja com Fundo do Artesão (z-20 para dropdown ficar acima da barra de abas; sem overflow-hidden para não cortar o dropdown) -->
      <div class="relative z-20 h-96">
        <!-- Imagem de Fundo (overflow-hidden só aqui para não cortar o dropdown do header) -->
        <div
          class="absolute inset-0 overflow-hidden bg-cover bg-center bg-no-repeat"
          [style.background-image]="'url(' + urlImagemHeader() + ')'"
        >
          <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <!-- Conteúdo do Header -->
        <div class="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
          <div class="flex items-end space-x-6">
            <!-- Avatar do Artesão -->
            <div class="relative">
              <img
                [src]="urlImagemPerfil()"
                [alt]="artesao()?.nome"
                class="w-32 h-32 rounded-full border-4 border-candlelight-gold shadow-xl object-cover"
              />
            </div>

            <!-- Informações do Artesão -->
            <div class="text-white">
              <div class="flex items-center gap-3">
                <h1 class="text-4xl font-medieval font-bold">{{ artesao()?.nome }}</h1>
              </div>
              
              <!-- Resumo -->
              <div class="text-scroll-beige/70 mb-2">
                {{ artesao()?.resumo }}
              </div>


              <!-- Estatísticas -->
              <div class="flex items-center space-x-6 text-sm">
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-4 h-4 text-candlelight-gold"
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
                  <span>{{ artesao()?.quantidadeProdutos }} produtos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegação da Loja (z-10 para ficar abaixo do dropdown de configuração do header) -->
      <div class="relative z-10 bg-midnight-brown/80 border-b border-brass-accent/30">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center space-x-8">
              
                Produtos ({{ produtosArtesao().length }})
              
                  
            </div>

            <!-- Botões de Ação -->
            <div class="flex items-center space-x-4">
            @if (isOwner() === true) {
            <button
                (click)="novoProduto()"
                class="px-6 py-2 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-brass-accent/90 transition-colors"
              >
                Novo produto
              </button>
            }

            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <div class="container mx-auto px-4 py-8">
      <!-- Aba de Produtos -->
        <div class="space-y-6">
          <!-- Filtros -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
            
            <app-select-customizado
              [label]="'Categoria'"
              [opcoes]="opcoesCategoria()"
              [valorSelecionado]="categoriaFiltro()"
              (valorMudou)="categoriaFiltro.set($event)"
            />


              <select
                [(ngModel)]="ordenacao"
                class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
              >
                <option value="recentes">Nome (A-Z)</option>
                <option value="preco-menor">Menor preço</option>
                <option value="preco-maior">Maior preço</option>
              </select>
            </div>

            <div class="text-scroll-beige/70">
              {{ produtosFiltrados().length }} produtos encontrados
            </div>
          </div>

          <!-- Grid de Produtos -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              *ngFor="let produto of produtosFiltrados()"
              class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl overflow-hidden hover:border-candlelight-gold/50 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              (click)="verProduto(produto)"
            >
              <!-- Imagem do Produto -->
              <div
                class="relative aspect-square overflow-hidden bg-gradient-to-br from-midnight-brown/40 to-tavern-wood/20"
              >
                <!-- Imagem de Preview ou Placeholder -->
                <div class="w-full h-full">
                  
                @if (produto.midiaPreview?.url) {
                <img
                    [src]="produto.midiaPreview?.url"
                    [alt]="produto.nome"
                    class="w-full h-full object-cover"
                  />
                  } @else {
                  <div
                    class="w-full h-full flex items-center justify-center"
                  >
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
                </div>

                <!-- Badge de Categoria -->
                <div class="absolute top-3 left-3">
                  <span
                    class="px-3 py-1.5 bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold rounded-md shadow-lg backdrop-blur-sm"
                  >
                    {{ produto.categoriaCodigo }}
                  </span>
                </div>

                <!-- Badge Grátis -->
                <div *ngIf="produto.gratuito" class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1.5 bg-green-500/90 text-white text-xs font-semibold rounded-md shadow-lg backdrop-blur-sm"
                  >
                    Grátis
                  </span>
                </div>

                <!-- Badge de Promoção -->
                <div
                  *ngIf="produto.promocaoPorcentagem && produto.promocaoPorcentagem > 0 && !produto.gratuito"
                  class="absolute bottom-3 right-3"
                >
                  <span
                    class="px-3 py-1.5 bg-red-500/90 text-white text-xs font-semibold rounded-md shadow-lg backdrop-blur-sm"
                  >
                    -{{ produto.promocaoPorcentagem }}%
                  </span>
                </div>

                <!-- Ícone de Edição -->
                @if (isOwner()) {
                <button
                  (click)="editarProduto(produto); $event.stopPropagation()"
                  class="absolute top-3 right-3 w-8 h-8 bg-candlelight-gold/90 hover:bg-candlelight-gold text-tavern-wood rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors z-10"
                  title="Editar produto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
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

                <!-- Preço e Botão -->
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
                  <button
                    (click)="$event.stopPropagation()"
                    class="px-5 py-2.5 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 active:scale-95 transition-all text-sm shadow-md hover:shadow-lg"
                  >
                    {{ produto.gratuito ? 'Baixar' : 'Comprar' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensagem quando não há produtos -->
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 class="text-xl font-semibold text-scroll-beige mb-2">Nenhum produto encontrado</h3>
            <p class="text-scroll-beige/70">
              Tente ajustar os filtros ou verifique novamente mais tarde.
            </p>
          </div>
        </div>
      </div>

      <!-- Dialog Editar Loja (visualização dos dados da loja) -->
      @if (mostrarDialogEditarLoja()) {
        <app-dialog-editar-loja [artesao]="artesao()" (fechar)="fecharDialogEditarLoja($event)" />
      }

      <!-- Dialog de Confirmação de Cancelamento -->
      @if (mostrarDialogCancelar()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" (click)="negarCancelarEdicao()">
          <div class="bg-midnight-brown border border-brass-accent/40 rounded-xl p-6 max-w-md w-full mx-4" (click)="$event.stopPropagation()">
            <h3 class="text-xl font-semibold text-scroll-beige mb-4">Cancelar Edição?</h3>
            <p class="text-scroll-beige/80 mb-6">
              Todas as alterações que você fez não serão salvas. Deseja realmente cancelar?
            </p>
            <div class="flex gap-3">
              <button
                (click)="negarCancelarEdicao()"
                class="flex-1 px-4 py-2 bg-tavern-wood/30 border border-brass-accent/40 text-scroll-beige font-semibold rounded-lg hover:bg-tavern-wood/40 transition-colors"
              >
                Não, continuar editando
              </button>
              <button
                (click)="confirmarCancelarEdicao()"
                class="flex-1 px-4 py-2 bg-red-600/20 border-2 border-red-600/50 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 hover:border-red-600 transition-colors"
              >
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      }
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
export class GerenciarProdutosComponent implements AfterViewInit, OnDestroy {

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private artesaoService = inject(ArtesaoService);
    private authService = inject(AuthService);
    private categoriaProdutoService = inject(CategoriaProdutoService);
    opcoesCategoria = signal<OpcaoSelect[]>([]);
    artesao = signal<Artesao | undefined>(undefined);
    produtosArtesao = signal<Produto[]>([]);
    abaAtiva = signal('produtos');
    categoriaFiltro = signal('');
    ordenacao = signal('recentes');
    isOwner = signal(false);
    dominioAtual = signal<string | null>(null);
    descricaoSobre = signal<string | null>(null);
    carregandoSobre = signal<boolean>(false);
    editandoSobre = signal<boolean>(false);
    descricaoSobreEditada = signal<string>('');
    salvandoSobre = signal<boolean>(false);
    mostrarDialogCancelar = signal<boolean>(false);
    mostrarDialogEditarLoja = signal<boolean>(false);
    menuConfiguracaoAberto = signal<boolean>(false);
    urlCopiada = signal<boolean>(false);
    uploadMidiaLoading = signal<boolean>(false);
    uploadMidiaMensagem = signal<string | null>(null);

    @ViewChild('menuConfiguracaoContainer') menuConfiguracaoContainer!: ElementRef;
    @ViewChild('inputFotoLoja') inputFotoLoja!: ElementRef<HTMLInputElement>;
    @ViewChild('inputHeaderLoja') inputHeaderLoja!: ElementRef<HTMLInputElement>;

    private readonly CDN_BASE = 'http://localhost:8080';
    private readonly IMAGEM_PADRAO = this.CDN_BASE + '/cdn/default.png';

    /** URL da imagem de perfil da loja (caminho do backend ou padrão). */
    urlImagemPerfil = computed(() =>
        this.resolverUrlImagem(this.artesao()?.caminhoImagemPerfil)
    );
    /** URL da imagem de header da loja (caminho do backend ou padrão). */
    urlImagemHeader = computed(() =>
        this.resolverUrlImagem(this.artesao()?.caminhoImagemHeader)
    );

    private resolverUrlImagem(caminho: string | undefined): string {
        if (!caminho?.trim()) return this.IMAGEM_PADRAO;
        if (caminho.startsWith('http://') || caminho.startsWith('https://')) return caminho;
        return caminho.startsWith('/') ? this.CDN_BASE + caminho : this.CDN_BASE + '/' + caminho;
    }

    produtosFiltrados = computed(() => {
        let produtos = this.produtosArtesao();

        // Filtrar por categoria
        if (this.categoriaFiltro()) {
            produtos = produtos.filter((p) => p.categoriaCodigo === this.categoriaFiltro());
        }

        // Ordenar
        switch (this.ordenacao()) {
            case 'preco-menor':
                produtos = produtos.sort((a, b) => {
                    const precoBaseA = a.valorPromocional ?? a.valorUnitario;
                    const precoBaseB = b.valorPromocional ?? b.valorUnitario;
                    const precoA = a.gratuito ? 0 : precoBaseA;
                    const precoB = b.gratuito ? 0 : precoBaseB;
                    return precoA - precoB;
                });
                break;
            case 'preco-maior':
                produtos = produtos.sort((a, b) => {
                    const precoBaseA = a.valorPromocional ?? a.valorUnitario;
                    const precoBaseB = b.valorPromocional ?? b.valorUnitario;
                    const precoA = a.gratuito ? 0 : precoBaseA;
                    const precoB = b.gratuito ? 0 : precoBaseB;
                    return precoB - precoA;
                });
                break;
            case 'recentes':
            case 'avaliacao':
            case 'popularidade':
            default:
                // Ordenação padrão por nome
                produtos = produtos.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
        }

        console.log('produtosFiltrados', produtos);
        return produtos;
    });

    constructor() {
        // Effect para carregar dados da aba "sobre" quando ela for ativada
        effect(() => {
            const aba = this.abaAtiva();
            const dominio = this.dominioAtual();

            if (aba === 'sobre' && dominio) {
                this.carregarSobre(dominio);
                this.carregarCategorias();
            }
        });
    }

    private carregarCategorias() {
        this.categoriaProdutoService.buscarCategorias().subscribe({
            next: (categorias) => {
                this.opcoesCategoria.set(categorias.map(categoria => ({ value: categoria.codigo, label: categoria.nome })));
            },
        });
    }

    ngOnDestroy(): void {
        sessionStorage.removeItem('userInfo');
    }

    private carregarSobre(dominio: string) {
        this.carregandoSobre.set(true);
        this.artesaoService.buscarSobreLoja(dominio).subscribe({
            next: (response) => {
                this.descricaoSobre.set(response.descricaoSobre);
                this.carregandoSobre.set(false);
            },
            error: (error) => {
                console.error('Erro ao carregar informações sobre a loja:', error);
                this.descricaoSobre.set(null);
                this.carregandoSobre.set(false);
            }
        });
    }

    iniciarEdicaoSobre() {
        this.descricaoSobreEditada.set(this.descricaoSobre() || '');
        this.editandoSobre.set(true);
    }

    onTextareaInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        if (target.value.length <= 5000) {
            this.descricaoSobreEditada.set(target.value);
        } else {
            target.value = this.descricaoSobreEditada();
        }
    }

    cancelarEdicaoSobre() {
        this.mostrarDialogCancelar.set(true);
    }

    confirmarCancelarEdicao() {
        this.mostrarDialogCancelar.set(false);
        this.editandoSobre.set(false);
        this.descricaoSobreEditada.set('');
    }

    negarCancelarEdicao() {
        this.mostrarDialogCancelar.set(false);
    }

    abrirDialogEditarLoja() {
        this.mostrarDialogEditarLoja.set(true);
    }

    fecharDialogEditarLoja(event?: { recarregar?: boolean } | void) {
        const payload = event as { recarregar?: boolean } | undefined;
        if (payload?.recarregar) {
            window.location.reload();
        }
        this.mostrarDialogEditarLoja.set(false);
    }

    ngAfterViewInit() {
        // Observar parâmetros da rota pai (dominio)
        this.route.params.subscribe((params) => {
            const dominio = params['dominio'];

            if (dominio) {
                this.dominioAtual.set(dominio);
                this.carregarArtesao(dominio);
                this.verificarDonoLoja(dominio);

            }
        });
    }

    private async verificarDonoLoja(dominio: string) {
        // Verificar se há token disponível (mais confiável que isAuthenticated)
        this.authService.getCurrentToken().subscribe((token) => {
            if (token) {
                this.artesaoService.verifyOwner(dominio).subscribe({
                    next: (isOwner) => {
                        this.isOwner.set(isOwner);
                    },
                });
            }
        });
    }

    private carregarArtesao(dominio: string) {
        this.artesaoService.buscarLojaPorDominio(dominio).subscribe({
            next: (lojaResponse) => {
                // Converter LojaResponse para Artesao com valores padrão para campos não disponíveis
                const artesao: Artesao = {
                    dominio: lojaResponse.dominio,
                    nome: lojaResponse.nome,
                    resumo: lojaResponse.resumo,
                    descricao: lojaResponse.descricao,
                    caminhoImagemPerfil: lojaResponse.caminhoImagemPerfil,
                    caminhoImagemHeader: lojaResponse.caminhoImagemHeader,
                    especialidades: lojaResponse.especialidades,
                    quantidadeProdutos: lojaResponse.quantidadeProdutos,
                };
                this.artesao.set(artesao);
                this.carregarProdutosPorDominio(dominio);
            },
            error: (error) => {
                console.error('Erro ao carregar artesão:', error);
                // Redirecionar para página não encontrada
                this.router.navigate(['/404']);
            },
        });
    }

    editarProduto(produto: Produto) {
        // Salvar o domínio da loja atual no sessionStorage
        const dominioAtual = this.artesao()?.dominio;
        if (dominioAtual) {
            sessionStorage.setItem('lojaDominio', dominioAtual);
        }
        // Navegar para o formulário de edição com o nome normalizado do produto
        this.router.navigate(['/editar-produto'], {
            queryParams: { produto: produto.nomeNormalizado }
        });
    }

    private carregarProdutosPorDominio(dominio: string) {
        this.artesaoService.listarTodosProdutosLoja(dominio).subscribe({
            next: (produtos) => {
                this.produtosArtesao.set(produtos);
            },
            error: (error) => {
                console.error('Erro ao carregar produtos:', error);
                this.produtosArtesao.set([]);
            },
        });
    }

    voltarParaLoja() {
        const dominio = this.dominioAtual() || this.artesao()?.dominio || this.route.snapshot.params['dominio'];
        if (dominio) {
            this.router.navigate(['/lojas', dominio], { queryParams: { aba: 'produtos' } });
        } else {
            this.router.navigate(['/']);
        }
    }

    verProduto(produto: Produto) {
        // Navegar para página de detalhes do produto usando nomeNormalizado
        this.router.navigate(['/produtos', produto.nomeNormalizado]);
    }

    getYouTubeUrl(youtubeHandle?: string): string {
        if (!youtubeHandle) return '#';
        return (
            'https://youtube.com/@' + youtubeHandle.replace('@', '').toLowerCase().replace(/\s+/g, '')
        );
    }

    novoProduto() {
        // Salvar o domínio da loja atual no sessionStorage
        const dominioAtual = this.artesao()?.dominio;
        if (dominioAtual) {
            sessionStorage.setItem('lojaDominio', dominioAtual);
        }
        this.router.navigate(['/novo-produto']);
    }

    /**
     * Copia a URL atual da loja para a área de transferência.
     */
    copiarUrlLoja(): void {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.urlCopiada.set(true);
            setTimeout(() => this.urlCopiada.set(false), 2000);
        }).catch(() => {
            console.error('Falha ao copiar URL.');
        });
    }

    @HostListener('document:click', ['$event'])
    fecharMenuConfiguracaoAoClicarFora(event: Event) {
        if (this.menuConfiguracaoContainer && this.menuConfiguracaoAberto()) {
            const target = event.target as HTMLElement;
            if (!this.menuConfiguracaoContainer.nativeElement.contains(target)) {
                this.menuConfiguracaoAberto.set(false);
            }
        }
    }
}
