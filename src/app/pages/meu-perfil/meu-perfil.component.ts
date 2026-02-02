// src/app/pages/meu-perfil/meu-perfil.component.ts
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ArtesaoService } from '../../services/artesao.service';
import { ClienteService } from '../../services/cliente.service';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { MeResponseLoja, MeResponseCliente } from '../../models/auth.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-meu-perfil',
    standalone: true,
    imports: [CommonModule, RouterModule, BarraNavegacaoComponent],
    template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="true" />
      <div class="pt-20">
        <div class="container mx-auto px-4 py-6">
          <!-- Cabeçalho -->
          <div class="mb-6 flex flex-col items-center">
            <h1 class="text-2xl md:text-3xl font-medieval font-bold text-scroll-beige mb-1">
              Meu Perfil
            </h1>
            <p class="text-scroll-beige/70 text-xs md:text-sm">
              Visualize e gerencie as informações da sua conta
            </p>
          </div>

          <!-- Cards empilhados verticalmente -->
          <div class="flex flex-col gap-6 items-center">
            <!-- Card de Informações -->
            <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-4 md:p-6 h-fit w-[60%]">
              <h2 class="text-lg md:text-xl font-medieval font-semibold text-scroll-beige mb-4">
                Informações da Conta
              </h2>

              @if (loading()) {
                <div class="flex items-center justify-center py-6">
                  <svg class="animate-spin w-6 h-6 text-candlelight-gold" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-scroll-beige text-sm">Carregando...</span>
                </div>
              } @else {
                <div class="space-y-4">
                @if (userRole() === 'LOJA' && lojaData()) {
                  <!-- Campos para Loja -->
                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Nome da Loja
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ lojaData()?.nomeLoja || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Email
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ lojaData()?.email || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Domínio
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ lojaData()?.dominio || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Data de Criação da Conta
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ formatarData(lojaData()?.dataCriacaoConta) || 'Não informado' }}</span>
                    </div>
                  </div>
                } @else if (userRole() === 'COMPRADOR' && clienteData()) {
                  <!-- Campos para Cliente -->
                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Nome Completo
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ clienteData()?.nomeCompleto || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Apelido
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ clienteData()?.apelido || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Email
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ clienteData()?.email || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Data de Nascimento
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ formatarData(clienteData()?.dataNascimento) || 'Não informado' }}</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                      Data de Criação da Conta
                    </label>
                    <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige">
                      <span class="text-scroll-beige/80 text-sm">{{ formatarData(clienteData()?.dataCriacaoConta) || 'Não informado' }}</span>
                    </div>
                  </div>
                }

                <!-- Tipo da Conta -->
                <div>
                  <label class="block text-xs font-medium text-scroll-beige/80 mb-1">
                    Tipo da Conta
                  </label>
                  <div class="px-3 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg">
                    <span 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
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
            }
            </div>

            <!-- Card de Ações -->
            <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-4 md:p-6 h-fit w-[60%]">
              <h2 class="text-lg md:text-xl font-medieval font-semibold text-scroll-beige mb-4">
                Ações da Conta
              </h2>

              <!-- Mensagem de Erro -->
              @if (errorMessage()) {
                <div class="mb-3 p-3 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-xs">
                  {{ errorMessage() }}
                </div>
              }

              <div class="flex flex-row justify-around items-center gap-3">
                <!-- Botão Deletar Conta (esquerda) -->
                <button
                  (click)="deletarConta()"
                  [disabled]="deletando()"
                  class="w-2/5 px-3 py-2.5 bg-red-600/20 border-2 border-red-600/50 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 hover:border-red-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  @if (deletando()) {
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Deletando...</span>
                  } @else {
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    <span>Deletar Conta</span>
                  }
                </button>

                <!-- Botão Redefinir Senha (direita) -->
                <button
                  (click)="redefinirSenha()"
                  [disabled]="deletando()"
                  class="w-2/5 px-3 py-2.5 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                  </svg>
                  <span>Redefinir Senha</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MeuPerfilComponent implements OnInit, OnDestroy {
    private authService = inject(AuthService);
    private artesaoService = inject(ArtesaoService);
    private clienteService = inject(ClienteService);
    private router = inject(Router);
    private authSubscription?: Subscription;

    // Dados da loja
    lojaData = signal<MeResponseLoja | null>(null);
    
    // Dados do cliente
    clienteData = signal<MeResponseCliente | null>(null);
    
    userRole = signal<'LOJA' | 'COMPRADOR' | null>(null);
    deletando = signal<boolean>(false);
    errorMessage = signal<string | null>(null);
    loading = signal<boolean>(false);

    ngOnInit() {
        this.loading.set(true);
        
        // Carregar role do token primeiro
        this.authService.getUserRole().subscribe({
            next: (role) => {
                this.userRole.set(role);
                
                if (role === 'LOJA') {
                    // Carregar dados da loja
                    this.artesaoService.getMeLoja().subscribe({
                        next: (data) => {
                            this.lojaData.set(data);
                            this.loading.set(false);
                        },
                        error: (error) => {
                            console.error('Erro ao carregar dados da loja:', error);
                            this.errorMessage.set('Erro ao carregar dados da conta. Tente novamente.');
                            this.loading.set(false);
                        }
                    });
                } else if (role === 'COMPRADOR') {
                    // Carregar dados do cliente
                    this.clienteService.getMeCliente().subscribe({
                        next: (data) => {
                            this.clienteData.set(data);
                            this.loading.set(false);
                        },
                        error: (error) => {
                            console.error('Erro ao carregar dados do cliente:', error);
                            this.errorMessage.set('Erro ao carregar dados da conta. Tente novamente.');
                            this.loading.set(false);
                        }
                    });
                } else {
                    this.loading.set(false);
                }
            },
            error: (error) => {
                console.error('Erro ao obter role do token:', error);
                this.userRole.set(null);
                this.loading.set(false);
            }
        });
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    formatarData(data: string | undefined): string {
        if (!data) return '';
        try {
            const date = new Date(data);
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return data;
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

