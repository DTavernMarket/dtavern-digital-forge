// src/app/pages/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown flex items-center justify-center">
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
          
          <div *ngIf="errorMessage" class="text-red-400 text-sm">
            {{ errorMessage }}
          </div>
          
          <button
            type="submit"
            [disabled]="loading"
            class="w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
        
        <div class="mt-4 text-center">
          <p class="text-scroll-beige/70 text-sm">
            Não tem uma conta?
            <a routerLink="/cadastro" class="text-candlelight-gold hover:underline">Registre-se</a>
          </p>
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
  loading = false;
  errorMessage = '';

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login realizado:', response);
        this.router.navigate(['/']); // Redirecionar após login
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = error.message || 'Erro ao fazer login. Verifique suas credenciais.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}