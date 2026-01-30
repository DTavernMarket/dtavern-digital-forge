// src/app/pages/meu-perfil/meu-perfil.component.ts
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ArtesaoService } from '../../services/artesao.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-meu-perfil',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-2xl mx-auto">
          <!-- Cabeçalho -->
          <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-medieval font-bold text-scroll-beige mb-2">
              Meu Perfil
            </h1>
            <p class="text-scroll-beige/70 text-sm">
              Visualize e gerencie as informações da sua conta
            </p>
          </div>

          <!-- Card de Informações -->
          <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-6 md:p-8 mb-6">
            <h2 class="text-xl font-medieval font-semibold text-scroll-beige mb-6">
              Informações da Conta
            </h2>

            <div class="space-y-6">
              <!-- Nome de Usuário / Nome da Loja -->
              <div>
                <label class="block text-sm font-medium text-scroll-beige/80 mb-2">
                  {{ userRole() === 'LOJA' ? 'Nome da Loja' : 'Nome de Usuário' }}
                </label>
                <div  class="px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                  <span class="text-scroll-beige/80" readonly>{{ displayName() || 'Não informado' }}</span>
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-scroll-beige/80 mb-2">
                  Email
                </label>
                <div class="px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                  <span class="text-scroll-beige/80" readonly>{{ email() || 'Não informado' }}</span>
                </div>
              </div>

              <!-- Tipo da Conta -->
              <div>
                <label class="block text-sm font-medium text-scroll-beige/80 mb-2">
                  Tipo da Conta
                </label>
                <div class="px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg">
                  <span 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    [ngClass]="{
                      'bg-candlelight-gold/20 text-candlelight-gold border border-candlelight-gold/30': userRole() === 'LOJA',
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30': userRole() === 'COMPRADOR'
                    }"
                  >
                    {{ userRole() === 'LOJA' ? 'Loja' : userRole() === 'COMPRADOR' ? 'Comprador' : 'Não definido' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-6 md:p-8">
            <h2 class="text-xl font-medieval font-semibold text-scroll-beige mb-6">
              Ações da Conta
            </h2>

            <!-- Mensagem de Erro -->
            @if (errorMessage()) {
              <div class="mb-4 p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm">
                {{ errorMessage() }}
              </div>
            }

            <div class="space-y-4">
              <!-- Botão Redefinir Senha -->
              <button
                (click)="redefinirSenha()"
                [disabled]="deletando()"
                class="w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                </svg>
                <span>Redefinir Senha</span>
              </button>

              <!-- Botão Deletar Conta -->
              <button
                (click)="deletarConta()"
                [disabled]="deletando()"
                class="w-full px-6 py-3 bg-red-600/20 border-2 border-red-600/50 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 hover:border-red-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                @if (deletando()) {
                  <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Deletando...</span>
                } @else {
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span>Deletar Conta</span>
                }
              </button>
            </div>
          </div>

          <!-- Botão Voltar -->
          <div class="mt-6">
            <button
              routerLink="/"
              class="px-6 py-3 border-2 border-brass-accent/40 text-scroll-beige font-semibold rounded-lg hover:border-candlelight-gold hover:text-candlelight-gold transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MeuPerfilComponent implements OnInit, OnDestroy {
    private authService = inject(AuthService);
    private artesaoService = inject(ArtesaoService);
    private router = inject(Router);
    private authSubscription?: Subscription;

    displayName = signal<string | null>(null);
    email = signal<string | null>(null);
    userRole = signal<'LOJA' | 'COMPRADOR' | null>(null);
    deletando = signal<boolean>(false);
    errorMessage = signal<string | null>(null);

    ngOnInit() {
        // Observar mudanças no estado de autenticação
        this.authSubscription = this.authService.currentUser$.subscribe(user => {
            if (user !== null) {
                // Pegar displayName e email diretamente do Firebase User
                this.displayName.set(user.displayName || user.email || null);
                this.email.set(user.email || null);

                // Carregar role do token
                this.authService.getUserRole().subscribe({
                    next: (role) => {
                        this.userRole.set(role);
                    },
                    error: (error) => {
                        console.error('Erro ao obter role do token:', error);
                        this.userRole.set(null);
                    }
                });
            } else {
                // Se não estiver autenticado, limpar dados
                this.displayName.set(null);
                this.email.set(null);
                this.userRole.set(null);
            }
        });
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    redefinirSenha() {
        // TODO: Implementar funcionalidade de redefinir senha
        console.log('Redefinir senha - funcionalidade a ser implementada');
    }

    deletarConta() {
        // Confirmar antes de deletar
        const confirmacao = confirm(
            'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.'
        );

        if (!confirmacao) {
            return;
        }

        const role = this.userRole();
        
        if (!role) {
            this.errorMessage.set('Não foi possível identificar o tipo de conta. Tente fazer login novamente.');
            return;
        }

        this.deletando.set(true);
        this.errorMessage.set(null);

        // Chamar a função apropriada baseada na role
        const deleteObservable = role === 'LOJA' 
            ? this.artesaoService.deletarLoja()
            : this.authService.deleteComprador();

        deleteObservable.subscribe({
            next: () => {
                // Conta deletada com sucesso, fazer logout e redirecionar
                this.authService.logout().subscribe({
                    next: () => {
                        this.router.navigate(['/']);
                    },
                    error: (error) => {
                        console.error('Erro ao fazer logout após deletar conta:', error);
                        // Mesmo com erro no logout, redirecionar
                        this.router.navigate(['/']);
                    }
                });
            },
            error: (error) => {
                console.error('Erro ao deletar conta:', error);
                this.errorMessage.set(
                    error.error?.message || 
                    'Erro ao deletar conta. Tente novamente mais tarde.'
                );
                this.deletando.set(false);
            }
        });
    }
}

