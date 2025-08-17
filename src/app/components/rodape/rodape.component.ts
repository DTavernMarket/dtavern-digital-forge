import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-card/80 backdrop-blur-sm border-t border-tavern-brass/30">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Logo e Descrição -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-tavern-brass to-accent rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-tavern-wood" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-xl font-medieval font-bold text-foreground">
                DTavern
              </span>
            </div>
            <p class="text-sm text-foreground/70">
              O marketplace definitivo para produtos digitais de RPG de mesa. 
              Conectando artesãos talentosos com jogadores apaixonados.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links Rápidos -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-foreground">Links Rápidos</h3>
            <ul class="space-y-2">
              <li>
                <a routerLink="/produtos" class="text-foreground/60 hover:text-accent transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#artesaos" class="text-foreground/60 hover:text-accent transition-colors">
                  Artesãos
                </a>
              </li>
              <li>
                <a href="#sobre" class="text-foreground/60 hover:text-accent transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <!-- Categorias -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-foreground">Categorias</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  Tokens
                </a>
              </li>
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  Mapas
                </a>
              </li>
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  Aventuras
                </a>
              </li>
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  Trilhas Sonoras
                </a>
              </li>
              <li>
                <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                  Ferramentas
                </a>
              </li>
            </ul>
          </div>

          <!-- Contato -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-foreground">Contato</h3>
            <div class="space-y-2 text-sm text-foreground/60">
              <p>contato@dtavern.com</p>
              <p>Suporte: suporte@dtavern.com</p>
              <p>Horário: Seg-Sex, 9h-18h</p>
            </div>
            <div class="pt-4">
              <button class="px-4 py-2 bg-gradient-to-r from-accent to-magical-glow text-tavern-wood rounded-lg font-medium hover:shadow-lg transition-all text-sm">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>

        <!-- Linha de Separação -->
        <div class="border-t border-tavern-brass/30 mt-8 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div class="text-sm text-foreground/60">
              © 2024 DTavern. Todos os direitos reservados.
            </div>
            <div class="flex space-x-6 text-sm">
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                Termos de Uso
              </a>
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" class="text-foreground/60 hover:text-accent transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RodapeComponent {}
