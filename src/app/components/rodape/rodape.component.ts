import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="rodape">
      <div class="container mx-auto px-4">
        <div class="rodape__conteudo grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div class="rodape__bloco rodape__bloco--identidade">
            <div class="flex items-center">
              <img
                src="assets/images/dtavern/IMAGEOTIPO HORIZONTAL/PRINCIPAL.svg"
                alt="DTavern"
                class="h-10 w-auto object-contain"
              />
            </div>
            <p class="rodape__descricao">
              Sua loja de RPG pronta para vender. Publique seus produtos digitais e compartilhe um
              link unico com sua comunidade.
            </p>
          </div>

          <div class="rodape__bloco">
            <h3 class="rodape__titulo">Links Rápidos</h3>
            <ul class="rodape__lista">
              <li>
                <a [routerLink]="['/cadastro']" [queryParams]="{ cadastro: 'artesao' }" class="rodape__link">
                  Criar minha loja
                </a>
              </li>
              <li>
                <a routerLink="/login" class="rodape__link">
                  Entrar
                </a>
              </li>
              <li>
                <a routerLink="/sobre" class="rodape__link">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          <div class="rodape__bloco">
            <h3 class="rodape__titulo">Para Artesãos</h3>
            <ul class="rodape__lista">
              <li><span class="rodape__texto">Crie sua loja</span></li>
              <li><span class="rodape__texto">Publique seus produtos</span></li>
              <li><span class="rodape__texto">Receba pagamentos via PIX</span></li>
              <li><span class="rodape__texto">Entregue arquivos digitais</span></li>
            </ul>
          </div>

          <div class="rodape__bloco">
            <h3 class="rodape__titulo">Contato</h3>
            <div class="rodape__contato">
              <p>contato@dtavern.com</p>
              <p>Suporte: suporte@dtavern.com</p>
              <p>Horário: Seg-Sex, 9h-18h</p>
            </div>
            <div class="pt-3">
              <button
                routerLink="/em-desenvolvimento"
                class="rodape__botao-contato"
              >
                Fale Conosco
              </button>
            </div>
          </div>
        </div>

        <div class="rodape__legal">
          <div class="rodape__linha" aria-hidden="true"></div>
          <div class="rodape__legal-conteudo">
            <div class="rodape__copyright">
              © {{ anoAtual }} DTavern. Todos os direitos reservados.
            </div>
            <div class="rodape__legal-links">
              <a routerLink="/termos-uso" class="rodape__link">Termos de Uso</a>
              <a routerLink="/politica-privacidade" class="rodape__link">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }

    .rodape {
      background: rgba(28, 15, 10, 0.9);
      backdrop-filter: blur(4px);
      border-top: 1px solid rgba(197, 139, 61, 0.28);
    }

    .rodape__conteudo {
      padding-top: 1.75rem;
      padding-bottom: 1.4rem;
      gap: 1.5rem;
    }

    .rodape__bloco {
      min-width: 0;
    }

    .rodape__bloco--identidade {
      max-width: 20rem;
    }

    .rodape__titulo {
      color: #e9d7b8;
      font-size: 1rem;
      line-height: 1.3;
      font-weight: 600;
      margin-bottom: 0.45rem;
    }

    .rodape__descricao,
    .rodape__texto,
    .rodape__contato {
      color: rgba(233, 215, 184, 0.7);
      font-size: 0.78rem;
      line-height: 1.65;
    }

    .rodape__lista {
      display: grid;
      gap: 0.3rem;
    }

    .rodape__contato {
      display: grid;
      gap: 0.3rem;
    }

    .rodape__link {
      color: rgba(233, 215, 184, 0.68);
      transition: color 180ms ease;
      text-decoration: none;
      outline: none;
    }

    .rodape__link:hover {
      color: rgba(255, 211, 106, 0.95);
    }

    .rodape__link:focus-visible {
      color: rgba(255, 211, 106, 0.98);
      border-radius: 0.25rem;
      box-shadow: 0 0 0 2px rgba(255, 211, 106, 0.35);
    }

    .rodape__botao-contato {
      border: 1px solid rgba(197, 139, 61, 0.5);
      background: rgba(75, 46, 25, 0.55);
      color: rgba(233, 215, 184, 0.9);
      padding: 0.48rem 0.88rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
    }

    .rodape__botao-contato:hover {
      background: rgba(75, 46, 25, 0.75);
      border-color: rgba(255, 211, 106, 0.45);
      color: #e9d7b8;
    }

    .rodape__botao-contato:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 211, 106, 0.4);
      border-color: rgba(255, 211, 106, 0.6);
    }

    .rodape__legal {
      padding-bottom: 1rem;
    }

    .rodape__linha {
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(197, 139, 61, 0.22) 18%,
        rgba(197, 139, 61, 0.35) 50%,
        rgba(197, 139, 61, 0.22) 82%,
        transparent 100%
      );
    }

    .rodape__legal-conteudo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding-top: 0.95rem;
    }

    .rodape__copyright {
      color: rgba(233, 215, 184, 0.64);
      font-size: 0.75rem;
      text-align: center;
      line-height: 1.45;
    }

    .rodape__legal-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.4rem 1.25rem;
      font-size: 0.75rem;
      line-height: 1.4;
    }

    @media (min-width: 768px) {
      .rodape__conteudo {
        padding-top: 2rem;
        padding-bottom: 1.55rem;
        gap: 1.7rem 2.2rem;
      }

      .rodape__legal-conteudo {
        flex-direction: row;
        align-items: center;
        gap: 1.25rem;
      }
    }

    @media (min-width: 1024px) {
      .rodape__conteudo {
        gap: 1.8rem 2.7rem;
      }
    }
  `]
})
export class RodapeComponent {
  readonly anoAtual = new Date().getFullYear();
}
