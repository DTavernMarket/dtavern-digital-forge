import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-dvh flex flex-col items-center justify-center bg-tavern-wood relative sm:overflow-hidden">
      <div class="w-full flex items-center justify-center p-4">
        <div class="bg-midnight-brown/90 rounded-xl p-5 sm:p-8 max-w-md w-full shadow-2xl">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Criar conta</h2>

          <form (ngSubmit)="onCadastrar()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2" for="username">Username</label>
              <input
                id="username"
                type="text"
                [(ngModel)]="username"
                name="username"
                required
                maxlength="255"
                autocomplete="username"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                placeholder="seu nome de usuário"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2" for="email">E-mail</label>
              <input
                id="email"
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                autocomplete="email"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2" for="senha">Senha</label>
              <div class="relative">
                <input
                  id="senha"
                  [type]="mostrarSenha() ? 'text' : 'password'"
                  [(ngModel)]="password"
                  name="password"
                  required
                  minlength="6"
                  autocomplete="new-password"
                  class="w-full px-4 py-2 pr-12 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="mínimo de 6 caracteres"
                />
                <button
                  type="button"
                  (click)="mostrarSenha.set(!mostrarSenha())"
                  class="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-scroll-beige/70 hover:text-candlelight-gold"
                  [attr.aria-label]="mostrarSenha() ? 'Ocultar senha' : 'Mostrar senha'"
                  [attr.aria-pressed]="mostrarSenha()"
                >
                  @if (mostrarSenha()) {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2" for="confirmar">Confirmar senha</label>
              <div class="relative">
                <input
                  id="confirmar"
                  [type]="mostrarSenha() ? 'text' : 'password'"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  required
                  autocomplete="new-password"
                  class="w-full px-4 py-2 pr-12 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="repita a senha"
                />
                <button
                  type="button"
                  (click)="mostrarSenha.set(!mostrarSenha())"
                  class="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-scroll-beige/70 hover:text-candlelight-gold"
                  [attr.aria-label]="mostrarSenha() ? 'Ocultar senha' : 'Mostrar senha'"
                  [attr.aria-pressed]="mostrarSenha()"
                >
                  @if (mostrarSenha()) {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                </button>
              </div>
            </div>

            @if (errorMessage) {
              <p class="text-sm text-red-300">{{ errorMessage }}</p>
            }

            <button
              type="submit"
              [disabled]="loading()"
              class="w-full min-h-[44px] px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading() ? 'Criando conta...' : 'Criar conta' }}
            </button>
          </form>

          <p class="mt-4 text-center text-scroll-beige/70 text-sm">
            Já tem uma conta?
            <a routerLink="/login" class="text-candlelight-gold hover:underline">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class CadastroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  mostrarSenha = signal(false);
  loading = signal(false);
  errorMessage = '';

  onCadastrar() {
    this.errorMessage = '';
    const username = this.username.trim();
    const email = this.email.trim();

    if (!username || !email || !this.password) {
      this.errorMessage = 'Preencha username, e-mail e senha.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'A senha precisa ter pelo menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'A confirmação da senha não confere.';
      return;
    }

    this.loading.set(true);
    this.authService.cadastrar(username, email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/confirmar-conta'], { queryParams: { email } });
      },
      error: (error) => {
        this.errorMessage = error?.error?.message
          || (error?.code ? getFirebaseErrorMessage(error.code) : 'Não foi possível criar a conta.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
