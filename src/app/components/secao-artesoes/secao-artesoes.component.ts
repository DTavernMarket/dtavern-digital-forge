import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtesaoService } from '../../services/artesao.service';

@Component({
  selector: 'app-secao-artesoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="artesaos" class="py-20 bg-ash-smoke/30">
      <div class="container mx-auto px-4">
        <!-- Cabeçalho da Seção -->
        <div class="text-center mb-16 space-y-4">
          <div
            class="inline-flex items-center space-x-2 bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-full px-4 py-2 text-sm mb-4"
          >
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <span class="text-scroll-beige font-medium">Nossos Artesãos</span>
          </div>

          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            Conheça os
            <span class="text-candlelight-gold"> Mestres Criadores </span>
          </h2>

          <p class="text-lg text-scroll-beige/70 max-w-2xl mx-auto">
            Artistas talentosos que dedicam suas vidas a criar experiências únicas para suas
            aventuras de RPG.
          </p>
        </div>

        <!-- Grid de Artesãos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            *ngFor="let artesao of artesoesEmDestaque(); trackBy: rastrearArtesao"
            class="group bg-stone-gray/80 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <!-- Avatar e Informações Básicas -->
            <div class="text-center mb-6">
              <div class="relative mx-auto mb-4">
                <img
                  [src]="artesao.avatar"
                  [alt]="artesao.nome"
                  class="w-24 h-24 rounded-full object-cover mx-auto border-4 border-brass-accent/30"
                />
              </div>

              <h3
                class="text-xl font-semibold text-scroll-beige group-hover:text-candlelight-gold transition-colors"
              >
                {{ artesao.nome }}
              </h3>

              <div class="flex items-center justify-center space-x-1 mt-2">
                <svg class="w-4 h-4 text-candlelight-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-scroll-beige/80">{{ artesao.avaliacao }}</span>
                <span class="text-scroll-beige/60"
                  >({{ artesao.numeroAvaliacoes }} avaliações)</span
                >
              </div>
            </div>

            <!-- Biografia -->
            <p class="text-sm text-scroll-beige/70 text-center mb-6 line-clamp-3">
              {{ artesao.biografia }}
            </p>

            <!-- Especialidades -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-scroll-beige mb-3">Especialidades:</h4>
              <div class="flex flex-wrap gap-2 justify-center">
                <span
                  *ngFor="let especialidade of artesao.especialidades"
                  class="px-3 py-1 bg-candlelight-gold/20 text-candlelight-gold text-xs rounded-full border border-candlelight-gold/30"
                >
                  {{ especialidade }}
                </span>
              </div>
            </div>

            <!-- Estatísticas -->
            <div class="grid grid-cols-2 gap-4 mb-6 text-center">
              <div class="bg-stone-gray/50 rounded-lg p-3">
                <div class="text-lg font-bold text-scroll-beige">{{ artesao.numeroProdutos }}</div>
                <div class="text-xs text-scroll-beige/60">Produtos</div>
              </div>
              <div class="bg-stone-gray/50 rounded-lg p-3">
                <div class="text-lg font-bold text-scroll-beige">
                  {{ artesao.numeroSeguidores }}
                </div>
                <div class="text-xs text-scroll-beige/60">Seguidores</div>
              </div>
            </div>

            <!-- Botão Ver Perfil -->
            <button
              class="w-full px-4 py-2 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-sm"
            >
              Ver Perfil Completo
            </button>
          </div>
        </div>

        <!-- Botão Seja um Artesão -->
        <div class="text-center">
          <button
            class="px-8 py-3 border-2 border-candlelight-gold text-candlelight-gold rounded-lg font-medium hover:bg-candlelight-gold hover:text-tavern-wood transition-all"
          >
            Seja um Artesão
            <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
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

      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class SecaoArtesoesComponent {
  private artesaoService = inject(ArtesaoService);

  artesoesEmDestaque = this.artesaoService.obterArtesoesEmDestaque();

  rastrearArtesao(index: number, artesao: any) {
    return artesao.uuid;
  }
}
