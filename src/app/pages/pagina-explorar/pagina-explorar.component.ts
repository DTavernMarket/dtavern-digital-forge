import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ArtesaoService } from '../../services/artesao.service';
import { LojaResponse } from '../../models/artesao.model';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
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
             <div class="flex-1">
               <!-- Lista de Artesãos em Formato Horizontal -->
               <div class="space-y-4">
                 <div
                   *ngFor="let loja of artesoesFiltrados(); trackBy: rastrearLoja"
                   class="bg-midnight-brown/50 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                   [routerLink]="['/lojas', loja.dominio]"
                 >
                  <div class="flex space-x-6">
                    <!-- Foto de perfil da Loja -->
                    <div class="flex-shrink-0">
                      <div class="relative w-32 h-32 bg-tavern-wood/20 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          [src]="urlImagemPerfil(loja)"
                          [alt]="loja.nome"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <!-- Informações da Loja -->
                    <div class="flex-1 min-w-0">
                      <div class="space-y-3">
                        <!-- Nome -->
                        <div>
                          <h3
                            class="text-xl font-semibold text-scroll-beige hover:text-candlelight-gold transition-colors"
                          >
                            {{ loja.nome }}
                          </h3>
                        </div>

                        <!-- Descrição -->
                        <p class="text-sm text-scroll-beige/70 line-clamp-2">
                          {{ loja.descricao || 'Sem descrição disponível' }}
                        </p>

                        <!-- Domínio -->
                        <div class="pt-1">
                          <p class="text-sm text-scroll-beige/60">
                            @{{ loja.dominio }}
                          </p>
                        </div>

                        <!-- Especialidades -->
                        <div *ngIf="loja.especialidades && loja.especialidades.length" class="flex flex-wrap gap-2 pt-2">
                          <span
                            *ngFor="let esp of loja.especialidades; trackBy: rastrearEspecialidade"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-brass-accent/20 text-candlelight-gold border border-brass-accent/40"
                          >
                            {{ esp.nome }}
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
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
