import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-dvh flex flex-col items-center justify-center bg-tavern-wood relative sm:overflow-hidden">
      <div class="w-full flex items-center justify-center p-4">
        <div class="bg-midnight-brown/90 rounded-xl p-5 sm:p-8 max-w-md w-full shadow-2xl">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Nova senha</h2>

          @if (!oobCode) {
            <p class="text-scroll-beige/80 text-center mb-6">Este link de redefinição é inválido ou está incompleto.</p>
            <a routerLink="/recuperar-senha" class="inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg">
              Pedir um novo link
            </a>
          } @else if (sucesso()) {
            <p class="text-scroll-beige/80 text-center mb-6">Senha atualizada. Entre com a nova senha.</p>
            <a routerLink="/login" class="inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg">
              Ir para o login
            </a>
          } @else {
            <form (ngSubmit)="onSalvar()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-scroll-beige mb-2" for="senha">Nova senha</label>
                <input
                  id="senha"
                  type="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  minlength="6"
                  autocomplete="new-password"
                  class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="mínimo de 6 caracteres"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-scroll-beige mb-2" for="confirmar">Confirmar senha</label>
                <input
                  id="confirmar"
                  type="password"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  required
                  autocomplete="new-password"
                  class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                  placeholder="repita a senha"
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
                {{ loading() ? 'Salvando...' : 'Salvar senha' }}
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `
})
export class RedefinirSenhaComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  oobCode = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);
  sucesso = signal(false);
  errorMessage = '';

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    this.oobCode = params.get('oobCode') || '';
  }

  onSalvar() {
    this.errorMessage = '';
    if (this.password.length < 6) {
      this.errorMessage = 'A senha precisa ter pelo menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'A confirmação da senha não confere.';
      return;
    }

    this.loading.set(true);
    this.authService.definirNovaSenha(this.oobCode, this.password).subscribe({
      next: () => this.sucesso.set(true),
      error: (error) => {
        this.errorMessage = error?.code
          ? getFirebaseErrorMessage(error.code)
          : 'Não foi possível redefinir a senha. Peça um novo link.';
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
