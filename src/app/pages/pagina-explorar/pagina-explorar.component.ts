import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ArtesaoService } from '../../services/artesao.service';
import { LojaResponse } from '../../models/artesao.model';
import { DataView } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    CommonModule,
    DataView,
    TagModule,
    FormsModule,
    RouterModule,
    BarraNavegacaoComponent,
    RodapeComponent
  ],
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
                class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 top-32"
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
                       class="w-full px-4 py-3 pl-10 bg-stone-gray/20 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50"
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
                 </div>

                 <!-- Contador de Resultados (total do backend quando disponível) -->
                 <div class="pt-4 border-t border-brass-accent/20">
                   <p class="text-sm text-scroll-beige/70">
                     {{ totalElementos() }} artesãos encontrados
                   </p>
                 </div>
               </div>
             </div>

            <!-- Área Principal dos Artesãos (Direita) -->
            <div class="p-4 flex-1 flex flex-col gap-4 bg-midnight-brown backdrop-blur-sm border border-brass-accent/30 rounded-lg">
              <!-- DataView de Lojas -->
              <p-dataview  #dv [layout]="'grid'" [value]="artesoesFiltrados()">

                <ng-template #grid let-artesaos>
                    <div class="grid grid-cols-12 gap-4 items-stretch">
                        <div *ngFor="let artesao of artesaos" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-4 p-2 flex">
                            <a
                              [routerLink]="['/lojas', artesao.dominio]"
                              class="card-artesao-link group/card bg-ash-smoke/30 backdrop-blur-sm border border-brass-accent/30 rounded flex min-h-[28rem] w-full flex-1 cursor-pointer flex-col overflow-hidden no-underline transition-all duration-200 ease-out hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-brass-accent/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-accent focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-brown sm:min-h-[30rem]"
                              [attr.aria-label]="'Abrir loja de ' + artesao.nome"
                            >
                                <div class="relative h-[240px] w-full shrink-0">
                                    <div
                                      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                      [style.background-image]="'url(' + urlImagemHeader(artesao) + ')'"
                                      role="img"
                                      [attr.aria-label]="'Capa de ' + artesao.nome"
                                    ></div>
                                    <div class="absolute inset-0 bg-midnight-brown/55"></div>
                                    @if (artesao.especialidades?.length) {
                                      <div class="absolute left-2 right-2 top-2 z-[2] flex flex-wrap gap-2">
                                        @for (especialidade of artesao.especialidades; track $index) {
                                          <p-tag [value]="especialidade.nome" class="especialidade-tag !pl-2 !pr-2 !pt-1 !pb-1 !bg-especialidade-tag !border text-sm !border-brass-accent !rounded-full !text-scroll-beige" />
                                        }
                                      </div>
                                    }
                                    <!-- Foto de perfil centralizada sobre a capa -->
                                    <div class="relative z-[1] flex h-full w-full items-center justify-center p-2">
                                      <img
                                        class="h-[168px] w-[168px] object-cover rounded bg-scroll-beige shadow-lg ring-2 ring-brass-accent"
                                        [src]="urlImagemPerfil(artesao)"
                                        [alt]="artesao.nome"
                                      />
                                    </div>
                                </div>
                                <div class="pr-6 pl-6 pb-6 pt-3 flex min-h-[12rem] flex-1 flex-col">
                                  <div class="flex flex-col gap-3 flex-1">
                                      <span class="text-2xl font-semibold text-scroll-beige shrink-0">{{ artesao.nome }}</span>
                                      <div class="flex flex-1 flex-col gap-2 min-h-[5.5rem]">
                                        <span class="text-medium text-scroll-beige/70 font-medium">
                                          {{ artesao.resumo?.trim() ? artesao.resumo : ' ' }}
                                        </span>
                                        <span class="text-sm text-scroll-beige/70 line-clamp-5">
                                          {{ artesao.descricao?.trim() ? artesao.descricao : ' ' }}
                                        </span>
                                      </div>

                                      <span class="text-medium font-medium text-scroll-beige/70 group-hover/card:text-candlelight-gold transition-colors">
                                        Ver loja →
                                      </span>
                                  </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </ng-template>
              </p-dataview>
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

      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .line-clamp-5 {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      :host ::ng-deep .p-dataview,
      :host ::ng-deep .p-dataview-content {
        background: transparent;
        border: none;
      }

      /* Tags de especialidade: bordas bem arredondadas (pill) */
      :host ::ng-deep p-tag.especialidade-tag,
      :host ::ng-deep p-tag.especialidade-tag .p-tag,
      :host ::ng-deep .especialidade-tag.p-tag,
      :host ::ng-deep .especialidade-tag .p-tag {
        border-radius: 15px !important;
      }

      /* PrimeNG aplica cor própria no .p-tag — força fundo e texto sólidos da paleta */
      :host ::ng-deep p-tag.especialidade-tag .p-tag,
      :host ::ng-deep .especialidade-tag.p-tag {
        background-color: #7a4f22 !important;
        color: #e9d7b8 !important;
        border-color: #c58b3d !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .card-artesao-link {
          transition: none;
        }
        .card-artesao-link:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class PaginaExplorarComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);
  private lojas = signal<LojaResponse[]>([]);
  private resultadoPaginado = signal<any>(null);

  /** Lista de lojas exatamente como retornada pelo backend (sem filtro/ordenação no front). */
  artesoesFiltrados = computed(() => this.lojas());

  termoBusca = signal('');
  paginaAtual = signal(0);
  private debounceCarregar: ReturnType<typeof setTimeout> | null = null;
  private readonly PAGE_SIZE = 100;


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

  /** Total de elementos retornado pelo backend (para o contador). */
  totalElementos = computed(() => {
    const res = this.resultadoPaginado();
    return res?.totalElements ?? this.lojas().length;
  });

  atualizarBusca(termo: string) {
    this.termoBusca.set(termo);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pesquisa: termo || null },
      queryParamsHandling: 'merge',
    });
    this.carregarArtesoesComDebounce();
  }

  private carregarArtesoesComDebounce() {
    if (this.debounceCarregar != null) clearTimeout(this.debounceCarregar);
    this.debounceCarregar = setTimeout(() => {
      this.debounceCarregar = null;
      this.carregarArtesoes();
    }, 400);
  }

  private carregarArtesoes() {
    const filtro = this.termoBusca().trim() || undefined;
    const page = this.paginaAtual();
    this.artesaoService.listarLojas(filtro, page, this.PAGE_SIZE).subscribe({
      next: (resultado) => {
        this.resultadoPaginado.set(resultado);
        console.log(resultado);
        this.lojas.set(resultado.content);
      },
      error: (error) => {
        console.error('Erro ao carregar lojas:', error);
        this.lojas.set([]);
      }
    });
  }

  private readonly CDN_BASE = 'http://localhost:8080';
  private readonly IMAGEM_PADRAO = this.CDN_BASE + '/cdn/default.png';

  /** URL da imagem de capa (header) em largura total do card. */
  urlImagemHeader(loja: LojaResponse): string {
    const caminho = loja.caminhoImagemHeader;
    if (!caminho?.trim()) {
      return this.IMAGEM_PADRAO;
    }
    if (caminho.startsWith('http://') || caminho.startsWith('https://')) {
      return caminho;
    }
    return caminho.startsWith('/') ? this.CDN_BASE + caminho : this.CDN_BASE + '/' + caminho;
  }

  /** URL da foto de perfil (resolvida ou padrão). */
  urlImagemPerfil(loja: LojaResponse): string {
    const caminho = loja.caminhoImagemPerfil;
    if (!caminho?.trim()) {
      return 'assets/images/DTavern-icone.png';
    }
    if (caminho.startsWith('http://') || caminho.startsWith('https://')) {
      return caminho;
    }
    return caminho.startsWith('/') ? this.CDN_BASE + caminho : this.CDN_BASE + '/' + caminho;
  }

}
