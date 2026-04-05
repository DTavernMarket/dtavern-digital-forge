import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-politica-privacidade',
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
                Política de privacidade
              </h1>
              <p class="text-center text-xs md:text-sm text-midnight-brown/65">
                Texto genérico de exemplo — substitua por política alinhada à LGPD antes de publicar.
              </p>
            </header>

            <section id="introducao" class="scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Introdução
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esta política descreve, em
                linhas gerais, como tratamos dados pessoais no contexto do DTavern. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </section>

            <section id="dados-coletados" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Dados que podemos coletar
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Exemplos ilustrativos incluem identificação de conta, dados de
                contato e informações de uso da plataforma.
              </p>
              <ul
                class="list-disc list-inside text-sm md:text-base leading-relaxed space-y-2 pl-1 text-midnight-brown/90 marker:text-midnight-brown/50"
              >
                <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</li>
                <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</li>
                <li>Integer in mauris eu nibh euismod gravida vestibulum sapien.</li>
              </ul>
            </section>

            <section id="finalidades" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Finalidades do tratamento
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Nunc feugiat mi a tellus consequat imperdiet. Proin quam. Etiam ultrices. Os dados podem
                ser utilizados para prestação do serviço, melhorias, comunicações e cumprimento legal
                — lorem ipsum para preenchimento.
              </p>
            </section>

            <section id="cookies" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Cookies e tecnologias similares
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Etiam
                porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo,
                tortor mauris condimentum nibh.
              </p>
            </section>

            <section id="compartilhamento" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Compartilhamento de dados
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non
                mi porta gravida at eget metus. Pode haver compartilhamento com prestadores,
                autoridades ou parceiros quando necessário — texto placeholder.
              </p>
            </section>

            <section id="direitos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Seus direitos
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Cras mattis consectetur purus sit amet fermentum. Dependendo da legislação aplicável,
                você pode solicitar acesso, correção, exclusão ou outras medidas — consulte um
                advogado para redação definitiva.
              </p>
            </section>

            <section id="alteracoes-privacidade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Alterações nesta política
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Suspendisse in justo eu magna luctus suscipit. Sed lectus. Podemos atualizar este
                documento periodicamente; recomenda-se revisar esta página com regularidade.
              </p>
            </section>

            <section id="contato-privacidade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Contato sobre privacidade
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Para questões relacionadas a dados pessoais, utilize o canal oficial do DTavern (ex.:
                suporte@dtavern.com) — substitua por processo real quando disponível.
              </p>
            </section>

            <footer class="assinatura-carta pt-10 mt-2 border-t border-midnight-brown/20 text-midnight-brown">
              <p class="text-sm md:text-base italic text-midnight-brown/75 mb-8">
                Atenciosamente,
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
export class PaginaPoliticaPrivacidadeComponent {}
