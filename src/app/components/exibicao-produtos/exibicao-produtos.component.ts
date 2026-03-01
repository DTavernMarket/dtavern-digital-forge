import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { ProdutosMaisVendidosDTO } from '../../models/produto.model';

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
          <a
            *ngFor="let produto of produtosEmDestaque; let i = index"
            [routerLink]="['/explorar', produto.nomeProdutoNormalizado]"
            class="group block bg-midnight-brown/50 backdrop-blur-sm border-brass-accent/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-lg cursor-pointer no-underline"
          >
            <!-- Imagem do Produto -->
            <div class="relative overflow-hidden bg-tavern-wood/20 h-48">
              <!-- Indicador de pódio (1º, 2º, 3º) + vendas -->
              <div
                class="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold shadow-md"
                [ngClass]="{
                  'bg-amber-400/95 text-amber-950': i === 0,
                  'bg-slate-300/95 text-slate-800': i === 1,
                  'bg-amber-700/95 text-amber-100': i === 2
                }"
              >
                <span class="tabular-nums">{{ i + 1 }}º</span>
                <span class="opacity-90 font-medium">·</span>
                <span class="tabular-nums">{{ produto.quantidadeVendas }} {{ produto.quantidadeVendas === 1 ? 'compra' : 'compras' }}</span>
              </div>

            <!-- Imagem de Preview ou Placeholder -->
              <img
                *ngIf="produto.urlPreview"
                [src]="produto.urlPreview"
                [alt]="produto.nomeProduto"
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
              <div class="absolute bottom-3 left-3 z-10">
                <span
                  class="bg-candlelight-gold/90 text-tavern-wood text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ produto.nomeCategoria }}
                </span>
              </div>
              <div *ngIf="produto.flagGratuito" class="absolute top-3 right-3 z-10">
                <span
                  class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  Grátis
                </span>
              </div>

            </div>

            <!-- Informações do Produto -->
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <h3
                  class="text-lg font-semibold text-scroll-beige group-hover:text-candlelight-gold transition-colors"
                >
                  {{ produto.nomeProduto }}
                </h3>
              </div>

              <p class="text-sm text-scroll-beige/70 line-clamp-2">
                {{ produto.descricaoProduto || '' }}
              </p>

              <!-- Preço -->
              <div class="flex items-center justify-between pt-2">
                <div>
                  <span *ngIf="produto.flagGratuito" class="text-lg font-bold text-scroll-beige">
                    Grátis
                  </span>
                  <div *ngIf="!produto.flagGratuito" class="flex items-baseline gap-2">
                    <span class="text-lg font-bold text-scroll-beige">
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
                    <span
                      *ngIf="produto.promocaoPorcentagem && produto.promocaoPorcentagem > 0 && produto.valorPromocional != null"
                      class="text-scroll-beige/60 text-sm line-through"
                    >
                      R$ {{ produto.valorUnitario.toFixed(2).replace('.', ',') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        <!-- Botão Ver Todos -->
        <div class="text-center">
          <button
            routerLink="/explorar"
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
export class ExibicaoProdutosComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private changeDetectorRef = inject(ChangeDetectorRef);


  /** Produtos mais vendidos (3 itens). O async pipe evita ExpressionChangedAfterItHasBeenCheckedError. */
  produtosEmDestaque: ProdutosMaisVendidosDTO[] = [];
  ngOnInit(): void {
    this.produtoService.listarProdutosMaisVendidos(0, 3).subscribe({
      next: (resultado) => {
        this.produtosEmDestaque = resultado.content;

        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
