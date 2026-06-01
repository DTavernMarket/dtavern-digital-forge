// src/app/pages/login/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-tavern-wood overflow-hidden">
      <div class="w-full flex items-center justify-center p-4">
        <div class="bg-midnight-brown/90 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Login</h2>
          
          <form (ngSubmit)="onLogin()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Email</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Senha</label>
              <div class="relative">
                <input
                  [type]="mostrarSenha() ? 'text' : 'password'"
                  [(ngModel)]="password"
                  name="password"
                  required
                  class="w-full px-4 py-2 pr-12 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  (click)="mostrarSenha.set(!mostrarSenha())"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-scroll-beige/70 hover:text-scroll-beige hover:bg-white/5 transition-colors"
                  [attr.aria-label]="mostrarSenha() ? 'Ocultar senha' : 'Mostrar senha'"
                >
                  @if (mostrarSenha()) {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round"  stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round"  stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round"  stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  }
                </button>
              </div>
            </div>

            <!-- Esqueci minha senha -->
            <div class="flex justify-end">
              <button
                type="button"
                (click)="onForgotPassword()"
                [disabled]="resetLoading()"
                class="text-candlelight-gold text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ resetLoading() ? 'Enviando e-mail...' : 'Esqueci minha senha' }}
              </button>
            </div>
            
            @if (errorMessage) {
              <div class="text-red-400 text-sm">
                {{ errorMessage }}
              </div>
            }

            @if (resetMessage) {
              <div class="text-green-400 text-sm">
                {{ resetMessage }}
              </div>
            }
            
            <button
              type="submit"
              [disabled]="loading()"
              class="w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading() ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>
          
          <div class="mt-4 text-center space-y-2">
            <p class="text-scroll-beige/70 text-sm">
              Não tem uma conta?
              <a routerLink="/cadastro" class="text-candlelight-gold hover:underline">Registre-se</a>
            </p>
            <p class="text-scroll-beige/70 text-sm">
              <a routerLink="/" class="text-candlelight-gold hover:underline">Continue navegando</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  mostrarSenha = signal(false);
  loading = signal<boolean>(false);
  errorMessage: string = '';
  resetLoading = signal<boolean>(false);
  resetMessage: string = '';

  onLogin() {
    this.loading.set(true);
    this.errorMessage = '';
    this.resetMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl && returnUrl.startsWith('/')) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.log('error:', error);
        this.errorMessage = getFirebaseErrorMessage(error.code);

        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onForgotPassword() {
    // Limpar mensagens anteriores
    this.errorMessage = '';
    this.resetMessage = '';

    const emailTrim = this.email?.trim();

    if (!emailTrim) {
      this.errorMessage = 'Informe seu e-mail para redefinir a senha.';
      return;
    }

    this.resetLoading.set(true);

    this.authService.resetarSenha(emailTrim).subscribe({
      next: () => {
        this.resetMessage =
          'Você receberá um e-mail para redefinir sua senha em poucos instantes.';
      },
      error: (error) => {
        console.error('Erro ao solicitar redefinição de senha:', error);

        // Se for erro vindo do Firebase, tentar traduzir
        if (error?.code) {
          this.errorMessage = getFirebaseErrorMessage(error.code);
        } else if (error?.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Não foi possível enviar o e-mail de redefinição de senha. Tente novamente.';
        }

        this.resetLoading.set(false);
      },
      complete: () => {
        this.resetLoading.set(false);
      }
    });
  }
}