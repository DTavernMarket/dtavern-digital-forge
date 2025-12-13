import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { Artesao } from '../../models/artesao.model';
import { Produto } from '../../models/produto.model';
import { ArtesaoService } from '../../services/artesao.service';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-loja-artesao',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraNavegacaoComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="true" />

      <!-- Header da Loja com Fundo do Artesão -->
      <div class="relative h-96 overflow-hidden">
        <!-- Imagem de Fundo -->
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          [style.background-image]="'url(' + artesao()?.planoFundo + ')'"
        >
          <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <!-- Conteúdo do Header -->
        <div class="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
          <div class="flex items-end space-x-6">
            <!-- Avatar do Artesão -->
            <div class="relative">
              <img
                [src]="artesao()?.avatar"
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
              <p class="text-lg text-scroll-beige/80 mb-4 max-w-2xl">{{ artesao()?.biografia }}</p>

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
                  <span
                    >{{ artesao()?.avaliacao }} ({{ artesao()?.numeroAvaliacoes }} avaliações)</span
                  >
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
                  <span>{{ artesao()?.numeroProdutos }} produtos</span>
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
                  <span>{{ artesao()?.numeroSeguidores }} seguidores</span>
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
              <button
                (click)="abaAtiva.set('produtos')"
                [class]="
                  abaAtiva() === 'produtos'
                    ? 'text-candlelight-gold border-b-2 border-candlelight-gold'
                    : 'text-scroll-beige hover:text-candlelight-gold'
                "
                class="pb-2 font-medium transition-colors"
              >
                Produtos ({{ produtosArtesao().length }})
              </button>
              <button
                (click)="abaAtiva.set('sobre')"
                [class]="
                  abaAtiva() === 'sobre'
                    ? 'text-candlelight-gold border-b-2 border-candlelight-gold'
                    : 'text-scroll-beige hover:text-candlelight-gold'
                "
                class="pb-2 font-medium transition-colors"
              >
                Sobre
              </button>
              <button
                (click)="abaAtiva.set('contato')"
                [class]="
                  abaAtiva() === 'contato'
                    ? 'text-candlelight-gold border-b-2 border-candlelight-gold'
                    : 'text-scroll-beige hover:text-candlelight-gold'
                "
                class="pb-2 font-medium transition-colors"
              >
                Contato
              </button>
            </div>

            <!-- Botões de Ação -->
            <div class="flex items-center space-x-4">
              <button
                (click)="novoProduto()"
                class="px-6 py-2 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-brass-accent/90 transition-colors"
              >
                Novo produto
              </button>
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
        <!-- Aba de Produtos -->
        <div *ngIf="abaAtiva() === 'produtos'" class="space-y-6">
          <!-- Filtros -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <select
                [(ngModel)]="categoriaFiltro"
                class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              >
                <option value="">Todas as categorias</option>
                <option value="Tokens">Tokens</option>
                <option value="Mapas">Mapas</option>
                <option value="Aventuras">Aventuras</option>
                <option value="Trilhas Sonoras">Trilhas Sonoras</option>
                <option value="Ferramentas">Ferramentas</option>
                <option value="Outros">Outros</option>
              </select>

              <select
                [(ngModel)]="ordenacao"
                class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              >
                <option value="recentes">Mais recentes</option>
                <option value="avaliacao">Melhor avaliados</option>
                <option value="preco-menor">Menor preço</option>
                <option value="preco-maior">Maior preço</option>
                <option value="popularidade">Mais populares</option>
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
              class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl overflow-hidden hover:border-candlelight-gold/50 transition-all duration-300 group cursor-pointer"
              (click)="verProduto(produto)"
            >
              <!-- Imagem do Produto -->
              <div class="relative aspect-square overflow-hidden">
                <img
                  [src]="produto.imagens[0].previewUrl"
                  [alt]="produto.titulo"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-3 left-3">
                  <span
                    class="px-2 py-1 bg-candlelight-gold text-tavern-wood text-xs font-semibold rounded"
                  >
                    {{ produto.categoria }}
                  </span>
                </div>
                <div class="absolute top-3 right-3">
                  <div
                    class="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1"
                  >
                    <svg
                      class="w-3 h-3 text-candlelight-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span class="text-white text-xs">{{ produto.avaliacao }}</span>
                  </div>
                </div>
              </div>

              <!-- Informações do Produto -->
              <div class="p-4">
                <h3 class="font-semibold text-scroll-beige mb-2 line-clamp-2">
                  {{ produto.titulo }}
                </h3>
                <p class="text-scroll-beige/70 text-sm mb-3 line-clamp-2">
                  {{ produto.descricao }}
                </p>

                <!-- Estatísticas -->
                <div class="flex items-center justify-between text-xs text-scroll-beige/60 mb-3">
                  <span>{{ produto.numeroDownloads }} downloads</span>
                  <span>{{ produto.tamanhoArquivo }}</span>
                </div>

                <!-- Preço e Botão -->
                <div class="flex items-center justify-between">
                  <span class="text-candlelight-gold font-bold text-lg">
                    R$ {{ produto.valorUnitario }}
                  </span>
                  <button
                    class="px-4 py-2 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors text-sm"
                  >
                    Comprar
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

        <!-- Aba Sobre -->
        <div *ngIf="abaAtiva() === 'sobre'" class="max-w-4xl">
          <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
            <h2 class="text-2xl font-semibold text-scroll-beige mb-6">
              Sobre {{ artesao()?.nome }}
            </h2>

            <div class="prose prose-invert max-w-none">
              <p class="text-scroll-beige/80 text-lg leading-relaxed mb-6">
                {{ artesao()?.biografia }}
              </p>

              <!-- Especialidades -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-scroll-beige mb-4">Especialidades</h3>
                <div class="flex flex-wrap gap-3">
                  <span
                    *ngFor="let especialidade of artesao()?.especialidades"
                    class="px-4 py-2 bg-candlelight-gold/20 border border-candlelight-gold/30 rounded-lg text-candlelight-gold font-medium"
                  >
                    {{ especialidade }}
                  </span>
                </div>
              </div>

              <!-- Estatísticas Detalhadas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div class="text-center">
                  <div class="text-3xl font-bold text-candlelight-gold">
                    {{ artesao()?.avaliacao }}
                  </div>
                  <div class="text-scroll-beige/70">Avaliação Média</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-candlelight-gold">
                    {{ artesao()?.numeroProdutos }}
                  </div>
                  <div class="text-scroll-beige/70">Produtos</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-candlelight-gold">
                    {{ artesao()?.numeroSeguidores }}
                  </div>
                  <div class="text-scroll-beige/70">Seguidores</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-candlelight-gold">
                    {{ artesao()?.numeroAvaliacoes }}
                  </div>
                  <div class="text-scroll-beige/70">Avaliações</div>
                </div>
              </div>

              <!-- Data de Entrada -->
              <div class="text-scroll-beige/70">
                <strong class="text-scroll-beige">Membro desde:</strong>
                {{ artesao()?.dataEntrada ? (artesao()?.dataEntrada | date : 'MMMM yyyy') : '' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Aba Contato -->
        <div *ngIf="abaAtiva() === 'contato'" class="max-w-4xl">
          <div class="bg-tavern-wood/10 border border-brass-accent/30 rounded-xl p-8">
            <h2 class="text-2xl font-semibold text-scroll-beige mb-6">Entre em Contato</h2>

            <div class="grid md:grid-cols-2 gap-8">
              <!-- Redes Sociais -->
              <div>
                <h3 class="text-xl font-semibold text-scroll-beige mb-4">Redes Sociais</h3>
                <div class="space-y-4">
                  <a
                    *ngIf="artesao()?.redesSociais?.website"
                    [href]="artesao()?.redesSociais?.website"
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
                    *ngIf="artesao()?.redesSociais?.twitter"
                    [href]="
                      'https://twitter.com/' + artesao()?.redesSociais?.twitter?.replace('@', '')
                    "
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.1-2.827-.384a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                    <span>{{ artesao()?.redesSociais?.twitter }}</span>
                  </a>

                  <a
                    *ngIf="artesao()?.redesSociais?.instagram"
                    [href]="
                      'https://instagram.com/' +
                      artesao()?.redesSociais?.instagram?.replace('@', '')
                    "
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"
                      />
                    </svg>
                    <span>{{ artesao()?.redesSociais?.instagram }}</span>
                  </a>

                  <a
                    *ngIf="artesao()?.redesSociais?.youtube"
                    [href]="getYouTubeUrl(artesao()?.redesSociais?.youtube)"
                    target="_blank"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </svg>
                    <span>{{ artesao()?.redesSociais?.youtube }}</span>
                  </a>

                  <a
                    *ngIf="artesao()?.redesSociais?.discord"
                    href="#"
                    class="flex items-center space-x-3 text-scroll-beige hover:text-candlelight-gold transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"
                      />
                    </svg>
                    <span>{{ artesao()?.redesSociais?.discord }}</span>
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
      </div>
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
export class LojaArtesaoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private artesaoService = inject(ArtesaoService);
  private produtoService = inject(ProdutoService);

  artesao = signal<Artesao | undefined>(undefined);
  produtosArtesao = signal<Produto[]>([]);
  abaAtiva = signal('produtos');
  categoriaFiltro = signal('');
  ordenacao = signal('recentes');

  produtosNamoral: Produto[] = [];

  produtosFiltrados = computed(() => {
    let produtos = this.produtosArtesao();

    // Filtrar por categoria
    if (this.categoriaFiltro()) {
      produtos = produtos.filter((p) => p.categoria === this.categoriaFiltro());
    }

    // Ordenar
    switch (this.ordenacao()) {
      case 'avaliacao':
        produtos = produtos.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case 'preco-menor':
        produtos = produtos.sort((a, b) => a.valorUnitario - b.valorUnitario);
        break;
      case 'preco-maior':
        produtos = produtos.sort((a, b) => b.valorUnitario - a.valorUnitario);
        break;
      case 'popularidade':
        produtos = produtos.sort((a, b) => b.numeroDownloads - a.numeroDownloads);
        break;
      case 'recentes':
      default:
        produtos = produtos.sort(
          (a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
        );
        break;
    }

    return produtos;
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const dominio = params['dominio'];
      if (dominio) {
        this.carregarArtesao(dominio);
      }
    });
  }

  private carregarArtesao(dominio: string) {
    const artesao = this.artesaoService.obterArtesaoPorDominio(dominio);
    if (artesao) {
      this.artesao.set(artesao);
      this.produtoService.buscarProdutosPorArtesao(dominio).subscribe((response) => {
        this.produtosNamoral = response;
        console.log(this.produtosNamoral);
      });
    } else {
      // Redirecionar para página não encontrada
      this.router.navigate(['/404']);
    }
  }

  private carregarProdutos(artesaoId: string) {
    const produtos = this.produtoService.obterProdutosPorArtesao(artesaoId);
    this.produtosArtesao.set(produtos);
  }

  verProduto(produto: Produto) {
    // Navegar para página de detalhes do produto
    this.router.navigate(['/produtos'], {
      queryParams: { produto: produto.uuid },
    });
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
}
