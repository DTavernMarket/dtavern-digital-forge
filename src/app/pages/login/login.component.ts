// src/app/pages/login/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getFirebaseErrorMessage } from '../../models/firebase-error-handler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="h-screen flex overflow-hidden bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <!-- Lado esquerdo: Card com imagem (40%) -->
      <div class="hidden lg:flex lg:w-[40%] items-center justify-center p-8">
        <div class="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="assets/images/Background login DTavern.png" 
            alt="Background DTavern"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <!-- Lado direito: Formulário com fundo gradiente (60%) -->
      <div class="w-full lg:w-[60%] h-screen flex items-center justify-center overflow-hidden">
        <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-8 max-w-md w-full mx-4">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Login</h2>
          
          <form (ngSubmit)="onLogin()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Email</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Senha</label>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
                placeholder="••••••••"
              />
            </div>
            
            @if (errorMessage) {
              <div class="text-red-400 text-sm">
                {{ errorMessage }}
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

  email = '';
  password = '';
  loading = signal<boolean>(false);
  errorMessage: string = '';

  onLogin() {
    this.loading.set(true);
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/']); // Redirecionar após login
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
}