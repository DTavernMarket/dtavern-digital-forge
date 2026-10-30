import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-dvh flex flex-col items-center justify-center bg-tavern-wood relative sm:overflow-hidden">
      <div class="w-full flex items-center justify-center p-4">
        <div class="bg-midnight-brown/90 rounded-xl p-5 sm:p-8 max-w-md w-full shadow-2xl">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-4 text-center">Recuperar senha</h2>
          <p class="text-sm text-scroll-beige/80 mb-6 text-center">
            Informe o e-mail da conta. Vamos enviar um link para escolher uma nova senha.
          </p>

          @if (enviado()) {
            <p class="text-scroll-beige mb-6 text-center">
              Se existir uma conta com esse e-mail, o link de redefinição foi enviado.
            </p>
            <a routerLink="/login" class="inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg">
              Voltar ao login
            </a>
          } @else {
            <form (ngSubmit)="onEnviar()" class="space-y-4">
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

              @if (errorMessage) {
                <p class="text-sm text-red-300">{{ errorMessage }}</p>
              }

              <button
                type="submit"
                [disabled]="loading()"
                class="w-full min-h-[44px] px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg disabled:opacity-50"
              >
                {{ loading() ? 'Enviando...' : 'Enviar link' }}
              </button>
            </form>
            <p class="mt-4 text-center text-sm">
              <a routerLink="/login" class="text-candlelight-gold hover:underline">Voltar ao login</a>
            </p>
          }
        </div>
      </div>
    </div>
  `
})
export class RecuperarSenhaComponent {
  private authService = inject(AuthService);

  email = '';
  loading = signal(false);
  enviado = signal(false);
  errorMessage = '';

  onEnviar() {
    this.errorMessage = '';
    this.loading.set(true);
    this.authService.resetarSenha(this.email).subscribe({
      next: () => this.enviado.set(true),
      error: (error) => {
        this.errorMessage = error?.code
          ? getFirebaseErrorMessage(error.code)
          : (error?.message || 'Não foi possível enviar o e-mail.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
