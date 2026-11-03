import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ArtesaoService } from '../../services/artesao.service';
import {
  DESCRICAO_LOJA_MAXIMA,
  DOMINIO_MAXIMO,
  enderecoValido,
  NOME_LOJA_MAXIMO,
  sugerirDominio
} from '../../models/dominio-loja';

@Component({
  selector: 'app-criar-loja',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-dvh flex flex-col items-center justify-center bg-tavern-wood relative sm:overflow-hidden">
      <div class="w-full flex items-center justify-center p-4">
        @if (verificando()) {
          <p class="text-scroll-beige">Carregando...</p>
        } @else {
          <div class="bg-midnight-brown/90 rounded-xl p-5 sm:p-8 max-w-[35rem] w-full shadow-2xl">
            <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Criar loja</h2>

            <form (ngSubmit)="criar()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-scroll-beige mb-2" for="nomeLoja">Nome da loja</label>
                <input
                  id="nomeLoja"
                  type="text"
                  [ngModel]="nome()"
                  (ngModelChange)="aoMudarNome($event)"
                  name="nomeLoja"
                  required
                  [attr.maxlength]="nomeMaximo"
                  autocomplete="organization"
                  class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="nome da sua loja"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-scroll-beige mb-2" for="dominio">Endereço da loja</label>
                <p class="mb-2 text-xs leading-relaxed text-scroll-beige/80">
                  De 1 a 150 caracteres, só com letras minúsculas, números e hífen. Não pode começar nem terminar com hífen. O espaço vira hífen.
                </p>
                <input
                  id="dominio"
                  type="text"
                  [ngModel]="dominio()"
                  (ngModelChange)="aoMudarDominio($event)"
                  name="dominio"
                  required
                  [attr.maxlength]="dominioMaximo"
                  autocapitalize="none"
                  spellcheck="false"
                  class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="minha-loja"
                />
                <p class="mt-2 text-sm text-scroll-beige/80 break-all">
                  O link da sua loja vai ficar assim:<br>
                  <span class="text-candlelight-gold">dtavern.com.br/loja/{{ dominio() }}</span>
                </p>
                @if (erroDominio()) {
                  <p class="mt-2 text-sm text-red-300">{{ erroDominio() }}</p>
                } @else if (enderecoIndisponivel()) {
                  <p class="mt-2 text-sm text-red-300">Este endereço não está disponível.</p>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-scroll-beige mb-2" for="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  [ngModel]="descricao()"
                  (ngModelChange)="descricao.set($event)"
                  name="descricao"
                  rows="5"
                  [attr.maxlength]="descricaoMaxima"
                  class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige resize-y"
                  placeholder="conte o que a sua loja oferece"
                ></textarea>
                <p class="mt-1 text-xs text-scroll-beige/60 text-right">{{ descricao().length }}/{{ descricaoMaxima }}</p>
              </div>

              @if (erroGeral()) {
                <p class="text-sm text-red-300">{{ erroGeral() }}</p>
              }

              <button
                type="submit"
                [disabled]="!podeCriar()"
                class="w-full min-h-[44px] px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ enviando() ? 'Criando loja...' : 'Criar loja' }}
              </button>
            </form>
          </div>
        }
      </div>
    </div>
  `
})
export class CriarLojaComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);
  private router = inject(Router);

  readonly nomeMaximo = NOME_LOJA_MAXIMO;
  readonly dominioMaximo = DOMINIO_MAXIMO;
  readonly descricaoMaxima = DESCRICAO_LOJA_MAXIMA;

  verificando = signal(true);
  enviando = signal(false);
  nome = signal('');
  dominio = signal('');
  descricao = signal('');
  enderecoEditado = signal(false);
  enderecoIndisponivel = signal(false);
  erroGeral = signal('');

  ngOnInit() {
    this.artesaoService.getMeLoja().subscribe({
      next: () => this.router.navigate(['/conta/loja']),
      error: () => this.verificando.set(false)
    });
  }

  erroDominio(): string {
    const dominio = this.dominio();
    if (!dominio) {
      return '';
    }
    if (!enderecoValido(dominio)) {
      return 'Use só letras minúsculas, números e hífens, sem hífen no início ou no fim.';
    }
    return '';
  }

  podeCriar(): boolean {
    const nome = this.nome().trim();
    return nome.length >= 1
      && nome.length <= NOME_LOJA_MAXIMO
      && enderecoValido(this.dominio())
      && !this.enviando()
      && this.descricao().length <= DESCRICAO_LOJA_MAXIMA;
  }

  aoMudarNome(valor: string) {
    this.nome.set(valor);
    this.erroGeral.set('');
    if (!this.enderecoEditado()) {
      this.definirDominio(sugerirDominio(valor));
    }
  }

  aoMudarDominio(valor: string) {
    this.enderecoEditado.set(true);
    this.definirDominio(valor.replace(/ /g, '-'));
  }

  criar() {
    if (!this.podeCriar()) {
      return;
    }
    this.enviando.set(true);
    this.erroGeral.set('');
    this.enderecoIndisponivel.set(false);
    const dominio = this.dominio();
    this.artesaoService.consultarDominio(dominio).subscribe({
      next: (resposta) => {
        if (this.dominio() !== dominio) {
          this.enviando.set(false);
          return;
        }
        if (!resposta.disponivel) {
          this.enderecoIndisponivel.set(true);
          this.enviando.set(false);
          return;
        }
        this.gravarLoja();
      },
      error: () => {
        this.enviando.set(false);
        this.erroGeral.set('Não foi possível verificar o endereço.');
      }
    });
  }

  private gravarLoja() {
    const descricao = this.descricao().trim();
    this.artesaoService.criarLojaDaConta({
      nome: this.nome().trim(),
      dominio: this.dominio(),
      descricao: descricao ? descricao : null
    }).subscribe({
      next: () => this.router.navigate(['/conta/loja']),
      error: (erro: HttpErrorResponse) => {
        this.enviando.set(false);
        const mensagem = erro.error?.mensagem || 'Não foi possível criar a loja.';
        if (mensagem.toLowerCase().includes('endereço')) {
          this.enderecoIndisponivel.set(true);
          return;
        }
        this.erroGeral.set(mensagem);
      }
    });
  }

  private definirDominio(valor: string) {
    this.dominio.set(valor);
    this.erroGeral.set('');
    this.enderecoIndisponivel.set(false);
  }
}
