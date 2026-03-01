// src/app/pages/cadastro/cadastro.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtesaoService } from '../../services/artesao.service';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro',
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
        <div class="bg-midnight-brown/90 border border-brass-accent/40 rounded-xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-medieval font-bold text-scroll-beige mb-6 text-center">Criar Conta</h2>
        
        <!-- Indicador de Passos -->
        <div class="flex items-center justify-center mb-6">
          <div class="flex items-center">
            <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                 [class.bg-candlelight-gold]="step === 1"
                 [class.border-candlelight-gold]="step === 1"
                 [class.text-tavern-wood]="step === 1"
                 [class.border-brass-accent]="step !== 1"
                 [class.text-scroll-beige]="step !== 1">
              <span class="text-sm font-semibold">1</span>
            </div>
            <div class="w-12 h-0.5 mx-2 transition-colors"
                 [ngClass]="step === 2 ? 'bg-candlelight-gold' : 'bg-brass-accent/40'">
            </div>
            <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
                 [class.bg-candlelight-gold]="step === 2"
                 [class.border-candlelight-gold]="step === 2"
                 [class.text-tavern-wood]="step === 2"
                 [class.border-brass-accent]="step !== 2"
                 [class.text-scroll-beige]="step !== 2">
              <span class="text-sm font-semibold">2</span>
            </div>
          </div>
        </div>

        <!-- Passo 1: Seleção do Tipo de Usuário -->
        <div *ngIf="step === 1" class="space-y-6">
          <div class="text-center">
            <p class="text-scroll-beige text-lg mb-2">O que você deseja fazer?</p>
            <p class="text-scroll-beige/70 text-sm">Escolha como você vai usar sua conta</p>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <button
              type="button"
              (click)="selecionarTipoUsuario('artesao')"
              class="p-6 border-2 rounded-lg transition-all duration-300 text-left"
              [ngClass]="{
                'border-candlelight-gold': tipoUsuario === 'artesao',
                'bg-candlelight-gold/10': tipoUsuario === 'artesao',
                'border-brass-accent/40': tipoUsuario !== 'artesao',
                'hover:border-candlelight-gold': tipoUsuario !== 'artesao'
              }"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-scroll-beige font-semibold text-lg mb-1">Vender Produtos</h3>
                  <p class="text-scroll-beige/70 text-sm">Crie sua própria loja e venda seus produtos</p>
                </div>
                <div *ngIf="tipoUsuario === 'artesao'" class="flex-shrink-0">
                  <svg class="w-6 h-6 text-candlelight-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </button>
            
            <button
              type="button"
              (click)="selecionarTipoUsuario('cliente')"
              class="p-6 border-2 rounded-lg transition-all duration-300 text-left"
              [ngClass]="{
                'border-candlelight-gold': tipoUsuario === 'cliente',
                'bg-candlelight-gold/10': tipoUsuario === 'cliente',
                'border-brass-accent/40': tipoUsuario !== 'cliente',
                'hover:border-candlelight-gold': tipoUsuario !== 'cliente'
              }"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-candlelight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-scroll-beige font-semibold text-lg mb-1">Comprar Produtos</h3>
                  <p class="text-scroll-beige/70 text-sm">Explore e compre produtos dos artesãos</p>
                </div>
                <div *ngIf="tipoUsuario === 'cliente'" class="flex-shrink-0">
                  <svg class="w-6 h-6 text-candlelight-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
          
          <button
            type="button"
            (click)="proximoPasso()"
            [disabled]="!tipoUsuario"
            class="w-full px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>

        <!-- Passo 2: Formulário de Cadastro -->
        <form *ngIf="step === 2" (ngSubmit)="onRegister()" class="space-y-4">
          <!-- Formulário para Artesão -->
          <ng-container *ngIf="tipoUsuario === 'artesao'">
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Nome da Loja</label>
              <input
                type="text"
                [(ngModel)]="nomeLoja"
                name="nomeLoja"
                required
                (blur)="validarNomeLoja()"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="nomeLojaError"
                placeholder="Nome da sua loja"
              />
              <div *ngIf="nomeLojaError" class="text-red-400 text-sm mt-1">
                {{ nomeLojaError }}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Email da Loja</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                (blur)="validarEmail()"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="emailError"
                placeholder="loja@email.com"
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
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
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
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="confirmacaoSenhaError"
                placeholder="••••••••"
              />
              <div *ngIf="confirmacaoSenhaError" class="text-red-400 text-sm mt-1">
                {{ confirmacaoSenhaError }}
              </div>
            </div>
          </ng-container>

          <!-- Formulário para Cliente -->
          <ng-container *ngIf="tipoUsuario === 'cliente'">
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Nome Completo</label>
              <input
                type="text"
                [(ngModel)]="nomeCompleto"
                name="nomeCompleto"
                required
                (blur)="validarNomeCompleto()"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="nomeCompletoError"
                placeholder="Seu nome completo"
              />
              <div *ngIf="nomeCompletoError" class="text-red-400 text-sm mt-1">
                {{ nomeCompletoError }}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Apelido</label>
              <div class="text-scroll-beige/60 text-xs mt-1">
                É assim que você será apresentado no DTavern
              </div>
              <input
                type="text"
                [(ngModel)]="apelido"
                name="apelido"
                required
                (blur)="validarApelido()"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="apelidoError"
                placeholder="Seu apelido"
              />
              <div *ngIf="apelidoError" class="text-red-400 text-sm mt-1">
                {{ apelidoError }}
              </div>

            </div>
            
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Email</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                (blur)="validarEmail()"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="emailError"
                placeholder="seu@email.com"
              />
              <div *ngIf="emailError" class="text-red-400 text-sm mt-1">
                {{ emailError }}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-scroll-beige mb-2">Data de Nascimento</label>
              <input
                type="date"
                [(ngModel)]="dataNascimento"
                name="dataNascimento"
                required
                (blur)="validarDataNascimento()"
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="dataNascimentoError"
              />
              <div *ngIf="dataNascimentoError" class="text-red-400 text-sm mt-1">
                {{ dataNascimentoError }}
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
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
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
                class="w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige"
                [class.border-red-500]="confirmacaoSenhaError"
                placeholder="••••••••"
              />
              <div *ngIf="confirmacaoSenhaError" class="text-red-400 text-sm mt-1">
                {{ confirmacaoSenhaError }}
              </div>
            </div>
          </ng-container>
          
          <div *ngIf="errorMessage" class="text-red-400 text-sm">
            {{ errorMessage }}
          </div>
          
          <div class="flex space-x-3">
            <button
              type="button"
              (click)="voltarPasso()"
              class="flex-1 px-6 py-3 border-2 border-brass-accent/40 text-scroll-beige font-semibold rounded-lg hover:border-candlelight-gold hover:text-candlelight-gold transition-colors"
            >
              Voltar
            </button>
            <button
              type="submit"
              [disabled]="loading() || !formularioValido()"
              class="flex-1 px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading() ? 'Criando conta...' : 'Criar conta' }}
            </button>
          </div>
        </form>
        
        <div class="mt-4 text-center space-y-2">
          <p class="text-scroll-beige/70 text-sm">
            Já tem uma conta?
            <a routerLink="/login" class="text-candlelight-gold hover:underline">Fazer login</a>
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
export class CadastroComponent implements OnInit {
  private authService = inject(AuthService);
  private artesaoService = inject(ArtesaoService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  step = 1;
  tipoUsuario: 'artesao' | 'cliente' | null = null;
  nomeLoja = '';
  nomeCompleto = '';
  apelido = '';
  email = '';
  dataNascimento = '';
  password = '';
  confirmPassword = '';
  loading = signal<boolean>(false);
  errorMessage = '';
  nomeLojaError = '';
  nomeCompletoError = '';
  apelidoError = '';
  emailError = '';
  dataNascimentoError = '';
  senhaError = '';
  confirmacaoSenhaError = '';

  ngOnInit(): void {
    const cadastro = this.route.snapshot.queryParamMap.get('cadastro');
    if (cadastro === 'artesao' || cadastro === 'cliente') {
      this.tipoUsuario = cadastro;
    }
  }

  selecionarTipoUsuario(tipo: 'artesao' | 'cliente') {
    this.tipoUsuario = tipo;
  }

  proximoPasso() {
    if (this.tipoUsuario) {
      this.step = 2;
    }
  }

  voltarPasso() {
    this.step = 1;
  }

  validarNomeLoja(): boolean {
    this.nomeLojaError = '';

    if (!this.nomeLoja) {
      this.nomeLojaError = 'Nome da loja é obrigatório';
      return false;
    }

    if (this.nomeLoja.trim().length < 3) {
      this.nomeLojaError = 'O nome da loja deve ter no mínimo 3 caracteres';
      return false;
    }

    if (this.nomeLoja.trim().length > 100) {
      this.nomeLojaError = 'O nome da loja deve ter no máximo 100 caracteres';
      return false;
    }

    return true;
  }

  validarNomeCompleto(): boolean {
    this.nomeCompletoError = '';

    if (!this.nomeCompleto) {
      this.nomeCompletoError = 'Nome completo é obrigatório';
      return false;
    }

    if (this.nomeCompleto.trim().length < 3) {
      this.nomeCompletoError = 'O nome completo deve ter no mínimo 3 caracteres';
      return false;
    }

    if (this.nomeCompleto.trim().length > 200) {
      this.nomeCompletoError = 'O nome completo deve ter no máximo 200 caracteres';
      return false;
    }

    return true;
  }

  validarApelido(): boolean {
    this.apelidoError = '';

    if (!this.apelido) {
      this.apelidoError = 'Apelido é obrigatório';
      return false;
    }

    if (this.apelido.trim().length < 1) {
      this.apelidoError = 'O apelido deve ter no mínimo 1 caracter';
      return false;
    }

    if (this.apelido.trim().length > 50) {
      this.apelidoError = 'O apelido deve ter no máximo 50 caracteres';
      return false;
    }

    return true;
  }

  validarDataNascimento(): boolean {
    this.dataNascimentoError = '';

    if (!this.dataNascimento) {
      this.dataNascimentoError = 'Data de nascimento é obrigatória';
      return false;
    }

    const data = new Date(this.dataNascimento);
    const hoje = new Date();
    const idadeMinima = new Date();
    idadeMinima.setFullYear(hoje.getFullYear() - 120); // Máximo 120 anos

    if (isNaN(data.getTime())) {
      this.dataNascimentoError = 'Data de nascimento inválida';
      return false;
    }

    if (data > hoje) {
      this.dataNascimentoError = 'A data de nascimento não pode ser no futuro';
      return false;
    }

    if (data < idadeMinima) {
      this.dataNascimentoError = 'Data de nascimento inválida';
      return false;
    }

    // Verificar se a pessoa tem pelo menos 13 anos (idade mínima comum para cadastros)
    const idadeMinimaPermitida = new Date();
    idadeMinimaPermitida.setFullYear(hoje.getFullYear() - 13);
    if (data > idadeMinimaPermitida) {
      this.dataNascimentoError = 'Você deve ter pelo menos 13 anos para criar uma conta';
      return false;
    }

    return true;
  }

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
    if (this.tipoUsuario === 'artesao') {
      const nomeLojaValido = this.validarNomeLoja();
      const emailValido = this.validarEmail();
      const senhaValida = this.validarSenha();
      const confirmacaoValida = this.validarConfirmacaoSenha();
      return nomeLojaValido && emailValido && senhaValida && confirmacaoValida &&
        this.nomeLoja !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.confirmPassword !== '';
    } else {
      const nomeCompletoValido = this.validarNomeCompleto();
      const apelidoValido = this.validarApelido();
      const emailValido = this.validarEmail();
      const dataNascimentoValida = this.validarDataNascimento();
      const senhaValida = this.validarSenha();
      const confirmacaoValida = this.validarConfirmacaoSenha();
      return nomeCompletoValido && apelidoValido && emailValido && dataNascimentoValida && senhaValida && confirmacaoValida &&
        this.nomeCompleto !== '' &&
        this.apelido !== '' &&
        this.email !== '' &&
        this.dataNascimento !== '' &&
        this.password !== '' &&
        this.confirmPassword !== '';
    }
  }

  onRegister() {
    // Limpar mensagens de erro anteriores
    this.errorMessage = '';
    this.nomeLojaError = '';
    this.nomeCompletoError = '';
    this.apelidoError = '';
    this.emailError = '';
    this.dataNascimentoError = '';
    this.senhaError = '';
    this.confirmacaoSenhaError = '';

    // Validar todos os campos
    let camposValidos = false;

    if (this.tipoUsuario === 'artesao') {
      const nomeLojaValido = this.validarNomeLoja();
      const emailValido = this.validarEmail();
      const senhaValida = this.validarSenha();
      const confirmacaoValida = this.validarConfirmacaoSenha();
      camposValidos = nomeLojaValido && emailValido && senhaValida && confirmacaoValida;
    } else {
      const nomeCompletoValido = this.validarNomeCompleto();
      const apelidoValido = this.validarApelido();
      const emailValido = this.validarEmail();
      const dataNascimentoValida = this.validarDataNascimento();
      const senhaValida = this.validarSenha();
      const confirmacaoValida = this.validarConfirmacaoSenha();
      camposValidos = nomeCompletoValido && apelidoValido && emailValido && dataNascimentoValida && senhaValida && confirmacaoValida;
    }

    if (!camposValidos) {
      this.errorMessage = 'Por favor, corrija os erros no formulário';
      return;
    }

    this.loading.set(true);

    if (this.tipoUsuario === 'artesao') {
      // Criar loja do artesão
      this.artesaoService.criarLoja({
        nomeLoja: this.nomeLoja.trim(),
        email: this.email.trim(),
        password: this.password
      }).subscribe({
        next: (response) => {
          console.log('Loja criada:', response);
          this.router.navigate(['/login']); // Redirecionar após cadastro
        },
        error: (error) => {
          console.error('Erro ao criar loja:', error);
          this.tratarErroBackend(error);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
    } else {
      // Criar conta de cliente
      this.clienteService.criarCliente({
        nomeCompleto: this.nomeCompleto.trim(),
        apelido: this.apelido.trim(),
        email: this.email.trim(),
        password: this.password,
        dataNascimento: this.dataNascimento
      }).subscribe({
        next: () => {
          console.log('Cliente criado com sucesso');
          this.router.navigate(['/login']); // Redirecionar após cadastro
        },
        error: (error) => {
          console.error('Erro ao criar cliente:', error);
          this.tratarErroBackend(error);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
    }
  }

  /**
   * Trata erros retornados pelo backend
   * Verifica se é o erro de email já existente e exibe a mensagem apropriada
   */
  tratarErroBackend(error: any): void {
    // Limpar erros anteriores
    this.emailError = '';
    this.errorMessage = '';

    // Verificar se o erro tem o formato esperado do backend
    if (error?.error) {
      const errorData = error.error;

      // Verificar se é o erro de email já existente
      if (errorData.codigoErro === 'EMAIL_JA_EXISTE' && errorData.mensagem) {
        // Exibir erro no campo de email
        this.emailError = errorData.mensagem;
        // Também exibir na mensagem geral
        this.errorMessage = errorData.mensagem;
        return;
      }

      // Outros erros do backend
      if (errorData.mensagem) {
        this.errorMessage = errorData.mensagem;
        return;
      }

      // Fallback para mensagem padrão do backend
      if (typeof errorData === 'string') {
        this.errorMessage = errorData;
        return;
      }
    }

    // Fallback para mensagem genérica
    this.errorMessage = 'Erro ao criar conta. Tente novamente.';
  }
}

