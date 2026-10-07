import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

@Component({
  selector: 'app-pagina-termos-uso',
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
                Bem-vindo(a) ao DTavern.
              </p>
              <h1 class="font-medieval text-3xl md:text-4xl font-bold text-midnight-brown mb-3 text-center">
                Termos de uso
              </h1>
              <p class="text-center text-xs md:text-sm text-midnight-brown/65">
                Versão v0 · Vigência: 26/09/2026
              </p>
            </header>

            <section id="aceitacao" class="scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Aceitação dos termos
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Ao criar uma conta, navegar, publicar ou comprar conteúdo no DTavern, você concorda com
                estes Termos de Uso e com a
                <a routerLink="/politica-privacidade" class="underline hover:text-midnight-brown">
                  Política de Privacidade
                </a>.
                Se não concordar, não utilize a plataforma.
              </p>
            </section>

            <section id="quem-somos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Quem somos e papéis na plataforma
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                O DTavern é um marketplace digital de conteúdos independentes para RPG de mesa. A
                plataforma conecta criadores e compradores para publicação, comercialização e entrega
                de materiais digitais, como mapas, tokens, missões em PDF, trilhas e ilustrações.
              </p>
              <ul
                class="list-disc list-inside text-sm md:text-base leading-relaxed space-y-2 pl-1 text-midnight-brown/90 marker:text-midnight-brown/50"
              >
                <li>
                  <strong>Comprador:</strong> navega, adquire conteúdo e acessa o material pela
                  plataforma após a confirmação da compra ou quando o produto for gratuito.
                </li>
                <li>
                  <strong>Vendedor (loja/artesão):</strong> publica ofertas, declara ter direitos
                  suficientes sobre o que comercializa e entrega o arquivo digital correspondente.
                </li>
                <li>
                  <strong>Plataforma:</strong> disponibiliza a vitrine, o cadastro, o fluxo de compra
                  e a entrega digital. O DTavern não é o autor do conteúdo publicado por terceiros
                  e não concede licença sobre universos, marcas ou sistemas de RPG de titulares
                  externos.
                </li>
              </ul>
              <p class="text-sm md:text-base leading-relaxed mt-3 text-midnight-brown/90">
                O fluxo básico é: o vendedor publica o produto; o comprador conclui a compra
                (PIX, quando o item for pago, ou acesso direto, quando for gratuito); o download
                é liberado após a confirmação no sistema.
              </p>
            </section>

            <section id="obrigacoes-vendedor" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Obrigações do vendedor
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Quem publica ou vende no DTavern deve possuir direitos, autorizações ou licenças
                suficientes para todos os elementos da oferta: arquivo do produto, capa, descrição
                e material promocional, inclusive textos, imagens, marcas, músicas e obras de
                terceiros neles utilizados.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                O vendedor deve cumprir as restrições de cada licença aplicável, incluindo
                atribuições, avisos e selos quando exigidos. Ter acesso a um arquivo na internet
                ou ter adquirido um livro não basta, por si só, para revendê-lo ou redistribuí-lo
                na plataforma.
              </p>
            </section>

            <section id="condutas-proibidas" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Condutas proibidas
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                É proibido publicar, reproduzir ou revender, sem autorização, livros oficiais,
                scans, artes, mapas, textos, áudio, marcas e logotipos de terceiros. Também é
                proibido apresentar o anúncio de forma enganosa, como se o produto fosse oficial
                ou endossado pelo titular do sistema, da marca ou da obra.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Conteúdo ilícito, ofensivo, fraudulento ou que viole direitos de terceiros não
                pode ser oferecido. Tentativas de invadir, burlar a segurança ou sobrecarregar
                a plataforma por automações abusivas também são vedadas.
              </p>
            </section>

            <section id="sistemas-compativeis" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Sistemas compatíveis
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Indicar compatibilidade com D&amp;D, Tormenta20, Ordem Paranormal ou qualquer
                outro sistema não concede licença, não constitui autorização do titular e não
                significa aprovação do DTavern.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Um campo informativo de “sistema compatível”, se existir, é apenas referência
                para o comprador. Não representa cadastro prévio, selo, validação jurídica nem
                verificação da licença pelo DTavern. Conteúdo “não oficial” não recebe permissão
                automática: o vendedor precisa ter direitos próprios ou autorização suficiente
                para cada uso concreto.
              </p>
            </section>

            <section id="medidas-plataforma" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Medidas da plataforma
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Diante de denúncia ou indício fundamentado, o DTavern pode adotar medidas
                proporcionais, inclusive ocultar o anúncio, interromper novas compras e entregas,
                pedir informações ao vendedor, remover o produto e suspender ou encerrar a conta
                ou a loja.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Sempre que possível, haverá comunicação, oportunidade de contestação e
                reavaliação da decisão. Infrações graves podem justificar suspensão imediata.
                Essas medidas não significam que o DTavern analisa ou aprova previamente cada
                licença, nem prometem imunidade da plataforma perante terceiros.
              </p>
            </section>

            <section id="responsabilidade-vendedor" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Responsabilidade do vendedor
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                O vendedor responde contratualmente pelas declarações que faz e pelo conteúdo
                que fornece, inclusive capa, descrição e arquivos. O comprador recebe licença
                de uso pessoal do material adquirido, sem transferência de titularidade
                intelectual, salvo indicação expressa do criador.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                O DTavern pode cooperar com titulares de direitos e com autoridades nos limites
                legais. Isso não exclui a responsabilidade do vendedor nem garante ausência de
                responsabilidade da plataforma perante terceiros.
              </p>
            </section>

            <section id="pedidos-reembolsos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Pedidos anteriores, reembolsos e evidências
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Produtos pagos utilizam PIX. O acesso ao download é liberado após a confirmação
                do pagamento. Pedidos recusados, expirados ou não confirmados não geram acesso
                ao conteúdo.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Efeitos sobre compras já concluídas, reembolsos, valores ainda não repassados
                e preservação de evidências são tratados de forma separada da suspensão de
                novas vendas. Qualquer retenção financeira observa as regras de pagamento
                aplicáveis e análise caso a caso. O DTavern pode preservar registros necessários
                à apuração, sem apagar o histórico de compras ou pagamentos.
              </p>
            </section>

            <section id="alteracoes-termos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Alterações destes termos
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                O DTavern pode atualizar estes termos para refletir mudanças de produto,
                operacionais ou legais. A versão vigente, identificada no topo desta página,
                permanece sempre publicada aqui.
              </p>
            </section>

            <section id="contato-termos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Contato
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Para suporte, dúvidas ou solicitações sobre estes termos, entre em contato por
                <strong>suporte@dtavern.com</strong> ou <strong>contato@dtavern.com</strong>.
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
export class PaginaTermosUsoComponent {}
