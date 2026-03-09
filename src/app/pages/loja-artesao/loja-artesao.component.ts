import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, OnDestroy, OnInit, signal, effect, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { DialogEditarLojaComponent } from '../../components/dialog-editar-loja/dialog-editar-loja.component';
import { Artesao } from '../../models/artesao.model';
import { CategoriaProduto, Produto } from '../../models/produto.model';
import { ArtesaoService } from '../../services/artesao.service';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { OpcaoSelect, SelectCustomizadoComponent } from "../../components/select-customizado/select-customizado.component";
import { CategoriaProdutoService } from '../../services/categoria-produto.service';
@Component({
  selector: 'app-loja-artesao',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraNavegacaoComponent, RouterModule, DialogEditarLojaComponent, SelectCustomizadoComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="true" />

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
                @if (isOwner() === true) {
                  <div class="relative" #menuConfiguracaoContainer>
                    <button
                      type="button"
                      (click)="menuConfiguracaoAberto.set(!menuConfiguracaoAberto())"
                      class="p-1.5 rounded-lg text-white/80 hover:text-candlelight-gold hover:bg-white/10 transition-colors"
                      title="Configurações da loja"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    @if (menuConfiguracaoAberto()) {
                      <div class="absolute left-0 mt-2 w-48 bg-midnight-brown/95 border border-brass-accent/40 rounded-lg shadow-xl z-[100]">
                        <div class="py-2">
                          <button
                            type="button"
                            (click)="abrirDialogEditarLoja(); menuConfiguracaoAberto.set(false)"
                            class="w-full px-4 py-2 text-left text-scroll-beige hover:bg-tavern-wood/20 transition-colors text-sm"
                          >
                            Editar perfil da loja
                          </button>
                          <a
                            [routerLink]="getRotaGerenciarProdutos()"
                            (click)="menuConfiguracaoAberto.set(false)"
                            class="block w-full px-4 py-2 text-left text-scroll-beige hover:bg-tavern-wood/20 transition-colors text-sm"
                          >
                            Gerenciar produtos
                          </a>
                        </div>
                      </div>
                    }
                  </div>
                }
                <div class="relative">
                  <button
                    type="button"
                    (click)="copiarUrlLoja()"
                    class="p-1.5 rounded-lg text-white/80 hover:text-candlelight-gold hover:bg-white/10 transition-colors"
                    [title]="urlCopiada() ? 'URL copiada!' : 'Copiar link da loja'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="1" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                  @if (urlCopiada()) {
                    <span
                      class="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2.5 py-1 text-xs font-medium text-tavern-wood bg-candlelight-gold rounded shadow-lg whitespace-nowrap z-10"
                    >
                      Copiado!
                    </span>
                  }
                </div>
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
              <a
                [routerLink]="getRotaAba()"
                [queryParams]="{ aba: 'produtos' }"
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
                [routerLink]="getRotaAba()"
                [queryParams]="{ aba: 'sobre' }"
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
                [routerLink]="getRotaAba()"
                [queryParams]="{ aba: 'contato' }"
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

            @if (carregandoSobre()) {
              <div class="flex items-center justify-center py-8">
                <svg class="animate-spin w-6 h-6 text-candlelight-gold" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="ml-2 text-scroll-beige text-sm">Carregando...</span>
              </div>
            } @else {
              <div class="bg-tavern-wood/20 border border-brass-accent/40 rounded-lg p-4 h-[400px] overflow-y-auto">
                <p class="text-scroll-beige/80 text-base leading-relaxed whitespace-pre-wrap">
                  {{ artesao()?.descricao || 'Nenhuma descrição disponível.' }}
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
                      class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Seu email"
                      class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60"
                    />
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      placeholder="Sua mensagem"
                      class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 resize-none"
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
export class LojaArtesaoComponent implements AfterViewInit, OnDestroy {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private artesaoService = inject(ArtesaoService);
  private produtoService = inject(ProdutoService);
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
    // Função auxiliar para atualizar a aba baseada nos parâmetros da rota filha
    const atualizarAba = () => {
      // Se a URL atual for a de gerenciamento de produtos, priorizar essa aba especial
      const urlAtual = this.router.url;
      if (urlAtual.includes('/gerenciar-produtos')) {
        this.abaAtiva.set('gerenciar-produtos');
        return;
      }

      // Caso contrário, usar o parâmetro de query "aba" (?aba=produtos|sobre|contato)
      const abaParam = this.route.snapshot.queryParamMap.get('aba');
      if (abaParam && ['produtos', 'sobre', 'contato'].includes(abaParam)) {
        this.abaAtiva.set(abaParam as 'produtos' | 'sobre' | 'contato');
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
        // Observar mudanças na rota filha (ex.: entrar/sair de gerenciar-produtos)
        this.route.firstChild.params.subscribe(() => {
          atualizarAba();
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

    // Reagir também a mudanças de query params (?aba=...)
    this.route.queryParamMap.subscribe(() => {
      atualizarAba();
    });

    // Verificar o estado inicial da rota/aba
    atualizarAba();
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

  /**
   * Retorna a rota base da loja; a aba é controlada via query param (?aba=...).
   */
  getRotaAba(): string[] {
    const dominio = this.dominioAtual() || this.artesao()?.dominio || this.route.snapshot.params['dominio'];
    if (dominio) {
      return ['/lojas', dominio];
    }
    return ['/'];
  }

  getRotaGerenciarProdutos(): string[] {
    const dominio = this.dominioAtual() || this.artesao()?.dominio || this.route.snapshot.params['dominio'];
    if (dominio) {
      return ['/lojas', dominio, 'gerenciar-produtos'];
    }
    return ['/'];
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
