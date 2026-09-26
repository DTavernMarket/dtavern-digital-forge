import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { ArtesaoService } from '../../services/artesao.service';
import { MeResponseLoja } from '../../models/auth.model';

@Component({
  selector: 'app-onboarding-artesao',
  standalone: true,
  imports: [CommonModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown flex flex-col">
      <app-barra-navegacao [isFixed]="false" />

      <section class="flex-1 py-10">
        <div class="container mx-auto px-4 max-w-4xl">
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-medieval font-bold text-scroll-beige mb-3">
              Sua loja foi criada com sucesso
            </h1>
            <p class="text-scroll-beige/75 text-lg">
              Agora faltam apenas 3 passos para começar a vender no DTavern.
            </p>
          </div>

          @if (carregando()) {
            <div class="flex justify-center py-16">
              <svg
                class="animate-spin h-8 w-8 text-candlelight-gold"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          } @else {
            <div class="grid gap-5">
              <article class="bg-midnight-brown/70 border border-brass-accent/30 rounded-xl p-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-candlelight-gold font-semibold text-sm uppercase tracking-wide mb-1">Passo 1</p>
                    <h2 class="text-xl font-semibold text-scroll-beige mb-2">Configure o perfil da sua loja</h2>
                    <p class="text-scroll-beige/75">
                      Atualize resumo, descrição, foto e capa para deixar sua página profissional.
                    </p>
                  </div>
                  <button
                    (click)="irParaMinhaLoja()"
                    class="px-4 py-2 rounded-lg border border-candlelight-gold text-candlelight-gold hover:bg-candlelight-gold hover:text-tavern-wood transition-colors whitespace-nowrap"
                  >
                    Abrir minha loja
                  </button>
                </div>
              </article>

              <article class="bg-midnight-brown/70 border border-brass-accent/30 rounded-xl p-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-candlelight-gold font-semibold text-sm uppercase tracking-wide mb-1">Passo 2</p>
                    <h2 class="text-xl font-semibold text-scroll-beige mb-2">Publique seu primeiro produto</h2>
                    <p class="text-scroll-beige/75">
                      Cadastre nome, preço, capa e arquivo de conteúdo para disponibilizar o produto.
                    </p>
                  </div>
                  <button
                    (click)="irParaNovoProduto()"
                    class="px-4 py-2 rounded-lg bg-candlelight-gold text-tavern-wood font-semibold hover:bg-warm-amber transition-colors whitespace-nowrap"
                  >
                    Novo produto
                  </button>
                </div>
              </article>

              <article class="bg-midnight-brown/70 border border-brass-accent/30 rounded-xl p-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-candlelight-gold font-semibold text-sm uppercase tracking-wide mb-1">Passo 3</p>
                    <h2 class="text-xl font-semibold text-scroll-beige mb-2">Copie e compartilhe seu link público</h2>
                    <p class="text-scroll-beige/75 mb-3">
                      Envie sua loja no Instagram, YouTube, Discord e onde sua comunidade estiver.
                    </p>
                    <code class="text-xs text-scroll-beige/80 break-all">{{ urlLojaPublica() }}</code>
                  </div>
                  <button
                    (click)="copiarUrlLoja()"
                    class="px-4 py-2 rounded-lg border border-candlelight-gold text-candlelight-gold hover:bg-candlelight-gold hover:text-tavern-wood transition-colors whitespace-nowrap"
                  >
                    {{ copiado() ? 'Copiado!' : 'Copiar link' }}
                  </button>
                </div>
              </article>
            </div>
          }
        </div>
      </section>

      <app-rodape />
    </div>
  `,
})
export class OnboardingArtesaoComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);
  private router = inject(Router);

  carregando = signal(true);
  minhaLoja = signal<MeResponseLoja | null>(null);
  copiado = signal(false);

  ngOnInit(): void {
    this.artesaoService.getMeLoja().subscribe({
      next: (loja) => {
        this.minhaLoja.set(loja);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.router.navigate(['/login']);
      },
    });
  }

  urlLojaPublica(): string {
    const dominio = this.minhaLoja()?.dominio;
    if (!dominio) {
      return '';
    }
    return `${window.location.origin}/lojas/${dominio}`;
  }

  copiarUrlLoja(): void {
    const url = this.urlLojaPublica();
    if (!url) return;

    navigator.clipboard.writeText(url).then(() => {
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 2000);
    });
  }

  irParaMinhaLoja(): void {
    const dominio = this.minhaLoja()?.dominio;
    if (!dominio) return;
    this.router.navigate(['/lojas', dominio]);
  }

  irParaNovoProduto(): void {
    this.router.navigate(['/novo-produto']);
  }
}
