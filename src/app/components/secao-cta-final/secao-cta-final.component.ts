import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secao-cta-final',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="cta-final" class="py-20 bg-ash-smoke/25 border-t border-brass-accent/20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h2 class="text-3xl md:text-5xl font-medieval font-bold text-scroll-beige">
            Pronto para sua proxima aventura?
          </h2>

          <p class="text-lg text-scroll-beige/80 max-w-3xl mx-auto leading-relaxed">
            Escolha seu caminho: encontre materiais para jogar hoje ou publique seu conteudo e
            comece a vender para a comunidade.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a
              routerLink="/explorar"
              class="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-candlelight-gold text-tavern-wood font-semibold hover:bg-warm-amber hover:shadow-xl transition-all duration-300 text-lg"
            >
              Explorar produtos
            </a>

            <a
              [routerLink]="['/cadastro']"
              [queryParams]="{ cadastro: 'artesao' }"
              class="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-candlelight-gold text-candlelight-gold font-semibold hover:bg-candlelight-gold hover:text-tavern-wood transition-all duration-300 text-lg"
            >
              Abrir minha loja
            </a>
          </div>
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
export class SecaoCtaFinalComponent {}
