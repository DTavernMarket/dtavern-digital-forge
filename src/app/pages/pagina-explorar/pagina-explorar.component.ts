import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ArtesaoService } from '../../services/artesao.service';
import { LojaResponse } from '../../models/artesao.model';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    CommonModule,
    DataView,
    Tag,
    ButtonModule,
    SelectButton,
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
                class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 sticky top-32"
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
            <div class="flex-1 flex flex-col gap-4">
              <!-- DataView de Lojas -->
              <div class="bg-midnight-brown/40 border border-brass-accent/30 rounded-lg p-4">
                <p-dataview [value]="artesoesFiltrados()" [layout]="layout">
                  <ng-template pTemplate="header">
                    <div class="flex justify-end">
                      <p-selectButton
                        [(ngModel)]="layout"
                        [options]="layoutOptions"
                        [allowEmpty]="false"
                        class="bg-stone-gray/30 rounded-md"
                      >
                        <ng-template pTemplate="item" let-item>
                          <i class="pi" [ngClass]="{ 'pi-bars': item === 'list', 'pi-table': item === 'grid' }"></i>
                        </ng-template>
                      </p-selectButton>
                    </div>
                  </ng-template>

                  <!-- Layout em lista (horizontal) -->
                  <ng-template pTemplate="list" let-items>
                    <div *ngFor="let loja of items" class="border-b border-brass-accent/20 last:border-b-0">
                      <div
                        class="flex flex-col md:flex-row md:items-center gap-4 p-4 cursor-pointer hover:bg-tavern-wood/40 transition-colors rounded-lg"
                        [routerLink]="['/lojas', loja.dominio]"
                      >
                        <!-- Foto de perfil da Loja -->
                        <div class="flex-shrink-0">
                          <div
                            class="relative w-28 h-28 md:w-32 md:h-32 bg-tavern-wood/20 rounded-lg overflow-hidden flex items-center justify-center"
                          >
                            <img
                              [src]="urlImagemPerfil(loja)"
                              [alt]="loja.nome"
                              class="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <!-- Informações da Loja -->
                        <div class="flex-1 min-w-0 flex flex-col gap-2">
                          <div class="flex items-center justify-between gap-3">
                            <div>
                              <h3
                                class="text-lg md:text-xl font-semibold text-scroll-beige hover:text-candlelight-gold transition-colors"
                              >
                                {{ loja.nome }}
                              </h3>
                              <p class="text-sm text-scroll-beige/60">@{{ loja.dominio }}</p>
                            </div>
                            <div class="text-right text-xs text-scroll-beige/60 whitespace-nowrap">
                              <span class="block">
                                {{ loja.quantidadeProdutos || 0 }} produtos
                              </span>
                            </div>
                          </div>

                          <p class="text-sm text-scroll-beige/70 line-clamp-2">
                            {{ loja.descricao || 'Sem descrição disponível' }}
                          </p>

                          <div
                            *ngIf="loja.especialidades && loja.especialidades.length"
                            class="flex flex-wrap gap-2 pt-1"
                          >
                            <p-tag
                              *ngFor="let esp of loja.especialidades; trackBy: rastrearEspecialidade"
                              [value]="esp.nome"
                              severity="warn"
                              class="!bg-brass-accent/20 !border-brass-accent/40 !text-candlelight-gold text-xs"
                            ></p-tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ng-template>

                  <!-- Layout em grid -->
                  <ng-template pTemplate="grid" let-items>
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div
                        *ngFor="let loja of items"
                        class="bg-midnight-brown/60 border border-brass-accent/30 rounded-lg p-4 flex flex-col gap-3 hover:border-candlelight-gold/60 hover:shadow-lg transition-all cursor-pointer"
                        [routerLink]="['/lojas', loja.dominio]"
                      >
                        <div class="flex justify-center">
                          <div
                            class="relative w-32 h-32 bg-tavern-wood/20 rounded-full overflow-hidden flex items-center justify-center"
                          >
                            <img
                              [src]="urlImagemPerfil(loja)"
                              [alt]="loja.nome"
                              class="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div class="flex flex-col gap-2 text-center">
                          <div>
                            <div
                              class="text-lg font-semibold text-scroll-beige hover:text-candlelight-gold transition-colors"
                            >
                              {{ loja.nome }}
                            </div>
                            <div class="text-xs text-scroll-beige/60">@{{ loja.dominio }}</div>
                          </div>

                          <p class="text-sm text-scroll-beige/70 line-clamp-2">
                            {{ loja.descricao || 'Sem descrição disponível' }}
                          </p>

                          <div
                            *ngIf="loja.especialidades && loja.especialidades.length"
                            class="flex flex-wrap gap-2 justify-center pt-1"
                          >
                            <p-tag
                              *ngFor="let esp of loja.especialidades; trackBy: rastrearEspecialidade"
                              [value]="esp.nome"
                              severity="warn"
                              class="!bg-brass-accent/20 !border-brass-accent/40 !text-candlelight-gold text-xs"
                            ></p-tag>
                          </div>

                          <div class="mt-2 text-xs text-scroll-beige/60">
                            {{ loja.quantidadeProdutos || 0 }} produtos disponíveis
                          </div>
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </p-dataview>
              </div>

              <!-- Estado Vazio -->
              <div *ngIf="artesoesFiltrados().length === 0" class="text-center py-12">
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
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                   />
                 </svg>
                 <h3 class="text-xl font-semibold text-scroll-beige mb-2">
                   Nenhum artesão encontrado
                 </h3>
                 <p class="text-scroll-beige/60">Tente ajustar os termos de busca.</p>
               </div>
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
    `,
  ],
})
export class PaginaExplorarComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);
  private lojas = signal<LojaResponse[]>([]);
  private resultadoPaginado = signal<any>(null);

  /** Lista de lojas exatamente como retornada pelo backend (sem filtro/ordenação no front). */
  artesoesFiltrados = computed(() => this.lojas());

  rastrearLoja(_index: number, loja: LojaResponse) {
    return loja.dominio;
  }

  rastrearEspecialidade(_index: number, esp: { codigo: string; nome: string }) {
    return esp.codigo;
  }

  // Layout do DataView (lista ou grid)
  layout: 'list' | 'grid' = 'list';
  layoutOptions: ('list' | 'grid')[] = ['list', 'grid'];

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

  /** Retorna a URL da imagem de perfil da loja (resolvida ou padrão). */
  urlImagemPerfil(loja: LojaResponse): string {
    const caminho = loja.caminhoImagemPerfil;
    if (!caminho?.trim()) return this.IMAGEM_PADRAO;
    if (caminho.startsWith('http://') || caminho.startsWith('https://')) return caminho;
    return caminho.startsWith('/') ? this.CDN_BASE + caminho : this.CDN_BASE + '/' + caminho;
  }

}
