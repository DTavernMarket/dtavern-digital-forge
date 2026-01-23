// src/app/pages/cadastro/cadastro.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown flex items-center justify-center">
      <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-8 max-w-md w-full mx-4">
        <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Criar Conta</h2>
        
        <form (ngSubmit)="onRegister()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-scroll-beige mb-2">Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              required
              (blur)="validarEmail()"
              class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              [class.border-red-500]="emailError"
              placeholder="seu@email.com"
            />
            <div *ngIf="emailError" class="text-red-400 text-sm mt-1">
              {{ emailError }}
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-scroll-beige mb-2">Senha</label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              (blur)="validarSenha()"
              class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              [class.border-red-500]="senhaError"
              placeholder="••••••••"
            />
            <div *ngIf="senhaError" class="text-red-400 text-sm mt-1">
              {{ senhaError }}
            </div>
            <div class="text-scroll-beige/60 text-xs mt-1">
              A senha deve ter entre 6 e 256 caracteres, incluindo letra maiúscula, minúscula e número.
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-scroll-beige mb-2">Confirmar Senha</label>
            <input
              type="password"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              required
              (blur)="validarConfirmacaoSenha()"
              class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold"
              [class.border-red-500]="confirmacaoSenhaError"
              placeholder="••••••••"
            />
            <div *ngIf="confirmacaoSenhaError" class="text-red-400 text-sm mt-1">
              {{ confirmacaoSenhaError }}
            </div>
          </div>
          
          <div *ngIf="errorMessage" class="text-red-400 text-sm">
            {{ errorMessage }}
          </div>
          
          <button
            type="submit"
            [disabled]="loading || !formularioValido()"
            class="w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </form>
        
        <div class="mt-4 text-center">
          <p class="text-scroll-beige/70 text-sm">
            Já tem uma conta?
            <a routerLink="/login" class="text-candlelight-gold hover:underline">Fazer login</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class CadastroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  emailError = '';
  senhaError = '';
  confirmacaoSenhaError = '';

  validarEmail(): boolean {
    this.emailError = '';
    
    if (!this.email) {
      this.emailError = 'Email é obrigatório';
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Email inválido';
      return false;
    }
    
    return true;
  }

  validarSenha(): boolean {
    this.senhaError = '';
    
    if (!this.password) {
      this.senhaError = 'Senha é obrigatória';
      return false;
    }
    
    if (this.password.length < 6) {
      this.senhaError = 'A senha deve ter no mínimo 6 caracteres';
      return false;
    }
    
    if (this.password.length > 256) {
      this.senhaError = 'A senha deve ter no máximo 256 caracteres';
      return false;
    }
    
    if (!/[A-Z]/.test(this.password)) {
      this.senhaError = 'A senha deve conter pelo menos uma letra maiúscula';
      return false;
    }
    
    if (!/[a-z]/.test(this.password)) {
      this.senhaError = 'A senha deve conter pelo menos uma letra minúscula';
      return false;
    }
    
    if (!/[0-9]/.test(this.password)) {
      this.senhaError = 'A senha deve conter pelo menos um número';
      return false;
    }
    
    // Se a senha mudou e já existe confirmação, validar novamente
    if (this.confirmPassword) {
      this.validarConfirmacaoSenha();
    }
    
    return true;
  }

  validarConfirmacaoSenha(): boolean {
    this.confirmacaoSenhaError = '';
    
    if (!this.confirmPassword) {
      this.confirmacaoSenhaError = 'Confirmação de senha é obrigatória';
      return false;
    }
    
    if (this.password !== this.confirmPassword) {
      this.confirmacaoSenhaError = 'As senhas não coincidem';
      return false;
    }
    
    return true;
  }

  formularioValido(): boolean {
    return this.validarEmail() && 
           this.validarSenha() && 
           this.validarConfirmacaoSenha() &&
           this.email !== '' &&
           this.password !== '' &&
           this.confirmPassword !== '';
  }

  onRegister() {
    // Limpar mensagens de erro anteriores
    this.errorMessage = '';
    this.emailError = '';
    this.senhaError = '';
    this.confirmacaoSenhaError = '';
    
    // Validar todos os campos
    const emailValido = this.validarEmail();
    const senhaValida = this.validarSenha();
    const confirmacaoValida = this.validarConfirmacaoSenha();
    
    if (!emailValido || !senhaValida || !confirmacaoValida) {
      this.errorMessage = 'Por favor, corrija os erros no formulário';
      return;
    }
    
    this.loading = true;
    
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Conta criada:', response);
        this.router.navigate(['/login']); // Redirecionar após cadastro
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        // Tentar extrair mensagem de erro do backend
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.error && typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else if (error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Erro ao criar conta. Tente novamente.';
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

