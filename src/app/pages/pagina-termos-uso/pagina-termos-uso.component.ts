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
                Última atualização: 26/09/2026
              </p>
            </header>

            <section id="aceitacao" class="scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Aceitação dos termos
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Ao criar uma conta, navegar ou comprar conteúdo no DTavern, você concorda com estes Termos
                de Uso e com a Política de Privacidade. Se não concordar, não utilize a plataforma.
              </p>
            </section>

            <section id="uso-plataforma" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Uso da plataforma
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                O DTavern conecta criadores e compradores de conteúdo digital de RPG. O usuário se compromete
                a utilizar a plataforma de forma legal, ética e compatível com estes termos.
              </p>
              <ul
                class="list-disc list-inside text-sm md:text-base leading-relaxed space-y-2 pl-1 text-midnight-brown/90 marker:text-midnight-brown/50"
              >
                <li>Não publique conteúdo ilícito, ofensivo, fraudulento ou que viole direitos de terceiros.</li>
                <li>Não tente invadir, burlar ou comprometer a segurança da aplicação.</li>
                <li>Não utilize robôs ou automações para sobrecarregar ou manipular a plataforma.</li>
              </ul>
            </section>

            <section id="contas" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Contas e responsabilidades
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Você é responsável pelas informações fornecidas no cadastro, pelo sigilo de suas credenciais
                e por todas as ações realizadas na sua conta.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                O DTavern pode suspender ou encerrar contas que descumpram estes termos, pratiquem fraude
                ou causem risco operacional, jurídico ou de segurança.
              </p>
            </section>

            <section id="propriedade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Conteúdo e propriedade intelectual
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Cada criador é responsável pelo conteúdo que publica e declara possuir os direitos necessários
                para comercialização. O comprador recebe uma licença de uso pessoal do material adquirido, sem
                transferência de titularidade intelectual, salvo indicação expressa do criador.
              </p>
            </section>

            <section id="limitacao" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Pagamentos, entrega digital e estornos
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Produtos pagos utilizam PIX como meio de pagamento. O acesso ao download é liberado após
                confirmação do pagamento no sistema.
              </p>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Pedidos com pagamento recusado, expirado ou não confirmado não geram acesso ao conteúdo.
                Solicitações de cancelamento e reembolso serão avaliadas conforme regras do produto, legislação
                aplicável e análise antifraude.
              </p>
            </section>

            <section id="alteracoes-termos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Alterações destes termos
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                O DTavern pode atualizar estes termos para refletir mudanças de produto, operacionais ou legais.
                A versão mais recente ficará sempre disponível nesta página.
              </p>
            </section>

            <section id="contato-termos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Contato
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Para suporte, dúvidas ou solicitações sobre estes termos, entre em contato por
                <strong> suporte@dtavern.com </strong> ou <strong> contato@dtavern.com </strong>.
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
