import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';

@Component({
  selector: 'app-confirmar-conta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-dvh flex flex-col items-center justify-center bg-tavern-wood relative sm:overflow-hidden">
      <div class="w-full flex items-center justify-center p-4">
        <div class="bg-midnight-brown/90 rounded-xl p-5 sm:p-8 max-w-md w-full shadow-2xl text-center">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-4">Confirme sua conta</h2>

          @if (estado() === 'aplicando') {
            <p class="text-scroll-beige/80">Confirmando seu e-mail...</p>
          } @else if (estado() === 'sucesso') {
            <p class="text-scroll-beige/80 mb-6">E-mail confirmado. Você já pode entrar.</p>
            <a routerLink="/login" class="inline-flex items-center justify-center min-h-[44px] w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg">
              Ir para o login
            </a>
          } @else if (estado() === 'invalido') {
            <p class="text-red-300 mb-6">{{ errorMessage }}</p>
            <a routerLink="/login" class="text-candlelight-gold hover:underline text-sm">Voltar ao login</a>
          } @else {
            <p class="text-scroll-beige/80 mb-6">
              Enviamos um link de confirmação
              @if (email) { para <span class="text-scroll-beige">{{ email }}</span> }.
              Abra o e-mail para ativar a conta.
            </p>

            @if (mensagem) {
              <p class="text-sm text-scroll-beige mb-4">{{ mensagem }}</p>
            }
            @if (errorMessage) {
              <p class="text-sm text-red-300 mb-4">{{ errorMessage }}</p>
            }

            <button
              type="button"
              (click)="reenviar()"
              [disabled]="loading()"
              class="w-full min-h-[44px] px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg disabled:opacity-50"
            >
              {{ loading() ? 'Enviando...' : 'Reenviar e-mail' }}
            </button>
            <a routerLink="/login" class="mt-4 inline-block text-sm text-candlelight-gold hover:underline">Ir para o login</a>
          }
        </div>
      </div>
    </div>
  `
})
export class ConfirmarContaComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  email = '';
  estado = signal<'aguardando' | 'aplicando' | 'sucesso' | 'invalido'>('aguardando');
  loading = signal(false);
  mensagem = '';
  errorMessage = '';

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    this.email = params.get('email') || '';
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    if (mode === 'verifyEmail' && oobCode) {
      this.estado.set('aplicando');
      this.authService.confirmarEmail(oobCode).subscribe({
        next: () => this.estado.set('sucesso'),
        error: (error) => {
          this.errorMessage = error?.code
            ? getFirebaseErrorMessage(error.code)
            : 'Não foi possível confirmar este link.';
          this.estado.set('invalido');
        }
      });
    }
  }

  reenviar() {
    this.mensagem = '';
    this.errorMessage = '';
    this.loading.set(true);
    this.authService.reenviarConfirmacao().subscribe({
      next: () => {
        this.mensagem = 'Enviamos outro e-mail de confirmação.';
      },
      error: (error) => {
        this.errorMessage = error?.code
          ? getFirebaseErrorMessage(error.code)
          : (error?.message || 'Não foi possível reenviar o e-mail. Entre novamente e tente de novo.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
