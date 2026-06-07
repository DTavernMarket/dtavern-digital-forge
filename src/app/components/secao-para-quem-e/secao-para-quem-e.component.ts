import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secao-para-quem-e',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="para-quem-e" class="py-20 bg-ash-smoke/20">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            Para quem é o <span class="text-candlelight-gold">DTavern</span>
          </h2>
          <p class="text-lg text-scroll-beige/80 leading-relaxed">
            Dois caminhos, uma comunidade: quem busca material pronto para jogar e quem cria
            conteudo para vender.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article
            class="bg-midnight-brown/80 border border-brass-accent/30 rounded-xl p-8 flex flex-col h-full"
          >
            <span class="text-candlelight-gold font-semibold text-sm tracking-wide uppercase mb-4">
              Jogadores de RPG
            </span>
            <h3 class="text-2xl font-semibold text-scroll-beige mb-3">
              Encontre conteúdo pronto para sua mesa
            </h3>
            <p class="text-scroll-beige/75 mb-6">
              Cansado de gastar horas procurando material confiável? Na DTavern você descobre mapas,
              tokens e aventuras em um único lugar e compra com poucos cliques.
            </p>
            <div class="mt-auto">
              <a
                routerLink="/explorar"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-candlelight-gold text-tavern-wood font-semibold hover:bg-warm-amber transition-colors duration-300"
              >
                Explorar produtos
              </a>
            </div>
          </article>

          <article
            class="bg-midnight-brown/80 border border-brass-accent/30 rounded-xl p-8 flex flex-col h-full"
          >
            <span class="text-candlelight-gold font-semibold text-sm tracking-wide uppercase mb-4">
              Criadores e artesãos
            </span>
            <h3 class="text-2xl font-semibold text-scroll-beige mb-3">
              Transforme suas criacoes em renda
            </h3>
            <p class="text-scroll-beige/75 mb-6">
              Seu material merece visibilidade. Abra sua loja, publique seus arquivos e alcance
              jogadores e mestres que valorizam conteúdo de qualidade.
            </p>
            <div class="mt-auto">
              <a
                [routerLink]="['/cadastro']"
                [queryParams]="{ cadastro: 'artesao' }"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-candlelight-gold text-candlelight-gold font-semibold hover:bg-candlelight-gold hover:text-tavern-wood transition-all duration-300"
              >
                Abrir minha loja
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SecaoParaQuemEComponent {}
