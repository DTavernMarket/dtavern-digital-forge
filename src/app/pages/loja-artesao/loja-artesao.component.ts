import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { Artesao } from '../../models/artesao.model';
import { Produto } from '../../models/produto.model';
import { ArtesaoService } from '../../services/artesao.service';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { auth } from '../../config/firebase.config';
@Component({
  selector: 'app-loja-artesao',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraNavegacaoComponent, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="true" />

      <!-- Header da Loja com Fundo do Artesão -->
      <div class="relative h-96 overflow-hidden">
        <!-- Imagem de Fundo -->
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          [style.background-image]="'url(' + 'http://localhost:8080/cdn/default.png' + ')'"
        >
          <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <!-- Conteúdo do Header -->
        <div class="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
          <div class="flex items-end space-x-6">
            <!-- Avatar do Artesão -->
            <div class="relative">
              <img
                [src]="'http://localhost:8080/cdn/default.png'"
                [alt]="artesao()?.nome"
                class="w-32 h-32 rounded-full border-4 border-candlelight-gold shadow-xl object-cover"
              />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-candlelight-gold rounded-full flex items-center justify-center"
              >
                <svg class="w-4 h-4 text-tavern-wood" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>

            <!-- Informações do Artesão -->
            <div class="text-white">
              <h1 class="text-4xl font-medieval font-bold mb-2">{{ artesao()?.nome }}</h1>

              <!-- Estatísticas -->
              <div class="flex items-center space-x-6 text-sm">
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-4 h-4 text-candlelight-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span>{{ 0 }} ({{ 0 }} avaliações)</span>
                </div>
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
                  <span>{{ 0 }} produtos</span>
                </div>
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>{{ 0 }} seguidores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegação da Loja -->
      <div class="bg-midnight-brown/80 border-b border-brass-accent/30">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center space-x-8">
              <a
                [routerLink]="getRotaAba('produtos')"
                routerLinkActive="text-candlelight-gold border-b-2 border-candlelight-gold"
                [routerLinkActiveOptions]="{ exact: false }"
                [class]="
                  abaAtiva() === 'produtos'
                    ? 'text-candlelight-gold border-b-2 border-candlelight-gold'
                    : 'text-scroll-beige hover:text-candlelight-gold'
                "
                class="pb-2 font-medium transition-colors"
              >
                Produtos ({{ produtosArtesao().length }})
              </a>
              <a
                [routerLink]="getRotaAba('sobre')"
                routerLinkActive="text-candlelight-gold border-b-2 border-candlelight-gold"
                [routerLinkActiveOptions]="{ exact: false }"
                [class]="
                  abaAtiva() === 'sobre'
                    ? 'text-candlelight-gold border-b-2 border-candlelight-gold'
                    : 'text-scroll-beige hover:text-candlelight-gold'
                "
                class="pb-2 font-medium transition-colors"
              >
                Sobre
              </a>
              <a
                [routerLink]="getRotaAba('contato')"
                routerLinkActive="text-candlelight-gold border-b-2 border-candlelight-gold"
                [routerLinkActiveOptions]="{ exact: false }"
                [class]="
                  abaAtiva() === 'contato'
                    ? 'text-candlelight-gold border-b-2 border-candlelight-gold'
                    : 'text-scroll-beige hover:text-candlelight-gold'
                "
                class="pb-2 font-medium transition-colors"
              >
                Contato
              </a>
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
              <button
                class="px-6 py-2 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors"
              >
                Seguir
              </button>
              <button class="p-2 text-scroll-beige hover:text-candlelight-gold transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button class="p-2 text-scroll-beige hover:text-candlelight-gold transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <div class="container mx-auto px-4 py-8">
        @if (abaAtiva() === 'produtos') {
      <!-- Aba de Produtos -->
        <div class="space-y-6">
          <!-- Filtros -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <select
                [(ngModel)]="categoriaFiltro"
                class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              >
                <option value="">Todas as categorias</option>
                <option value="token">Token</option>
                <option value="mapa">Mapa</option>
                <option value="aventura">Aventura</option>
                <option value="trilha-sonora">Trilha Sonora</option>
                <option value="ferramenta">Ferramenta</option>
                <option value="outro">Outro</option>
              </select>

              <select
                [(ngModel)]="ordenacao"
                class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
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
                  <img
                    *ngIf="produto.midiaPreview.url"
                    [src]="produto.midiaPreview.url"
                    [alt]="produto.nome"
                    class="w-full h-full object-cover"
                  />
                  <div
                    *ngIf="!produto.midiaPreview.url"
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
        }
        @if (abaAtiva() === 'sobre') {
        <!-- Aba Sobre -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Card Sobre (Esquerda) -->
          <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-6 relative">
            <h2 class="text-2xl font-semibold text-scroll-beige mb-6">
              Sobre
            </h2>

            <!-- Botão Editar (apenas para dono da loja) -->
            @if (isOwner() && !editandoSobre()) {
              <button
                (click)="iniciarEdicaoSobre()"
                class="absolute top-6 right-6 w-8 h-8 bg-candlelight-gold/90 hover:bg-candlelight-gold text-tavern-wood rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors z-10"
                title="Editar descrição"
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

            @if (carregandoSobre()) {
              <div class="flex items-center justify-center py-8">
                <svg class="animate-spin w-6 h-6 text-candlelight-gold" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="ml-2 text-scroll-beige text-sm">Carregando...</span>
              </div>
            } @else if (editandoSobre()) {
              <!-- Modo de Edição -->
              <div class="space-y-4">
                <textarea
                  [value]="descricaoSobreEditada()"
                  (input)="onTextareaInput($event)"
                  maxlength="5000"
                  rows="12"
                  class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold resize-none h-[400px] overflow-y-auto"
                  placeholder="Escreva sobre sua loja..."
                ></textarea>
                <div class="flex justify-between items-center text-sm text-scroll-beige/70">
                  <span>{{ descricaoSobreEditada().length }} / 5000 caracteres</span>
                </div>
                <div class="flex gap-3">
                  <button
                    (click)="cancelarEdicaoSobre()"
                    [disabled]="salvandoSobre()"
                    class="flex-1 px-4 py-2 bg-tavern-wood/30 border border-brass-accent/40 text-scroll-beige font-semibold rounded-lg hover:bg-tavern-wood/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button
                    (click)="salvarSobre()"
                    [disabled]="salvandoSobre()"
                    class="flex-1 px-4 py-2 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    @if (salvandoSobre()) {
                      <svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Salvando...</span>
                    } @else {
                      <span>Salvar</span>
                    }
                  </button>
                </div>
              </div>
            } @else {
              <div class="bg-tavern-wood/20 border border-brass-accent/40 rounded-lg p-4 h-[400px] overflow-y-auto">
                <p class="text-scroll-beige/80 text-base leading-relaxed whitespace-pre-wrap">
                  {{ descricaoSobre() || 'Nenhuma descrição disponível.' }}
                </p>
              </div>
            }
          </div>

          <!-- Card Especialidades (Direita) -->
          <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-6">
            <h2 class="text-2xl font-semibold text-scroll-beige mb-6">
              Especialidades
            </h2>

            <!-- Estatísticas Detalhadas -->
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-candlelight-gold">0</div>
                <div class="text-scroll-beige/70 text-sm">Avaliação Média</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-candlelight-gold">0</div>
                <div class="text-scroll-beige/70 text-sm">Produtos</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-candlelight-gold">0</div>
                <div class="text-scroll-beige/70 text-sm">Seguidores</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-candlelight-gold">0</div>
                <div class="text-scroll-beige/70 text-sm">Avaliações</div>
              </div>
            </div>

            <!-- Categorias Mockadas -->
            <div class="mt-6">
              <h3 class="text-lg font-semibold text-scroll-beige mb-4">Categorias</h3>
              <div class="flex flex-wrap gap-3">
                <span
                  class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium text-sm"
                >
                  Token
                </span>
                <span
                  class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium text-sm"
                >
                  Mapa
                </span>
                <span
                  class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium text-sm"
                >
                  Aventura
                </span>
                <span
                  class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium text-sm"
                >
                  Trilha Sonora
                </span>
                <span
                  class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium text-sm"
                >
                  Ferramenta
                </span>
                <span
                  class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium text-sm"
                >
                  Outro
                </span>
              </div>
            </div>
          </div>
        </div>
        }

        @if (abaAtiva() === 'contato') {
        <!-- Aba Contato -->
        <div class="max-w-4xl">
          <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
            <h2 class="text-2xl font-semibold text-scroll-beige mb-6">Entre em Contato</h2>

            <div class="grid md:grid-cols-2 gap-8">
              <!-- Redes Sociais -->
              <div>
                <h3 class="text-xl font-semibold text-scroll-beige mb-4">Redes Sociais</h3>
                <div class="space-y-4">
                  <a
                    *ngIf="false"
                    [href]="'https://www.google.com'"
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                    <span>Website</span>
                  </a>

                  <a
                    *ngIf="false"
                    [href]="'https://twitter.com/' + 'https://www.google.com'"
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.1-2.827-.384a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                    <span>{{ 'https://www.google.com' }}</span>
                  </a>

                  <a
                    *ngIf="false"
                    [href]="'https://instagram.com/' + 'https://www.google.com'"
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"
                      />
                    </svg>
                    <span>{{ 'https://www.google.com' }}</span>
                  </a>

                  <a
                    *ngIf="false"
                    [href]="getYouTubeUrl('https://www.google.com')"
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </svg>
                    <span>{{ 'https://www.google.com' }}</span>
                  </a>

                  <a
                    *ngIf="false"
                    href="#"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"
                      />
                    </svg>
                    <span>{{ 'https://www.google.com' }}</span>
                  </a>
                </div>
              </div>

              <!-- Formulário de Contato -->
              <div>
                <h3 class="text-xl font-semibold text-scroll-beige mb-4">Envie uma Mensagem</h3>
                <form class="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Seu email"
                      class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                    />
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      placeholder="Sua mensagem"
                      class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    class="w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        }
      </div>

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
export class LojaArtesaoComponent implements AfterViewInit, OnDestroy {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private artesaoService = inject(ArtesaoService);
  private produtoService = inject(ProdutoService);
  private authService = inject(AuthService);
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

    return produtos;
  });

  constructor() {
    // Effect para carregar dados da aba "sobre" quando ela for ativada
    effect(() => {
      const aba = this.abaAtiva();
      const dominio = this.dominioAtual();

      if (aba === 'sobre' && dominio) {
        this.carregarSobre(dominio);
      }
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

  salvarSobre() {
    this.salvandoSobre.set(true);
    this.artesaoService.editarLoja({ descricaoSobre: this.descricaoSobreEditada() }).subscribe({
      next: () => {
        this.descricaoSobre.set(this.descricaoSobreEditada());
        this.editandoSobre.set(false);
        this.salvandoSobre.set(false);
        this.descricaoSobreEditada.set('');
      },
      error: (error) => {
        console.error('Erro ao salvar descrição sobre:', error);
        this.salvandoSobre.set(false);
        // Aqui você pode adicionar uma mensagem de erro para o usuário
        alert('Erro ao salvar descrição. Tente novamente.');
      }
    });
  }

  ngAfterViewInit() {
    // Função auxiliar para atualizar a aba baseada nos parâmetros da rota filha
    const atualizarAba = () => {
      // Tentar pegar da rota filha usando snapshot
      const aba = this.route.firstChild?.snapshot.params['aba'];

      if (aba && ['produtos', 'sobre', 'contato'].includes(aba)) {
        this.abaAtiva.set(aba);
        return;
      }

      // Se não houver aba válida na rota filha, verificar a URL atual como fallback
      const urlAtual = this.router.url;
      const matchAba = urlAtual.match(/\/lojas\/[^\/]+\/([^\/]+)/);
      if (matchAba && matchAba[1] && ['produtos', 'sobre', 'contato'].includes(matchAba[1])) {
        this.abaAtiva.set(matchAba[1]);
        return;
      }

      // Se não encontrar aba válida, definir como produtos (padrão)
      this.abaAtiva.set('produtos');
    };

    // Observar parâmetros da rota pai (dominio)
    this.route.params.subscribe((params) => {
      const dominio = params['dominio'];

      if (dominio) {
        this.dominioAtual.set(dominio);
        this.carregarArtesao(dominio);
        this.verificarDonoLoja(dominio);

        // Atualizar aba após carregar o domínio
        // Usar setTimeout para garantir que a rota filha já foi processada pelo Angular
        setTimeout(() => {
          atualizarAba();
        }, 0);
      }
    });

    // Observar mudanças na rota filha
    // Isso captura quando a rota filha é carregada ou quando muda
    // Usar uma função recursiva com limite de tentativas para verificar quando firstChild estiver disponível
    let tentativas = 0;
    const maxTentativas = 50; // Máximo de 500ms (50 * 10ms)

    const observarRotaFilha = () => {
      if (this.route.firstChild) {
        // Observar mudanças nos parâmetros da rota filha
        this.route.firstChild.params.subscribe((childParams) => {
          const aba = childParams['aba'];

          if (aba && ['produtos', 'sobre', 'contato'].includes(aba)) {
            this.abaAtiva.set(aba);
          } else {
            this.abaAtiva.set('produtos');
          }
        });
      } else if (tentativas < maxTentativas) {
        // Se a rota filha ainda não estiver disponível, tentar novamente após um pequeno delay
        tentativas++;
        setTimeout(() => {
          observarRotaFilha();
        }, 10);
      } else {
        // Se exceder o limite de tentativas, usar fallback da URL
        atualizarAba();
      }
    };

    // Iniciar observação da rota filha
    observarRotaFilha();

    // Verificar o snapshot inicial da rota filha (caso já esteja carregada)
    atualizarAba();
  }

  private async verificarDonoLoja(dominio: string) {
    // Verificar se há token disponível (mais confiável que isAuthenticated)
    this.authService.getCurrentToken().subscribe((token) => {
      if (token) {
        this.artesaoService.verifyOwner(dominio).subscribe({
          next: (isOwner) => {
            if (isOwner) {
              console.log('dono da loja');
            } else {
              console.log('é visitante');
            }
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
          biografia: lojaResponse.descricao, // descricao do backend vira biografia
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
    this.produtoService.buscarProdutosPorArtesao(dominio).subscribe({
      next: (produtos) => {
        this.produtosArtesao.set(produtos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.produtosArtesao.set([]);
      },
    });
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
   * Retorna a rota para uma aba específica da loja
   */
  getRotaAba(aba: 'produtos' | 'sobre' | 'contato'): string[] {
    const dominio = this.dominioAtual() || this.artesao()?.dominio || this.route.snapshot.params['dominio'];
    if (dominio) {
      return ['/lojas', dominio, aba];
    }
    return ['/'];
  }
}
