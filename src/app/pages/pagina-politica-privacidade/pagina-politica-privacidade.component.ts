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
                Transparência no tratamento de dados.
              </p>
              <h1 class="font-medieval text-3xl md:text-4xl font-bold text-midnight-brown mb-3 text-center">
                Política de privacidade
              </h1>
              <p class="text-center text-xs md:text-sm text-midnight-brown/65">
                Última atualização: 26/09/2026
              </p>
            </header>

            <section id="introducao" class="scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Introdução
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Esta política explica como o DTavern coleta, utiliza, compartilha e protege dados pessoais
                de compradores e criadores, em conformidade com a legislação aplicável, incluindo a LGPD.
              </p>
            </section>

            <section id="dados-coletados" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Dados que podemos coletar
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Coletamos somente os dados necessários para cadastro, autenticação, operação da loja,
                processamento de pagamentos e suporte ao usuário.
              </p>
              <ul
                class="list-disc list-inside text-sm md:text-base leading-relaxed space-y-2 pl-1 text-midnight-brown/90 marker:text-midnight-brown/50"
              >
                <li>Dados de conta: nome, apelido, e-mail e informações de perfil.</li>
                <li>Dados operacionais: histórico de compras, vendas e arquivos disponibilizados.</li>
                <li>Dados técnicos: IP, tipo de dispositivo, navegador e registros de acesso.</li>
              </ul>
            </section>

            <section id="finalidades" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Finalidades do tratamento
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Os dados são utilizados para criar contas, autenticar usuários, permitir compras e vendas,
                disponibilizar downloads após pagamento confirmado, prevenir fraude e melhorar a experiência
                de uso da plataforma.
              </p>
            </section>

            <section id="cookies" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Cookies e tecnologias similares
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Podemos utilizar cookies e armazenamento local para manter sessão, lembrar preferências,
                aprimorar desempenho e medir métricas essenciais de uso. Você pode controlar cookies no
                navegador, ciente de que parte das funcionalidades pode ser afetada.
              </p>
            </section>

            <section id="compartilhamento" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Compartilhamento de dados
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Compartilhamos dados apenas quando necessário para operar o serviço, por exemplo com provedores
                de autenticação, processamento de pagamento, hospedagem de arquivos e obrigações legais.
                Não comercializamos dados pessoais.
              </p>
            </section>

            <section id="direitos" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Seus direitos
              </h2>
              <p class="text-sm md:text-base leading-relaxed mb-3 text-midnight-brown/90">
                Você pode solicitar acesso, correção, atualização e, quando aplicável, exclusão de dados
                pessoais, além de informações sobre tratamento e compartilhamento, conforme direitos previstos
                na LGPD.
              </p>
            </section>

            <section id="alteracoes-privacidade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Alterações nesta política
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Esta política pode ser atualizada periodicamente para refletir ajustes legais e evoluções
                do produto. A versão vigente estará sempre publicada nesta página.
              </p>
            </section>

            <section id="contato-privacidade" class="pt-2 border-t border-midnight-brown/15 scroll-mt-24">
              <h2 class="font-medieval text-xl md:text-2xl font-semibold text-midnight-brown mb-3">
                Contato sobre privacidade
              </h2>
              <p class="text-sm md:text-base leading-relaxed text-midnight-brown/90">
                Para solicitações relacionadas a dados pessoais e privacidade, entre em contato pelo
                e-mail <strong>suporte@dtavern.com</strong>.
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
