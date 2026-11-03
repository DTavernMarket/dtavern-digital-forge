import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';
import { MENSAGEM_USERNAME, sanitizarUsername, usernameValido } from '../../models/username';
import { AuthService } from '../../services/auth.service';
import { ContaService, ContaUsuario } from '../../services/conta.service';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
          <div class="mb-6 flex flex-col items-center">
            <h1 class="text-2xl md:text-3xl font-medieval font-bold text-scroll-beige mb-1">Minha conta</h1>
            <p class="text-scroll-beige/70 text-xs md:text-sm">Visualize e gerencie as informações da sua conta</p>
          </div>

          @if (estado() === 'encerrada' || estado() === 'ausente') {
            <section class="mx-auto max-w-3xl">
              <h2 class="mb-4 border-b border-brass-accent/50 pb-2 text-xl font-medieval font-bold tracking-wide text-scroll-beige">Gerenciamento da conta</h2>
              <div class="card-padrao rounded-xl p-5 sm:p-6">
              <p class="mb-4 text-sm text-midnight-brown/80">
                @if (estado() === 'encerrada') {
                  Esta conta foi encerrada na plataforma. Você pode concluir a remoção do login.
                } @else {
                  Não há dados desta conta na plataforma. Se o cadastro não chegou a ser concluído, volte para criar a conta.
                  Confirmar abaixo remove o login.
                }
              </p>
              @if (estado() === 'ausente') {
                <a routerLink="/cadastro" class="mb-4 inline-block text-sm text-especialidade-tag hover:underline">Voltar ao cadastro</a>
              }
              @if (erroExclusao) {
                <p class="mb-4 text-sm text-red-800">{{ erroExclusao }}</p>
              }
              <button
                type="button"
                (click)="abrirExclusao()"
                [disabled]="excluindo()"
                class="min-h-[44px] rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                Concluir exclusão
              </button>
              </div>
            </section>
          } @else {
            <div class="mx-auto flex max-w-3xl flex-col gap-16">
              @if (erroGeral) {
                <p class="text-sm text-red-300">{{ erroGeral }}</p>
              }

              <section>
                <h2 class="mb-4 border-b border-brass-accent/50 pb-2 text-xl font-medieval font-bold tracking-wide text-scroll-beige">Dados pessoais</h2>
                <form (ngSubmit)="salvarDados()" class="space-y-4 card-padrao rounded-xl p-5 sm:p-6" [attr.aria-busy]="carregando()">
                  <div>
                    <label class="mb-2 block text-sm text-midnight-brown" for="nomeCompleto">Nome completo</label>
                    <input id="nomeCompleto" name="nomeCompleto" type="text" maxlength="200" required [(ngModel)]="nomeCompleto" [readonly]="carregando()" [class.campo-skeleton]="carregando()" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm text-midnight-brown" for="username">Username</label>
                    <input id="username" name="username" type="text" maxlength="100" required [(ngModel)]="username" [readonly]="carregando()" [class.campo-skeleton]="carregando()" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                    <p class="mt-1 text-xs text-midnight-brown/70">Letras minúsculas, números e hífens. De 3 a 100 caracteres.</p>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm text-midnight-brown" for="dataNascimento">Data de nascimento</label>
                    <input id="dataNascimento" name="dataNascimento" type="date" required [max]="dataMaxima" [(ngModel)]="dataNascimento" [readonly]="carregando()" [class.campo-skeleton]="carregando()" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown [color-scheme:light]" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm text-midnight-brown" for="dataCriacao">Data de criação da conta</label>
                    <input id="dataCriacao" type="text" [value]="dataCriacao" disabled [class.campo-skeleton]="carregando()" class="w-full rounded-lg border border-brass-accent/40 bg-midnight-brown/5 px-4 py-2 text-midnight-brown/60" />
                  </div>
                  @if (mensagemDados) {
                    <p class="text-sm text-especialidade-tag">{{ mensagemDados }}</p>
                  }
                  @if (avisoDados) {
                    <p class="text-sm text-amber-900">{{ avisoDados }}</p>
                  }
                  @if (erroDados) {
                    <p class="text-sm text-red-800">{{ erroDados }}</p>
                  }
                  <button type="submit" [disabled]="carregando() || salvandoDados() || !dadosAlterados()" class="min-h-[44px] rounded-lg bg-candlelight-gold px-6 py-2 font-semibold text-tavern-wood disabled:cursor-not-allowed disabled:opacity-50">
                    {{ salvandoDados() ? 'Salvando...' : 'Salvar alterações' }}
                  </button>
                </form>
              </section>

              <section>
                <h2 class="mb-4 border-b border-brass-accent/50 pb-2 text-xl font-medieval font-bold tracking-wide text-scroll-beige">Segurança</h2>
                <div class="card-padrao rounded-xl p-5 sm:p-6">
                <p class="mb-4 text-sm text-midnight-brown/80">
                  E-mail atual:
                  @if (carregando()) {
                    <span class="campo-skeleton ml-2 inline-block h-4 w-48 align-middle rounded" aria-hidden="true"></span>
                  } @else {
                    {{ emailAtual || 'Não informado' }}
                  }
                </p>

                <form (ngSubmit)="alterarEmail()" class="mb-8 space-y-4">
                  <div>
                    <label class="mb-2 block text-sm text-midnight-brown" for="novoEmail">Novo e-mail</label>
                    <input id="novoEmail" name="novoEmail" type="email" required [(ngModel)]="novoEmail" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                  </div>
                  @if (usaSenha()) {
                    <div>
                      <label class="mb-2 block text-sm text-midnight-brown" for="senhaEmail">Senha atual</label>
                      <input id="senhaEmail" name="senhaEmail" type="password" autocomplete="current-password" [(ngModel)]="senhaEmail" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                    </div>
                  } @else {
                    <p class="text-sm text-midnight-brown/70">Esta conta entrou por outro provedor. Se o login pedir confirmação recente, entre de novo e tente outra vez.</p>
                  }
                  @if (emailPendente) {
                    <p class="text-sm text-especialidade-tag">Enviamos um link de confirmação para {{ emailPendente }}. A alteração só vale depois da confirmação.</p>
                  }
                  @if (mensagemEmail) {
                    <p class="text-sm text-especialidade-tag">{{ mensagemEmail }}</p>
                  }
                  @if (erroEmail) {
                    <p class="text-sm text-red-800">{{ erroEmail }}</p>
                  }
                  <button type="submit" [disabled]="carregando() || salvandoEmail() || !emailAlterado()" class="min-h-[44px] rounded-lg bg-candlelight-gold px-6 py-2 font-semibold text-tavern-wood disabled:cursor-not-allowed disabled:opacity-50">
                    {{ salvandoEmail() ? 'Enviando...' : 'Alterar e-mail' }}
                  </button>
                </form>

                @if (usaSenha()) {
                  <form (ngSubmit)="alterarSenha()" class="space-y-4">
                    <h3 class="text-base text-midnight-brown">Alterar senha</h3>
                    <div>
                      <label class="mb-2 block text-sm text-midnight-brown" for="senhaAtual">Senha atual</label>
                      <input id="senhaAtual" name="senhaAtual" type="password" autocomplete="current-password" [(ngModel)]="senhaAtual" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm text-midnight-brown" for="novaSenha">Nova senha</label>
                      <input id="novaSenha" name="novaSenha" type="password" autocomplete="new-password" minlength="6" [(ngModel)]="novaSenha" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm text-midnight-brown" for="confirmarSenha">Confirmar nova senha</label>
                      <input id="confirmarSenha" name="confirmarSenha" type="password" autocomplete="new-password" [(ngModel)]="confirmarSenha" class="w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
                    </div>
                    @if (mensagemSenha) {
                      <p class="text-sm text-especialidade-tag">{{ mensagemSenha }}</p>
                    }
                    @if (erroSenha) {
                      <p class="text-sm text-red-800">{{ erroSenha }}</p>
                    }
                    <button type="submit" [disabled]="carregando() || salvandoSenha() || !senhaAlterada()" class="min-h-[44px] rounded-lg bg-candlelight-gold px-6 py-2 font-semibold text-tavern-wood disabled:cursor-not-allowed disabled:opacity-50">
                      {{ salvandoSenha() ? 'Alterando...' : 'Alterar senha' }}
                    </button>
                  </form>
                } @else {
                  <p class="text-sm text-midnight-brown/70">Esta conta não usa senha. A alteração precisa ser feita no provedor de login.</p>
                }
                </div>
              </section>

              <section>
                <h2 class="mb-4 border-b border-brass-accent/50 pb-2 text-xl font-medieval font-bold tracking-wide text-scroll-beige">Gerenciamento da conta</h2>
                <div class="card-padrao rounded-xl p-5 sm:p-6">
                <p class="mb-4 text-sm text-midnight-brown/80">A exclusão encerra o acesso. Se não houver compras nem vendas, a conta é apagada. Se houver, os dados pessoais saem e o histórico comercial permanece.</p>
                <button type="button" (click)="abrirExclusao()" [disabled]="carregando()" class="min-h-[44px] rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                  Excluir conta
                </button>
                </div>
              </section>
            </div>
          }

    @if (modalExclusao()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" (click)="fecharExclusao()">
        <div class="max-h-[90svh] w-full max-w-md overflow-y-auto card-padrao rounded-xl p-5 sm:p-6" (click)="$event.stopPropagation()">
          <h3 class="mb-4 text-lg font-semibold text-midnight-brown">Excluir conta</h3>
          <p class="mb-4 text-sm text-midnight-brown/80">
            Se você não tiver compras nem vendas, a conta, a loja e os produtos nunca vendidos serão apagados.
            Se houver compras ou vendas, o nome, o username, o e-mail, a data de nascimento e o login serão removidos;
            a loja e os produtos deixam de ficar ativos, e os pedidos permanecem.
            O e-mail e o username poderão ser usados em outra conta.
          </p>
          @if (usaSenha()) {
            <label class="mb-2 block text-sm text-midnight-brown" for="senhaExclusao">Senha atual</label>
            <input id="senhaExclusao" type="password" autocomplete="current-password" [(ngModel)]="senhaExclusao" class="mb-4 w-full rounded-lg border border-brass-accent/50 bg-white/60 px-4 py-2 text-midnight-brown" />
          }
          @if (erroExclusao) {
            <p class="mb-4 text-sm text-red-800">{{ erroExclusao }}</p>
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

    .campo-skeleton::-webkit-calendar-picker-indicator {
      opacity: 0;
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
export class ContaComponent implements OnInit {
  private authService = inject(AuthService);
  private contaService = inject(ContaService);
  private router = inject(Router);

  estado = signal<'carregando' | 'pronta' | 'encerrada' | 'ausente'>('carregando');

  carregando(): boolean {
    return this.estado() === 'carregando';
  }
  salvandoDados = signal(false);
  salvandoEmail = signal(false);
  salvandoSenha = signal(false);
  excluindo = signal(false);
  modalExclusao = signal(false);
  readonly dataMaxima = dataLocalDeHoje();

  nomeCompleto = '';
  username = '';
  dataNascimento = '';
  private nomeOriginal = '';
  private usernameOriginal = '';
  private nascimentoOriginal = '';
  dataCriacao = '';
  emailAtual = '';
  novoEmail = '';
  senhaEmail = '';
  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';
  senhaExclusao = '';
  emailPendente = '';

  erroGeral = '';
  mensagemDados = '';
  avisoDados = '';
  erroDados = '';
  mensagemEmail = '';
  erroEmail = '';
  mensagemSenha = '';
  erroSenha = '';
  erroExclusao = '';

  ngOnInit() {
    this.authService.atualizarSessao().subscribe({
      next: () => this.carregar(),
      error: () => this.carregar()
    });
  }

  usaSenha(): boolean {
    return this.authService.usaSenha();
  }

  dadosAlterados(): boolean {
    return this.nomeCompleto.trim() !== this.nomeOriginal
      || sanitizarUsername(this.username) !== this.usernameOriginal
      || this.dataNascimento !== this.nascimentoOriginal;
  }

  emailAlterado(): boolean {
    return this.novoEmail.trim().length > 0 || this.senhaEmail.length > 0;
  }

  senhaAlterada(): boolean {
    return this.senhaAtual.length > 0 || this.novaSenha.length > 0 || this.confirmarSenha.length > 0;
  }

  salvarDados() {
    this.mensagemDados = '';
    this.avisoDados = '';
    this.erroDados = '';
    const nomeCompleto = this.nomeCompleto.trim();
    const username = sanitizarUsername(this.username);
    this.username = username;

    if (!nomeCompleto || !username || !this.dataNascimento) {
      this.erroDados = 'Preencha nome completo, username e data de nascimento.';
      return;
    }
    if (nomeCompleto.length > 200) {
      this.erroDados = 'O nome completo deve ter no máximo 200 caracteres.';
      return;
    }
    if (!usernameValido(username)) {
      this.erroDados = MENSAGEM_USERNAME;
      return;
    }
    if (this.dataNascimento > this.dataMaxima) {
      this.erroDados = 'A data de nascimento não pode ser futura.';
      return;
    }

    this.salvandoDados.set(true);
    this.contaService.atualizar({
      nomeCompleto,
      username,
      dataNascimento: this.dataNascimento
    }).subscribe({
      next: (resposta) => {
        this.preencher(resposta.usuario);
        if (resposta.aviso) {
          this.avisoDados = resposta.aviso;
        } else {
          this.mensagemDados = 'Dados salvos.';
        }
        this.salvandoDados.set(false);
      },
      error: (error) => {
        this.erroDados = mensagemDaApi(error, 'Não foi possível salvar os dados.');
        this.salvandoDados.set(false);
      }
    });
  }

  alterarEmail() {
    this.mensagemEmail = '';
    this.erroEmail = '';
    const email = this.novoEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.erroEmail = 'Informe um e-mail válido.';
      return;
    }
    if (email.toLowerCase() === this.emailAtual.toLowerCase()) {
      this.erroEmail = 'Informe um e-mail diferente do atual.';
      return;
    }

    this.salvandoEmail.set(true);
    this.contaService.emailDisponivel(email).pipe(
      switchMap(() => this.authService.solicitarAlteracaoEmail(email, this.senhaEmail))
    ).subscribe({
      next: () => {
        this.emailPendente = email;
        this.novoEmail = '';
        this.senhaEmail = '';
        this.mensagemEmail = '';
        this.salvandoEmail.set(false);
      },
      error: (error) => {
        this.erroEmail = mensagemDaApi(error, 'Não foi possível iniciar a alteração de e-mail.');
        this.salvandoEmail.set(false);
      }
    });
  }

  alterarSenha() {
    this.mensagemSenha = '';
    this.erroSenha = '';
    if (!this.usaSenha()) {
      this.erroSenha = 'Esta conta não usa senha. A alteração precisa ser feita no provedor de login.';
      return;
    }
    if (this.novaSenha.length < 6) {
      this.erroSenha = 'A senha precisa ter pelo menos 6 caracteres.';
      return;
    }
    if (this.novaSenha !== this.confirmarSenha) {
      this.erroSenha = 'A confirmação da senha não confere.';
      return;
    }

    this.salvandoSenha.set(true);
    this.authService.alterarSenha(this.senhaAtual, this.novaSenha).subscribe({
      next: () => {
        this.senhaAtual = '';
        this.novaSenha = '';
        this.confirmarSenha = '';
        this.mensagemSenha = 'Senha alterada.';
        this.salvandoSenha.set(false);
      },
      error: (error) => {
        this.erroSenha = mensagemDaApi(error, 'Não foi possível alterar a senha.');
        this.salvandoSenha.set(false);
      }
    });
  }

  abrirExclusao() {
    this.erroExclusao = '';
    this.senhaExclusao = '';
    this.modalExclusao.set(true);
  }

  fecharExclusao() {
    if (this.excluindo()) {
      return;
    }
    this.modalExclusao.set(false);
  }

  confirmarExclusao() {
    this.erroExclusao = '';
    this.excluindo.set(true);
    this.authService.confirmarSenhaAtual(this.senhaExclusao).pipe(
      switchMap(() => this.contaService.excluir())
    ).subscribe({
      next: () => {
        this.authService.logout().subscribe({
          next: () => this.router.navigate(['/']),
          error: () => this.router.navigate(['/'])
        });
      },
      error: (error) => {
        this.erroExclusao = mensagemDaApi(error, 'Não foi possível excluir a conta. Tente de novo.');
        this.excluindo.set(false);
      }
    });
  }

  private carregar() {
    this.contaService.obter().subscribe({
      next: (conta) => {
        this.preencher(conta);
        this.estado.set('pronta');
        this.sincronizarSeNecessario(conta);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.estado.set('encerrada');
          return;
        }
        if (error.status === 404) {
          this.estado.set('ausente');
          return;
        }
        if (error.status === 401) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: '/conta' } });
          return;
        }
        this.erroGeral = mensagemDaApi(error, 'Não foi possível carregar a conta.');
        this.estado.set('pronta');
      }
    });
  }

  private sincronizarSeNecessario(conta: ContaUsuario) {
    const emailFirebase = this.authService.getCurrentUser()?.email;
    if (!emailFirebase || emailFirebase.toLowerCase() === (conta.email || '').toLowerCase()) {
      return;
    }
    this.contaService.sincronizarEmail().subscribe({
      next: (atualizada) => {
        this.preencher(atualizada);
        this.emailPendente = '';
        this.mensagemEmail = 'E-mail atualizado.';
      },
      error: (error) => {
        this.erroEmail = mensagemDaApi(error, 'O e-mail foi confirmado no login, mas não foi possível atualizar a conta.');
      }
    });
  }

  private preencher(conta: ContaUsuario) {
    this.nomeCompleto = conta.nomeCompleto || '';
    this.username = conta.username || '';
    this.dataNascimento = (conta.dataNascimento || '').slice(0, 10);
    this.nomeOriginal = this.nomeCompleto.trim();
    this.usernameOriginal = sanitizarUsername(this.username);
    this.nascimentoOriginal = this.dataNascimento;
    this.dataCriacao = formatarDataHora(conta.dataCriacao);
    this.emailAtual = conta.email || '';
  }
}

function dataLocalDeHoje(): string {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${hoje.getFullYear()}-${mes}-${dia}`;
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

function mensagemDaApi(
  error: { error?: { detalhes?: string; mensagem?: string; message?: string } | string; code?: string; message?: string },
  fallback: string
): string {
  const corpo = error?.error;
  if (typeof corpo === 'string' && corpo.trim()) {
    return corpo;
  }
  if (corpo && typeof corpo === 'object') {
    return corpo.detalhes
      || corpo.mensagem
      || corpo.message
      || (error?.code ? getFirebaseErrorMessage(error.code) : '')
      || error?.message
      || fallback;
  }
  return (error?.code ? getFirebaseErrorMessage(error.code) : '')
    || error?.message
    || fallback;
}
