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
              <p class="text-center text-xs md:text-sm text-midnight-brown/65">
                Saiba mais sobre a história da nossa taverna digital
              </p>
            </header>

            <section id="origem" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Como o DTavern foi criado
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                No início de 2023, o fundador do DTavern, 
                <a class="underline" href="https://www.linkedin.com/in/marcos-daniel-7382521ab/" target="_blank">Marcos Daniel</a>,
                 estava procurando uma missão inicial gratuita de Ordem Paranormal para mestrar para os seus amigos. Apesar de ter encontrado
                 conteúdos muito bons principalmente em sites de Crowdfundings, todos que encontrou eram pagos. Então, ele pensou "Vou criar a minha própria missão
                 e disponibilizar ela gratuitamente, para que as pessoas que passaram pelo mesmo problema que eu possam usar em suas mesas!".
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                A ideia inicial era criar uma conta no Twitter para disponibilizar conteúdos gratuitamente. Dessa forma,
                as pessoas não teriam dúvidas quando tivessem que pesquisar sobre missões e conteúdos gratuitos de RPG. Elas
                iriam procurar diretamente nessa conta do Twitter. O intuito era facilitar a busca desse tipo de conteúdo, ter um 
                lugar só para isso.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Porém, depois de pensar um pouco mais, ele percebeu que ao invés de criar uma conta em uma rede social, ele poderia 
                fazer um site que concentrasse todos esses conteúdos de RPG em um único lugar. Nesse site, outras pessoas poderiam
                compartilhar seus conteúdos da forma que quisessem, sejam eles gratuitos ou não. Então, no dia 31/05/2023 um grupo de whatsapp
                com o nome "DTavern" foi criado, marcando o início oficial do projeto.
              </p>
            </section>

            <section id="objetivos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Objetivos e propósito
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                O propósito do DTavern é "Ajudar a criar experiências memoráveis e inesquecíveis para os jogadores de RPG".
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
export class PaginaSobreComponent { }
