import { Component } from '@angular/core';

@Component({
  selector: 'app-ambientacao-hero',
  standalone: true,
  template: `
    <div class="ambientacao-hero" aria-hidden="true">
      <div class="ambientacao-hero__fundo"></div>
      <div class="ambientacao-hero__vinheta"></div>

      <img
        src="assets/images/dtavern/ICONE/ICONE CREME.svg"
        alt=""
        class="ambientacao-hero__watermark"
        aria-hidden="true"
      />

      <div class="ambientacao-hero__moldura"></div>

      <svg class="ambientacao-hero__sprite" focusable="false" aria-hidden="true">
        <defs>
          <symbol id="orn-canto" viewBox="0 0 100 100">
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 94 L6 58 C6 28 28 6 58 6 L94 6" />
              <path d="M14 76 L14 58 C14 33 33 14 58 14 L76 14" />
              <path d="M24 62 L24 56 C24 39 39 24 56 24 L62 24" />
              <path d="M42 34 L50 42 L42 50 L34 42 Z" />
              <path d="M18 42 C24 42 29 40 33 36" />
              <path d="M42 18 C42 24 40 29 36 33" />
              <path d="M26 50 C31 49 35 46 38 42" />
              <path d="M50 26 C49 31 46 35 42 38" />
            </g>
          </symbol>
        </defs>
      </svg>

      <svg class="ambientacao-hero__ornamento ambientacao-hero__ornamento--tl" focusable="false" aria-hidden="true">
        <use href="#orn-canto" />
      </svg>
      <svg class="ambientacao-hero__ornamento ambientacao-hero__ornamento--tr" focusable="false" aria-hidden="true">
        <use href="#orn-canto" />
      </svg>
      <svg class="ambientacao-hero__ornamento ambientacao-hero__ornamento--bl" focusable="false" aria-hidden="true">
        <use href="#orn-canto" />
      </svg>
      <svg class="ambientacao-hero__ornamento ambientacao-hero__ornamento--br" focusable="false" aria-hidden="true">
        <use href="#orn-canto" />
      </svg>
    </div>
  `,
  styleUrl: './ambientacao-hero.component.css',
})
export class AmbientacaoHeroComponent {}
