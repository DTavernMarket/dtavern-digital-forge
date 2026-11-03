import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MeResponseLoja } from '../../models/auth.model';
import { DESCRICAO_LOJA_MAXIMA, DOMINIO_MAXIMO, enderecoValido, NOME_LOJA_MAXIMO } from '../../models/dominio-loja';
import { ArtesaoService } from '../../services/artesao.service';

@Component({
  selector: 'app-minha-loja',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="mb-6 flex flex-col items-center">
      <h1 class="mb-1 text-2xl font-medieval font-bold text-scroll-beige md:text-3xl">Minha loja</h1>
      <p class="text-xs text-scroll-beige/70 md:text-sm">Visualize e gerencie as informações da sua loja</p>
    </div>

    @if (!carregando() && !loja()) {
      <section class="card-padrao rounded-xl p-5 sm:p-6">
        <p class="mb-4 text-sm text-midnight-brown/80">Você não tem nenhuma loja.</p>
        <button
          type="button"
          (click)="criarMinhaLoja()"
          class="min-h-[44px] rounded-lg bg-candlelight-gold px-6 py-2 font-semibold text-tavern-wood"
        >
          Criar minha loja
        </button>
      </section>
    } @else {
      <div class="mx-auto flex max-w-3xl flex-col gap-16">
        @if (erroGeral()) {
          <p class="text-sm text-red-300">{{ erroGeral() }}</p>
        }

        <section>
          <h2 class="mb-4 border-b border-brass-accent/50 pb-2 text-xl font-medieval font-bold tracking-wide text-scroll-beige">Dados da loja</h2>
          <form (ngSubmit)="salvar()" class="card-padrao space-y-4 rounded-xl p-5 sm:p-6" [attr.aria-busy]="carregando()">
            @if (!carregando() && !loja()!.ativo) {
              <p class="text-sm text-midnight-brown/80">Esta loja está desativada.</p>
            }
            <div>
              <label class="mb-2 block text-sm text-midnight-brown" for="nomeLoja">Nome da loja</label>
              <input id="nomeLoja" name="nomeLoja" type="text" [attr.maxlength]="nomeMaximo" [ngModel]="nome" (ngModelChange)="nome = $event; limparAvisos()" [readonly]="carregando()" [class.campo-skeleton]="carregando()" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
            </div>
            <div>
              <label class="mb-2 block text-sm text-midnight-brown" for="enderecoLoja">Endereço</label>
              <input id="enderecoLoja" name="enderecoLoja" type="text" [attr.maxlength]="dominioMaximo" [ngModel]="dominio" (ngModelChange)="aoMudarEndereco($event)" [readonly]="carregando()" [class.campo-skeleton]="carregando()" autocapitalize="none" spellcheck="false" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
              <p class="mt-1 text-xs text-midnight-brown/70">De 1 a 150 caracteres, só com letras minúsculas, números e hífen. Não pode começar nem terminar com hífen. O espaço vira hífen.</p>
              @if (!carregando() && dominio && !enderecoValido(dominio)) {
                <p class="mt-2 text-sm text-red-800">Use só letras minúsculas, números e hífens, sem hífen no início ou no fim.</p>
              }
            </div>
            <div>
              <label class="mb-2 block text-sm text-midnight-brown" for="descricaoLoja">Descrição</label>
              <textarea id="descricaoLoja" name="descricaoLoja" rows="5" [attr.maxlength]="descricaoMaxima" [ngModel]="descricao" (ngModelChange)="descricao = $event; limparAvisos()" [readonly]="carregando()" [class.campo-skeleton]="carregando()" class="w-full resize-y rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown"></textarea>
            </div>
            <div>
              <label class="mb-2 block text-sm text-midnight-brown" for="dataCriacaoLoja">Data de criação da loja</label>
              <input id="dataCriacaoLoja" type="text" [value]="dataCriacao" disabled [class.campo-skeleton]="carregando()" class="w-full rounded-lg border border-brass-accent/40 bg-midnight-brown/5 px-4 py-2 text-midnight-brown/60" />
            </div>
            @if (mensagemDados()) {
              <p class="text-sm text-especialidade-tag">{{ mensagemDados() }}</p>
            }
            @if (erroDados()) {
              <p class="text-sm text-red-800">{{ erroDados() }}</p>
            }
            <button type="submit" [disabled]="carregando() || salvando() || !dadosAlterados()" class="min-h-[44px] rounded-lg bg-candlelight-gold px-6 py-2 font-semibold text-tavern-wood disabled:cursor-not-allowed disabled:opacity-50">
              {{ salvando() ? 'Salvando...' : 'Salvar alterações' }}
            </button>
          </form>
        </section>

        <section>
          <h2 class="mb-4 border-b border-brass-accent/50 pb-2 text-xl font-medieval font-bold tracking-wide text-scroll-beige">Segurança da loja</h2>
          <div class="card-padrao rounded-xl p-5 sm:p-6">
            @if (carregando() || loja()!.ativo) {
              <p class="mb-4 text-sm text-midnight-brown/80">Sem vendas, a loja e os produtos são apagados. Se houver pelo menos uma venda, mesmo gratuita, a loja é desativada e os pedidos permanecem.</p>
              <button
                type="button"
                (click)="abrirExclusao()"
                [disabled]="carregando() || excluindo()"
                class="min-h-[44px] rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Excluir loja
              </button>
            } @else {
              <p class="text-sm text-midnight-brown/80">A loja já foi desativada. Os pedidos permanecem.</p>
            }
          </div>
        </section>
      </div>
    }

    @if (modalExclusao()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" (click)="fecharExclusao()">
        <div class="max-h-[90svh] w-full max-w-md overflow-y-auto card-padrao rounded-xl p-5 sm:p-6" (click)="$event.stopPropagation()">
          <h3 class="mb-4 text-lg font-semibold text-midnight-brown">Excluir loja</h3>
          <p class="mb-4 text-sm text-midnight-brown/80">
            Se a loja não tiver vendas, ela e os produtos serão apagados.
            Se houver pelo menos uma venda, mesmo gratuita, a loja e os produtos deixam de ficar ativos e os pedidos permanecem.
            Sua conta continua.
          </p>
          @if (erroExclusao()) {
            <p class="mb-4 text-sm text-red-800">{{ erroExclusao() }}</p>
          }
          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" (click)="fecharExclusao()" class="rounded-lg border border-brass-accent/60 px-6 py-2 text-midnight-brown">Não</button>
            <button type="button" (click)="confirmarExclusao()" [disabled]="excluindo()" class="rounded-lg bg-red-600 px-6 py-2 font-semibold text-white disabled:opacity-50">
              {{ excluindo() ? 'Excluindo...' : 'Sim, excluir' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .campo-skeleton {
      color: transparent;
      caret-color: transparent;
      pointer-events: none;
      background: linear-gradient(90deg, rgba(28, 15, 10, 0.08) 25%, rgba(255, 255, 255, 0.85) 37%, rgba(28, 15, 10, 0.08) 63%);
      background-size: 400% 100%;
      animation: campo-skeleton 1.4s ease infinite;
    }

    .campo-skeleton:disabled {
      opacity: 1;
      -webkit-text-fill-color: transparent;
    }

    @keyframes campo-skeleton {
      0% { background-position: 100% 0; }
      100% { background-position: 0 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .campo-skeleton {
        animation: none;
        background: rgba(28, 15, 10, 0.08);
      }
    }
  `]
})
export class MinhaLojaComponent implements OnInit {
  private artesaoService = inject(ArtesaoService);
  private router = inject(Router);

  readonly nomeMaximo = NOME_LOJA_MAXIMO;
  readonly dominioMaximo = DOMINIO_MAXIMO;
  readonly descricaoMaxima = DESCRICAO_LOJA_MAXIMA;
  readonly enderecoValido = enderecoValido;

  carregando = signal(true);
  salvando = signal(false);
  excluindo = signal(false);
  modalExclusao = signal(false);
  loja = signal<MeResponseLoja | null>(null);
  erroGeral = signal('');
  erroExclusao = signal('');
  mensagemDados = signal('');
  erroDados = signal('');

  nome = '';
  dominio = '';
  descricao = '';
  dataCriacao = '';
  private nomeOriginal = '';
  private dominioOriginal = '';
  private descricaoOriginal = '';

  ngOnInit() {
    this.carregar();
  }

  criarMinhaLoja() {
    this.router.navigate(['/criar-loja']);
  }

  dadosAlterados(): boolean {
    return this.nome.trim() !== this.nomeOriginal
      || this.dominio !== this.dominioOriginal
      || this.descricao.trim() !== this.descricaoOriginal;
  }

  aoMudarEndereco(valor: string) {
    this.dominio = valor.replace(/ /g, '-');
    this.limparAvisos();
  }

  limparAvisos() {
    this.mensagemDados.set('');
    this.erroDados.set('');
  }

  salvar() {
    if (!this.dadosAlterados() || this.salvando()) {
      return;
    }
    this.limparAvisos();
    const nome = this.nome.trim();
    const dominio = this.dominio;
    const descricao = this.descricao.trim();
    if (!nome || nome.length > NOME_LOJA_MAXIMO) {
      this.erroDados.set('O nome da loja deve ter de 1 a 200 caracteres.');
      return;
    }
    if (!enderecoValido(dominio)) {
      this.erroDados.set('Use só letras minúsculas, números e hífens, sem hífen no início ou no fim.');
      return;
    }
    if (descricao.length > DESCRICAO_LOJA_MAXIMA) {
      this.erroDados.set('A descrição deve ter no máximo 2000 caracteres.');
      return;
    }

    this.salvando.set(true);
    if (dominio === this.dominioOriginal) {
      this.gravar(nome, dominio, descricao);
      return;
    }
    this.artesaoService.consultarDominio(dominio).subscribe({
      next: (resposta) => {
        if (!resposta.disponivel) {
          this.salvando.set(false);
          this.erroDados.set('Este endereço já está sendo utilizado por outra loja.');
          return;
        }
        this.gravar(nome, dominio, descricao);
      },
      error: () => {
        this.salvando.set(false);
        this.erroDados.set('Não foi possível verificar o endereço.');
      }
    });
  }

  abrirExclusao() {
    this.erroExclusao.set('');
    this.modalExclusao.set(true);
  }

  fecharExclusao() {
    if (this.excluindo()) {
      return;
    }
    this.modalExclusao.set(false);
  }

  confirmarExclusao() {
    this.excluindo.set(true);
    this.erroExclusao.set('');
    this.artesaoService.deletarLoja().subscribe({
      next: () => {
        this.modalExclusao.set(false);
        this.excluindo.set(false);
        this.carregar();
      },
      error: () => {
        this.excluindo.set(false);
        this.erroExclusao.set('Não foi possível excluir a loja.');
      }
    });
  }

  private gravar(nome: string, dominio: string, descricao: string) {
    this.artesaoService.atualizarDadosLoja({
      nome,
      dominio,
      descricao: descricao ? descricao : null
    }).subscribe({
      next: (loja) => {
        this.preencher(loja);
        this.salvando.set(false);
        this.mensagemDados.set('Alterações salvas.');
      },
      error: (erro: HttpErrorResponse) => {
        this.salvando.set(false);
        this.erroDados.set(erro.error?.mensagem || 'Não foi possível salvar a loja.');
      }
    });
  }

  private carregar() {
    this.carregando.set(true);
    this.artesaoService.getMeLoja().subscribe({
      next: (loja) => {
        this.preencher(loja);
        this.carregando.set(false);
      },
      error: () => {
        this.loja.set(null);
        this.carregando.set(false);
      }
    });
  }

  private preencher(loja: MeResponseLoja) {
    const descricao = loja.descricao ?? '';
    this.loja.set({ ...loja, ativo: loja.ativo !== false });
    this.nome = loja.nomeLoja;
    this.dominio = loja.dominio;
    this.descricao = descricao;
    this.dataCriacao = formatarDataHora(loja.dataCriacao ?? '');
    this.nomeOriginal = loja.nomeLoja;
    this.dominioOriginal = loja.dominio;
    this.descricaoOriginal = descricao;
  }
}

function formatarDataHora(valor: string): string {
  if (!valor) {
    return '';
  }
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) {
    return valor;
  }
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(data);
}
