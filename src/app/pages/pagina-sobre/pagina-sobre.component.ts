import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-sobre',
  standalone: true,
  imports: [CommonModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
  template: `
    <div class="min-h-screen bg-tavern-wood font-body">
      <app-barra-navegacao [isFixed]="false" />

      <main class="py-10 md:py-14">
        <div class="container mx-auto px-4 max-w-3xl">
          <article
            class="pergaminho space-y-8 bg-scroll-beige border-2 border-brass-accent/50 rounded-sm p-6 md:p-10 md:px-12 text-midnight-brown shadow-[0_8px_32px_rgba(28,15,10,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]"
          >
            <header class="pb-6 border-b border-midnight-brown/15">
              <p class="text-midnight-brown/85 text-sm md:text-base leading-relaxed mb-6 italic text-left">
                À quem possa interessar...
              </p>
              <h1 class="font-medieval text-3xl md:text-4xl font-bold text-midnight-brown mb-3 text-center">
                Sobre o DTavern
              </h1>
            </header>

            <section id="historia" class="scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Nossa história
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </section>

            <section id="origem" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Como o DTavern foi criado
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                Integer in mauris eu nibh euismod gravida.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit
                amet augue congue elementum.
              </p>
            </section>

            <section id="objetivos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Objetivos e propósito
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam
                ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod
                lacus luctus magna.
              </p>
              <ul
                class="list-disc list-inside text-sm md:text-base leading-relaxed space-y-2 pl-1 text-midnight-brown/90 marker:text-midnight-brown/50"
              >
                <li>Quisque volutpat condimentum velit class aptent taciti sociosqu ad litora.</li>
                <li>Fusce suscipit varius mi cum sociis natoque penatibus et magnis dis parturient.</li>
                <li>Nulla quis sem at nibh elementum imperdiet duis sagittis ipsum praesent mauris.</li>
              </ul>
            </section>

            <section id="comunidade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Comunidade e futuro
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Etiam
                porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo,
                tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non
                mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.
              </p>
            </section>

            <footer class="assinatura-carta pt-10 mt-2 border-t border-midnight-brown/20 text-midnight-brown">
              <p class="text-sm md:text-base italic text-midnight-brown/75 mb-8">
                Com votos de boas mesas e histórias memoráveis,
              </p>
              <div class="flex flex-col items-end gap-1 pr-1 md:pr-4">
                <span class="font-medieval text-2xl md:text-3xl font-semibold tracking-wide text-midnight-brown">
                  DTavern
                </span>
                <span class="text-xs md:text-sm text-midnight-brown/65 uppercase tracking-[0.2em]">
                  A taverna digital
                </span>
                <span
                  class="mt-6 block h-px w-40 bg-gradient-to-r from-transparent via-midnight-brown/40 to-midnight-brown/70"
                  aria-hidden="true"
                ></span>
              </div>
            </footer>
          </article>

          <p class="mt-8 text-center">
            <a
              routerLink="/"
              class="text-candlelight-gold hover:text-scroll-beige text-sm font-medium transition-colors"
            >
              ← Voltar ao início
            </a>
          </p>
        </div>
      </main>

      <app-rodape />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .pergaminho {
        background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.14) 0%,
          transparent 35%,
          transparent 65%,
          rgba(28, 15, 10, 0.06) 100%
        );
      }
    `
  ]
})
export class PaginaSobreComponent {}
