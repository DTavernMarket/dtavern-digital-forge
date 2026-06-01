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
            <header>
              <p class="text-midnight-brown/85 text-sm md:text-base leading-relaxed mb-6 italic text-left">
                A quem possa interessar...
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
                
                <a class="underline" href="https://www.linkedin.com/in/marcos-coelho-7382521ab" target="_blank">Marcos Daniel</a>,
                 estava procurando uma missão inicial gratuita de Ordem Paranormal para mestrar para os seus amigos. Depois de horas procurando, ele percebeu que haviam vários conteúdos em sites diferentes,
                 principalmente em sites de Crowdfundings,  mas todos eram pagos. Foi então que surgiu um pensamento simples: "E se eu criar a minha própria missão... e disponibilizar ela de graça, 
                 para que ninguém precise passar por isso de novo?" A ideia inicial era criar uma conta no Twitter para reunir conteúdos gratuitos em um só lugar.
                  Mas, com o tempo, ficou claro que isso não era suficiente.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
              Ao invés de depender de uma rede social, por que não criar um espaço próprio? Um lugar onde qualquer pessoa pudesse compartilhar seus conteúdos de RPG — gratuitos ou pagos — de forma organizada,
               acessível e centralizada. Foi assim que nasceu o DTavern. <p>
                <p> E então, no dia 31/05/2023 um grupo de whatsapp foi criado com o nome "DTavern",
                   marcando o início oficial do projeto.
              </p>
            </section>

            <section id="objetivos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Propósito e objetivos
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                O propósito do DTavern é "Ajudar a criar experiências memoráveis e inesquecíveis para os jogadores de RPG e tornar o RPG de mesa mais acessível para todos".
              </p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">Nosso objetivo inicial é se tornar a maior plataforma de conteúdos não-oficiais e digitais de RPG do Brasil.</p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">Queremos criar um lugar onde:</p>
              <ul
                class="list-disc list-inside text-sm md:text-base leading-relaxed space-y-2 pl-1 text-midnight-brown/90 marker:text-midnight-brown/50"
              >
                <li>Criadores possam publicar, vender e crescer com seus conteúdos
                <ul class="list-[circle] pl-10 mt-1 space-y-1">
                  <li>Novos criadores dão seus primeiros passos vendendo seus produtos</li>
                  <li>Grandes criadores constroem suas próprias lojas virtuais</li>
                </ul>
                </li>
                <li>Mestres encontrem tudo o que precisam em um só lugar</li>
                <li>Jogadores tenham acesso a experiências cada vez mais ricas</li>
                <li>A comunidade descobre, avalia e recomenda materiais</li>
              </ul>
            </section>

            <section id="comunidade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Comunidade e futuro
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                
              </p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
              Nos próximos passos do projeto, queremos expandir o DTavern para oferecer muito mais do que compra e venda de produtos. 
            </p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
              Os criadores poderão ter suas próprias lojas dentro da plataforma, construindo sua identidade,
               reunindo seus conteúdos e criando uma base fiel de seguidores. Além disso, <span class="font-bold"> sistemas de avaliação 
               e comentários </span> permitirão que a comunidade descubra conteúdos de qualidade com base na experiência de outros jogadores.
            </p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">Também planejamos implementar formas de apoiar criadores de maneira contínua, como <span class="font-bold"> assinaturas mensais </span>, onde jogadores 
                poderão acompanhar e receber novos conteúdos diretamente de seus criadores favoritos.
              </p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
              Queremos abrir espaço para que artistas e criadores possam oferecer <span class="font-bold"> serviços personalizados  sob demanda </span>, permitindo que mestres encomendem mapas, tokens,
               trilhas sonoras e outros recursos personalizados para suas campanhas.
              </p>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Hoje já é possível buscar por lojas de criadores de produtos, mas ainda não é possível <span class="font-bold">buscar por produtos</span> de forma geral.
                Esta vai ser uma das primeira coisas que vamos planejamos implementar.
              </p>

              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">Se você cria, joga ou vive RPG de mesa de alguma forma, o DTavern foi feito para você.</p>
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
