import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtesaoService } from '../../services/artesao.service';
import { Artesao } from '../../models/artesao.model';
import { BotaoPadraoComponent } from '../botao-padrao/botao-padrao.component';

@Component({
  selector: 'app-secao-artesoes',
  standalone: true,
  imports: [CommonModule, RouterModule, BotaoPadraoComponent],
  template: `
    <section id="artesaos" class="py-20 bg-ash-smoke/30">
      <div class="container mx-auto px-4">
        <!-- Cabeçalho da Seção -->
        <div class="text-center mb-6 space-y-4">
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            Conheça os
            <span class="text-candlelight-gold"> Artesãos </span>
          </h2>

          <p class="text-lg text-scroll-beige/70 max-w-2xl mx-auto">
            Artistas talentosos que se dedicam a criar experiências únicas para suas aventuras de
            RPG.
          </p>
        </div>

        <!-- Grid de Artesãos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <a
            *ngFor="let artesao of artesoesEmDestaque(); trackBy: rastrearArtesao"
            [routerLink]="['/lojas', artesao.dominio]"
            class="group block bg-midnight-brown/90 backdrop-blur-sm border border-brass-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer no-underline"
          >
                         <!-- Avatar e Informações Básicas -->
             <div class="text-center mb-6 relative overflow-hidden rounded-lg h-32">
               <!-- Background do Artesão (header da loja) -->
               <div
                 class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
                 [style.background-image]="'url(' + urlImagemHeader(artesao) + ')'"
               ></div>

               <div class="relative z-10 h-full flex items-center justify-center">
                 <div class="relative">
                   <img
                     [src]="urlImagemPerfil(artesao)"
                     [alt]="artesao.nome"
                     class="bg-scroll-beige w-24 h-24 rounded-lg object-cover mx-auto border-4 border-brass-accent/30"
                   />
                 </div>
               </div>
             </div>
                         <h3
               class="text-xl font-semibold text-scroll-beige group-hover:text-candlelight-gold transition-colors text-center"
             >
               {{ artesao.nome }}
             </h3>

             <!-- Resumo -->
             <p class="text-center text-scroll-beige/70 mb-6 line-clamp-3">
              {{ artesao.resumo }}
              </p>
              
              <div class="flex items-center space-x-1 mt-2">
              </div>
             <!-- Especialidades -->
             <div class="mb-6">
               <h4 class="text-sm font-semibold text-scroll-beige mb-3">Especialidades:</h4>
               <div class="flex flex-wrap gap-2">
                @for(especialidade of artesao.especialidades; track especialidade.codigo){
                  <span
                    class="px-3 py-1 bg-candlelight-gold/20 text-candlelight-gold text-xs rounded-full border border-candlelight-gold/30"
                  >
                    {{ especialidade.nome }}
                  </span>
                }
               </div>
             </div>

            <!-- Estatísticas -->
            <div class="flex justify-center">
              <div class="text-center w-[75%]">
                <div class="bg-scroll-beige/20 rounded-lg p-3">
                  <div class="text-lg font-bold text-candlelight-gold">{{ artesao.quantidadeProdutos }}</div>
                  <div class="text-xs text-candlelight-gold">Produtos</div>
                </div>
              </div>
            </div>
          </a>
        </div>

                 <!-- Botão Seja um Artesão -->
         <div class="text-center">
           <app-botao-padrao size="lg" [routerLink]="['/cadastro']" [queryParams]="{ cadastro: 'artesao' }">
             Seja um Artesão
             <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 stroke-width="2"
                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
               />
             </svg>
           </app-botao-padrao>
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
export class SecaoArtesoesComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);

  artesoesEmDestaque = signal<Artesao[]>([]);

  ngOnInit() {
    // Carregar artesões em destaque (primeira página, 3 resultados)
    this.artesaoService.listarLojas(undefined, 0, 3).subscribe({
      next: (resultado) => {
        const artesoes = resultado.content.map(loja => ({
          dominio: loja.dominio,
          nome: loja.nome,
          descricao: loja.descricao,
          resumo: loja.resumo,
          caminhoImagemPerfil: loja.caminhoImagemPerfil,
          caminhoImagemHeader: loja.caminhoImagemHeader,
          especialidades: loja.especialidades,
          quantidadeProdutos: loja.quantidadeProdutos,
        }));
        this.artesoesEmDestaque.set(artesoes);
      },
      error: (error) => {
        console.error('Erro ao carregar artesões:', error);
        this.artesoesEmDestaque.set([]);
      }
    });
  }

  rastrearArtesao(index: number, artesao: Artesao) {
    return artesao.dominio;
  }

  private readonly CDN_BASE = 'http://localhost:8080';
  private readonly IMAGEM_PADRAO = this.CDN_BASE + '/cdn/default.png';

  /** Retorna a URL da imagem de perfil (resolvida ou padrão). */
  urlImagemPerfil(artesao: Artesao): string {
    return this.resolverUrlImagem(artesao.caminhoImagemPerfil);
  }

  /** Retorna a URL da imagem de header (resolvida ou padrão). */
  urlImagemHeader(artesao: Artesao): string {
    return this.resolverUrlImagem(artesao.caminhoImagemHeader);
  }

  private resolverUrlImagem(caminho: string | undefined): string {
    if (!caminho?.trim()) return this.IMAGEM_PADRAO;
    if (caminho.startsWith('http://') || caminho.startsWith('https://')) return caminho;
    return caminho.startsWith('/') ? this.CDN_BASE + caminho : this.CDN_BASE + '/' + caminho;
  }
}
