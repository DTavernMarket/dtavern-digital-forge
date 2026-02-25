import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { AuthService } from '../../services/auth.service';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';
import { PagamentoPixResponse } from '../../models/pagamento.model';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule, BarraNavegacaoComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown font-body">
      <app-barra-navegacao [isFixed]="true" />

      <div class="container mx-auto px-4 pt-28 pb-12">
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
        } @else if (erro()) {
          <div class="bg-midnight-brown/80 border border-red-500/40 rounded-xl p-6 text-center">
            <h1 class="text-2xl font-semibold text-scroll-beige mb-2">
              Ops, não encontramos esse produto
            </h1>
            <p class="text-scroll-beige/70 mb-4">
              {{ erro() }}
            </p>
          </div>
        } @else if (produto) {
          <!-- Navegação (Breadcrumb) -->
          <div class="mb-6">
            <nav class="text-sm text-scroll-beige/70">
              @if (produto.nomeLoja && produto.dominioLoja) {
                <a
                  [routerLink]="['/lojas', produto.dominioLoja]"
                  class="text-candlelight-gold hover:text-candlelight-gold/80 hover:underline transition-colors"
                >
                  {{ produto.nomeLoja }}
                </a>
                <span class="mx-2">></span>
              }
              <span>{{ produto.categoriaCodigo }}</span>
              <span class="mx-2">></span>
              <span class="text-scroll-beige">{{ produto.nome }}</span>
            </nav>
          </div>

          <!-- Layout: Container principal com imagem e detalhes -->
          <div class="flex flex-col lg:flex-row gap-10 items-center">
            <!-- 1) Imagem - ~45% -->
            <div class="w-full lg:w-[45%] flex justify-center bg-midnight-brown/90 rounded-lg border border-brass-accent/40">
              @if (produto.midiaPreview?.url) {
                <img
                  [src]="produto.midiaPreview?.url"
                  [alt]="produto.nome"
                  class="max-h-[640px] w-auto object-contain"
                />
              } @else {
                <div class="flex flex-col items-center justify-center text-scroll-beige/40">
                  <svg
                    class="w-24 h-24 mb-4"
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
                  <p class="text-sm">Este produto ainda não possui imagem de capa.</p>
                </div>
              }
            </div>

            <!-- 2) Título + info da loja + resumo (200 caracteres) + preço/botão - ~55% -->
            <div class="w-full lg:w-[55%] space-y-4">
              <h1 class="text-2xl md:text-3xl font-medieval font-bold text-scroll-beige">
                {{ produto.nome }}
              </h1>

              @if (produto.nomeLoja && produto.dominioLoja) {
                <p class="text-sm text-scroll-beige/70">
                  Criado por
                  <a
                    [routerLink]="['/lojas', produto.dominioLoja]"
                    class="text-candlelight-gold hover:text-candlelight-gold/80 hover:underline transition-colors cursor-pointer"
                  >
                    {{ produto.nomeLoja }}
                  </a>
                </p>
              }

              <p class="text-lg text-scroll-beige/80 leading-relaxed">
                {{
                  (produto.descricao || '').substring(0, 200)
                }}
                <span *ngIf="(produto.descricao || '').length > 200">...</span>
              </p>

              <!-- Preço + Promoção + Botão (abaixo do resumo de 200 caracteres) -->
              <div class="space-y-4 pt-4">
                <div class="space-y-2">
                  @if (produto.gratuito) {
                    <p class="text-sm text-scroll-beige/70">Produto digital</p>
                    <div class="text-3xl font-bold text-green-500">Grátis</div>
                  } @else {
                    <p class="text-sm text-scroll-beige/70">Preço</p>
                    <div class="flex items-baseline gap-3 flex-wrap">
                      <span class="text-3xl font-bold text-scroll-beige">
                        R$
                        {{
                          (produto.valorPromocional != null
                            ? produto.valorPromocional
                            : produto.valorUnitario
                          )
                            ?.toFixed(2)
                            ?.replace('.', ',')
                        }}
                      </span>

                      @if (produto.promocaoPorcentagem && produto.promocaoPorcentagem > 0 && produto.valorPromocional != null) {
                        <span class="text-scroll-beige/60 line-through text-lg">
                          R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}
                        </span>
                        <span
                          class="px-2 py-1 rounded-full bg-red-600/90 text-white text-xs font-semibold"
                        >
                          -{{ produto.promocaoPorcentagem }}%
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="space-y-2">
                  <button
                    (click)="onComprarProduto()"
                    [disabled]="comprando()"
                    class="w-full py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ comprando() ? 'Processando...' : (produto.gratuito ? 'Adicionar a biblioteca' : 'Comprar com Pix') }}
                  </button>
                  @if (mensagemCompra()) {
                    <p class="text-xs" [class.text-green-400]="compraSucesso()" [class.text-red-400]="!compraSucesso()">
                      {{ mensagemCompra() }}
                    </p>
                  }
                  <p class="text-xs text-scroll-beige/60">
                    * Integração com carrinho/pagamento será adicionada em breve.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Descrição Completa (abaixo das 2 colunas) -->
          <div class="mt-10">
            <h2 class="text-xl font-semibold text-scroll-beige mb-3">Descrição do produto</h2>
            <p class="text-scroll-beige/80 leading-relaxed whitespace-pre-line">
              {{ produto.descricao || 'Nenhuma descrição disponível para este produto.' }}
            </p>
          </div>
        }
      </div>
    </div>

    <!-- Dialog de Pagamento PIX -->
    @if (mostrarDialogPix()) {
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" (click)="fecharDialogPix()">
        <div class="bg-midnight-brown border border-brass-accent/40 rounded-xl p-6 max-w-md w-full shadow-2xl" (click)="$event.stopPropagation()">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-scroll-beige">Pagamento PIX</h2>
            <button
              (click)="fecharDialogPix()"
              class="text-scroll-beige/70 hover:text-scroll-beige transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <!-- Valor -->
            <div class="text-center">
              <p class="text-sm text-scroll-beige/70 mb-1">Valor a pagar</p>
              <p class="text-2xl font-bold text-candlelight-gold">R$ {{ pagamentoPix()?.amount || '0,00' }}</p>
            </div>

            <!-- Contador Regressivo -->
            <div class="text-center">
              <p class="text-sm text-scroll-beige/70 mb-1">Tempo restante</p>
              <p class="text-xl font-semibold" [class.text-red-400]="tempoRestante() <= 60" [class.text-scroll-beige]="tempoRestante() > 60">
                {{ formatarTempoRestante() }}
              </p>
            </div>

            <!-- QR Code -->
            @if (pagamentoPix()?.qrCodeBase64) {
              <div class="flex justify-center bg-white p-4 rounded-lg">
                <img
                  [src]="'data:image/png;base64,' + pagamentoPix()!.qrCodeBase64"
                  alt="QR Code PIX"
                  class="max-w-full h-auto"
                />
              </div>
            }

            <!-- Código PIX Literal -->
            @if (pagamentoPix()?.qrCode) {
              <div class="space-y-2">
                <p class="text-sm text-scroll-beige/70">Código PIX (copiar e colar)</p>
                <div class="bg-tavern-wood/30 border border-brass-accent/20 rounded-lg p-3">
                  <p class="text-xs text-scroll-beige break-all font-mono select-all">
                    {{ pagamentoPix()!.qrCode }}
                  </p>
                </div>
                <button
                  (click)="copiarCodigoPix()"
                  class="w-full py-2 bg-candlelight-gold/80 text-tavern-wood font-medium rounded-lg hover:bg-candlelight-gold transition-colors text-sm"
                >
                  {{ codigoCopiado() ? 'Código copiado!' : 'Copiar código PIX' }}
                </button>
              </div>
            }

            <p class="text-xs text-center text-scroll-beige/60">
              Escaneie o QR code ou copie o código PIX para realizar o pagamento
            </p>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProdutoDetalheComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private produtoService = inject(ProdutoService);

  produto: Produto | null = null;
  carregando = signal<boolean>(true);
  erro = signal<string | null>(null);
  comprando = signal<boolean>(false);
  mensagemCompra = signal<string | null>(null);
  compraSucesso = signal<boolean>(false);
  
  // Dialog PIX
  mostrarDialogPix = signal<boolean>(false);
  pagamentoPix = signal<PagamentoPixResponse | null>(null);
  tempoRestante = signal<number>(0);
  codigoCopiado = signal<boolean>(false);
  private intervaloContador: any = null;

  ngOnInit(): void {
    const nomeParam = this.route.snapshot.paramMap.get('nomeNormalizado');
    const nomeQuery = this.route.snapshot.queryParamMap.get('produto');
    const identificador = nomeParam || nomeQuery;

    if (!identificador) {
      this.carregando.set(false);
      this.erro.set('Nenhum produto foi especificado para visualização.');
      return;
    }

    this.produtoService.buscarProdutoPorNomeNormalizado(identificador).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.carregando.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar produto para visualização:', error);
        this.erro.set('Erro ao carregar informações do produto. Tente novamente mais tarde.');
        this.carregando.set(false);
      },
    });
  }

  onComprarProduto() {
    if (!this.produto) {
      return;
    }

    if (this.authService.getCurrentUser() === null) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    // Usar nomeNormalizado como identificador do produto
    const idProduto = this.produto.nomeNormalizado;

    this.comprando.set(true);
    this.mensagemCompra.set(null);
    this.compraSucesso.set(false);

    this.produtoService.comprarProduto(idProduto).subscribe({
      next: (pagamentoPixResponse: PagamentoPixResponse) => {
        this.pagamentoPix.set(pagamentoPixResponse);
        this.mostrarDialogPix.set(true);

        this.iniciarContadorRegressivo(pagamentoPixResponse.expiresAt);
        this.compraSucesso.set(true);
        this.comprando.set(false);
      },
      error: (error) => {
        console.error('Erro ao comprar produto:', error);
        this.compraSucesso.set(false);

        // Verificar se o produto já foi comprado
        if (error?.error?.codigoErro === 'PRODUTO_JA_COMPRADO') {
          this.mensagemCompra.set(
            error?.error?.mensagem || 'Este produto já foi comprado por você.'
          );
        } else {
          this.mensagemCompra.set(
            error?.error?.mensagem || error?.error?.message || 'Erro ao processar a compra. Tente novamente.'
          );
        }

        this.comprando.set(false);
      },
    });
  }

  iniciarContadorRegressivo(expiresAt: string): void {
    const dataExpiracao = new Date(expiresAt).getTime();
    
    const atualizarContador = () => {
      const agora = new Date().getTime();
      const diferenca = Math.max(0, dataExpiracao - agora);
      const segundos = Math.floor(diferenca / 1000);
      
      this.tempoRestante.set(segundos);
      
      // if (segundos <= 0) {
      //   this.pararContador();
      //   this.fecharDialogPix();
      //   alert('O tempo para pagamento expirou. Por favor, tente novamente.');
      // }
    };
    
    atualizarContador();
    this.intervaloContador = setInterval(atualizarContador, 1000);
  }

  pararContador(): void {
    if (this.intervaloContador) {
      clearInterval(this.intervaloContador);
      this.intervaloContador = null;
    }
  }

  formatarTempoRestante(): string {
    const segundos = this.tempoRestante();
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  }

  fecharDialogPix(): void {
    this.pararContador();
    this.mostrarDialogPix.set(false);
    this.pagamentoPix.set(null);
    this.tempoRestante.set(0);
    this.codigoCopiado.set(false);
  }

  copiarCodigoPix(): void {
    const codigo = this.pagamentoPix()?.qrCode;
    if (codigo) {
      navigator.clipboard.writeText(codigo).then(() => {
        this.codigoCopiado.set(true);
        setTimeout(() => {
          this.codigoCopiado.set(false);
        }, 2000);
      }).catch(err => {
        console.error('Erro ao copiar código:', err);
        alert('Erro ao copiar código. Tente selecionar e copiar manualmente.');
      });
    }
  }

  ngOnDestroy(): void {
    this.pararContador();
  }
}


