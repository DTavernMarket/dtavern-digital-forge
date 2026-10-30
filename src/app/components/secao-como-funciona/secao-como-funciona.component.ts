import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secao-como-funciona',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="como-funciona" class="secao-como-funciona relative overflow-hidden pt-24 pb-24">
      <div class="secao-como-funciona__bg" aria-hidden="true"></div>
      <div class="secao-como-funciona__top-divider" aria-hidden="true">
        <span class="secao-como-funciona__divider-line"></span>
        <span class="secao-como-funciona__divider-mark"></span>
        <span class="secao-como-funciona__divider-line secao-como-funciona__divider-line--invert"></span>
      </div>

      <div class="container relative z-10 mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-8 md:mb-12 space-y-4 md:space-y-5">
          <p class="secao-como-funciona__eyebrow">COMO FUNCIONA</p>

          <h2 class="secao-como-funciona__titulo">
            <span class="secao-como-funciona__destaque">Sua loja de RPG</span>, pronta para vender
          </h2>

          <p class="secao-como-funciona__subtitulo">
            Crie sua loja, publique seus materiais e venda conteúdos digitais de RPG com sua própria identidade.
          </p>

          <div class="secao-como-funciona__intro-divider" aria-hidden="true">
            <span class="secao-como-funciona__divider-line"></span>
            <span class="secao-como-funciona__divider-mark"></span>
            <span class="secao-como-funciona__divider-line secao-como-funciona__divider-line--invert"></span>
          </div>
        </div>

        <ol class="etapas-grid">
          <li class="etapa-wrap">
            <article class="etapa-card">
              <span class="etapa-card__numero" aria-hidden="true">01</span>

              <div class="etapa-card__medalhao" aria-hidden="true">
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10l2-5h12l2 5
                       M5 10h14
                       M6 10v9h12v-9
                       M8 10v2
                       M12 10v2
                       M16 10v2
                       M9 19v-5h6v5"
                  />
                </svg>
              </div>

              <h3 class="etapa-card__titulo">Crie sua loja</h3>
              <p class="etapa-card__descricao">
                Monte sua página dentro do DTavern com nome, identidade visual, descrição e links para divulgar seu trabalho.
              </p>
            </article>

            <div class="card-connector" aria-hidden="true">
              <span class="card-connector__line"></span>
              <span class="card-connector__dot"></span>
              <span class="card-connector__line"></span>
            </div>
          </li>

          <li class="etapa-wrap">
            <article class="etapa-card">
              <span class="etapa-card__numero" aria-hidden="true">02</span>

              <div class="etapa-card__medalhao" aria-hidden="true">
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>

              <h3 class="etapa-card__titulo">Publique seus produtos</h3>
              <p class="etapa-card__descricao">
                Cadastre seus materiais, defina o preço e deixe tudo pronto para vender na sua loja.
              </p>
            </article>

            <div class="card-connector" aria-hidden="true">
              <span class="card-connector__line"></span>
              <span class="card-connector__dot"></span>
              <span class="card-connector__line"></span>
            </div>
          </li>

          <li class="etapa-wrap">
            <article class="etapa-card">
              <span class="etapa-card__numero" aria-hidden="true">03</span>

              <div class="etapa-card__medalhao" aria-hidden="true">
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 4h12M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                  />
                </svg>
              </div>

              <h3 class="etapa-card__titulo">Venda no automático</h3>
              <p class="etapa-card__descricao">
                Publique seus produtos e deixe o DTavern cuidar do pagamento e da entrega do produto digital para cada comprador.
              </p>
            </article>
          </li>
        </ol>

        <div class="mt-8 md:mt-14 flex justify-center">
          <button
            [routerLink]="['/cadastro']"
            [queryParams]="{ cadastro: 'artesao' }"
            class="w-full sm:w-auto max-w-xs px-8 py-4 bg-tavern-wood text-candlelight-gold rounded-lg font-medium hover:bg-midnight-brown hover:shadow-xl md:hover:scale-105 transition-all duration-300 text-lg"
          >
            Criar minha loja
            <svg
              class="w-5 h-5 ml-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        <div class="secao-como-funciona__bottom-divider" aria-hidden="true">
          <span class="secao-como-funciona__divider-line"></span>
          <span class="secao-como-funciona__divider-mark"></span>
          <span class="secao-como-funciona__divider-line secao-como-funciona__divider-line--invert"></span>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .secao-como-funciona {
        background: #e9d7b8;
      }

      .secao-como-funciona__bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse 75% 45% at 50% 38%, rgba(255, 255, 255, 0.28), transparent 70%),
          linear-gradient(180deg, rgba(233, 215, 184, 1) 0%, rgba(228, 208, 174, 1) 58%, rgba(220, 198, 162, 1) 100%);
      }

      .secao-como-funciona__bg::before,
      .secao-como-funciona__bg::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 120px;
      }

      .secao-como-funciona__bg::before {
        top: 0;
        background: linear-gradient(180deg, rgba(75, 46, 25, 0.14), transparent);
      }

      .secao-como-funciona__bg::after {
        bottom: 0;
        background: linear-gradient(180deg, transparent, rgba(75, 46, 25, 0.1));
      }

      .secao-como-funciona__eyebrow {
        font-size: 0.74rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #7a4f22;
        font-weight: 600;
      }

      .secao-como-funciona__titulo {
        font-family: 'Cinzel', serif;
        font-size: clamp(1.85rem, 3.6vw, 3.15rem);
        line-height: 1.16;
        font-weight: 700;
        color: #1c0f0a;
        max-width: 16ch;
        margin: 0 auto;
      }

      .secao-como-funciona__destaque {
        color: #7a4f22;
      }

      .secao-como-funciona__subtitulo {
        font-size: clamp(1rem, 1.55vw, 1.14rem);
        line-height: 1.72;
        color: rgba(28, 15, 10, 0.78);
        max-width: 62ch;
        margin: 0 auto;
      }

      .secao-como-funciona__top-divider,
      .secao-como-funciona__intro-divider,
      .secao-como-funciona__bottom-divider {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.62rem;
        pointer-events: none;
      }

      .secao-como-funciona__top-divider {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }

      .secao-como-funciona__intro-divider {
        margin-top: 0.2rem;
      }

      .secao-como-funciona__bottom-divider {
        width: 100%;
        margin-top: 3.5rem;
      }

      .secao-como-funciona__divider-line {
        width: clamp(3rem, 11vw, 7rem);
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(197, 139, 61, 0.7));
      }

      .secao-como-funciona__divider-line--invert {
        background: linear-gradient(90deg, rgba(197, 139, 61, 0.7), transparent);
      }

      .secao-como-funciona__divider-mark {
        width: 0.38rem;
        height: 0.38rem;
        transform: rotate(45deg);
        background: #c58b3d;
        border: 1px solid rgba(122, 79, 34, 0.7);
      }

      .etapas-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.1rem;
        max-width: 36rem;
        margin-left: auto;
        margin-right: auto;
        padding: 0;
        list-style: none;
      }

      .etapa-wrap {
        position: relative;
      }

      .etapa-card {
        position: relative;
        text-align: center;
        border-radius: 0.9rem;
        border: 1px solid rgba(197, 139, 61, 0.45);
        background:
          linear-gradient(180deg, #f4ebdc, #ede0c8);
        box-shadow: 0 4px 14px rgba(75, 46, 25, 0.08);
        padding: 1.35rem 1.1rem 1.2rem;
        overflow: hidden;
        transition: transform 240ms ease, border-color 240ms ease, background-color 240ms ease, box-shadow 240ms ease;
      }

      .etapa-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        border: 1px solid rgba(255, 255, 255, 0.35);
        pointer-events: none;
      }

      @media (hover: hover) and (min-width: 768px) {
        .etapa-card:hover {
          transform: translateY(-3px);
          border-color: rgba(197, 139, 61, 0.8);
          background: linear-gradient(180deg, #f8f1e5, #f1e6d2);
          box-shadow: 0 10px 22px rgba(75, 46, 25, 0.16);
        }

        .etapa-card:hover .etapa-card__medalhao {
          border-color: rgba(197, 139, 61, 0.95);
          box-shadow: 0 0 0 3px rgba(197, 139, 61, 0.18);
          transform: translateY(-1px);
        }
      }

      .etapa-card__numero {
        position: absolute;
        top: 0.55rem;
        right: 0.78rem;
        font-family: 'Cinzel', serif;
        font-size: clamp(1rem, 2.8vw, 1.45rem);
        font-weight: 700;
        letter-spacing: 0.05em;
        color: rgba(122, 79, 34, 0.22);
        user-select: none;
        pointer-events: none;
      }

      .etapa-card__medalhao {
        width: 2.95rem;
        height: 2.95rem;
        margin: 0 auto 0.85rem;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffd36a;
        border: 1px solid rgba(197, 139, 61, 0.7);
        background: radial-gradient(circle at 30% 25%, #5a3a20, #4b2e19 72%);
        position: relative;
        transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
      }

      .etapa-card__medalhao::after {
        content: '';
        position: absolute;
        inset: 0.22rem;
        border-radius: inherit;
        border: 1px solid rgba(255, 211, 106, 0.2);
      }

      .etapa-card__titulo {
        margin-bottom: 0.45rem;
        color: #1c0f0a;
        font-size: 1.18rem;
        font-weight: 600;
        line-height: 1.3;
      }

      .etapa-card__descricao {
        color: rgba(28, 15, 10, 0.75);
        line-height: 1.62;
        font-size: 0.95rem;
      }

      .card-connector {
        display: none;
        position: absolute;
        top: 50%;
        right: -1.05rem;
        transform: translate(100%, -50%);
        align-items: center;
        gap: 0.36rem;
        pointer-events: none;
      }

      .card-connector__line {
        width: 1.45rem;
        height: 1px;
        background: linear-gradient(90deg, rgba(197, 139, 61, 0.2), rgba(197, 139, 61, 0.7));
      }

      .card-connector__dot {
        width: 0.26rem;
        height: 0.26rem;
        border-radius: 999px;
        background: #c58b3d;
      }

      @media (min-width: 1024px) {
        .etapas-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          max-width: none;
        }

        .card-connector {
          display: inline-flex;
        }

        .etapa-wrap:last-child .card-connector {
          display: none;
        }

        .etapa-card {
          padding: 1.55rem 1.2rem 1.4rem;
          min-height: 100%;
        }
      }

      @media (max-width: 767px) {
        .secao-como-funciona {
          padding-top: 4rem;
          padding-bottom: 3.5rem;
        }

        .secao-como-funciona__top-divider {
          top: 0.15rem;
        }

        .secao-como-funciona__subtitulo {
          font-size: 0.95rem;
        }

        .secao-como-funciona__divider-line {
          width: clamp(2.25rem, 18vw, 5rem);
        }

        .secao-como-funciona__bottom-divider {
          margin-top: 2rem;
        }

        .etapas-grid {
          gap: 0;
          max-width: 30rem;
        }

        .etapa-wrap::before {
          content: '';
          position: absolute;
          left: 1.25rem;
          top: 2.5rem;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, rgba(197, 139, 61, 0.6), rgba(197, 139, 61, 0.25));
        }

        .etapa-wrap:last-child::before {
          display: none;
        }

        .etapa-card {
          display: grid;
          grid-template-columns: 2.5rem minmax(0, 1fr);
          column-gap: 0.9rem;
          align-items: start;
          text-align: left;
          padding: 0 0 1.25rem;
          border: 0;
          border-radius: 0;
          background: none;
          box-shadow: none;
          overflow: visible;
        }

        .etapa-wrap:last-child .etapa-card {
          padding-bottom: 0;
        }

        .etapa-card::after,
        .etapa-card__numero {
          display: none;
        }

        .etapa-card__medalhao {
          grid-column: 1;
          grid-row: span 2;
          width: 2.5rem;
          height: 2.5rem;
          margin: 0;
          z-index: 1;
        }

        .etapa-card__titulo {
          grid-column: 2;
          margin-bottom: 0.2rem;
          padding-top: 0.45rem;
          font-size: 1.05rem;
        }

        .etapa-card__descricao {
          grid-column: 2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    `,
  ],
})
export class SecaoComoFuncionaComponent { }
