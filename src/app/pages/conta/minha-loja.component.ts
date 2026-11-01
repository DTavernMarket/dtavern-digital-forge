import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ArtesaoService } from '../../services/artesao.service';

@Component({
  selector: 'app-minha-loja',
  standalone: true,
  template: `
    @if (carregando()) {
      <p class="text-scroll-beige">Carregando...</p>
    } @else if (!temLoja()) {
      <section class="rounded-xl border border-brass-accent/40 bg-midnight-brown/90 p-5 sm:p-6">
        <p class="mb-4 text-sm text-scroll-beige/80">Você não tem nenhuma loja.</p>
        <button
          type="button"
          (click)="criarMinhaLoja()"
          class="min-h-[44px] rounded-lg bg-candlelight-gold px-6 py-2 font-semibold text-tavern-wood"
        >
          Criar minha loja
        </button>
      </section>
    }
  `
})
export class MinhaLojaComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);
  private router = inject(Router);

  carregando = signal(true);
  temLoja = signal(false);

  ngOnInit() {
    this.artesaoService.getMeLoja().subscribe({
      next: () => {
        this.temLoja.set(true);
        this.carregando.set(false);
      },
      error: () => {
        this.temLoja.set(false);
        this.carregando.set(false);
      }
    });
  }

  criarMinhaLoja() {
    this.router.navigate(['/em-desenvolvimento']);
  }
}
