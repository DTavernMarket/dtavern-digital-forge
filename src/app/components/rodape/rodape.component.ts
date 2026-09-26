import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-midnight-brown/90 backdrop-blur-sm border-t border-brass-accent/30">
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <!-- Logo e Descrição -->
           <div class="space-y-3">
             <div class="flex items-center space-x-2">
               <img
                 src="assets/images/dtavern/IMAGEOTIPO HORIZONTAL/PRINCIPAL.svg"
                 alt="DTavern"
                 class="h-10 w-auto object-contain"
               />
             </div>
             <p class="text-xs text-scroll-beige/70">
               Sua loja de RPG pronta para vender. Publique seus produtos digitais e compartilhe um
               link unico com sua comunidade.
             </p>
          </div>

                     <!-- Links Rápidos -->
           <div class="space-y-1">
             <h3 class="text-base font-semibold text-scroll-beige">Links Rápidos</h3>
             <ul class="space-y-1">
              <li>
                <a [routerLink]="['/cadastro']" [queryParams]="{ cadastro: 'artesao' }" class="text-scroll-beige/60 hover:text-candlelight-gold transition-colors">
                  Criar minha loja
                </a>
              </li>
              <li>
                <a routerLink="/login" class="text-scroll-beige/60 hover:text-candlelight-gold transition-colors">
                  Entrar
                </a>
              </li>
              <li>
                <a routerLink="/sobre" class="text-scroll-beige/60 hover:text-candlelight-gold transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

                     <!-- Resumo do fluxo v0 -->
           <div class="space-y-1">
             <h3 class="text-base font-semibold text-scroll-beige">Para Artesãos</h3>
             <ul class="space-y-1">
              <li>
                <span class="text-scroll-beige/60">Crie sua loja</span>
              </li>
              <li>
                <span class="text-scroll-beige/60">Publique seus produtos</span>
              </li>
              <li>
                <span class="text-scroll-beige/60">Receba pagamentos via PIX</span>
              </li>
              <li>
                <span class="text-scroll-beige/60">Entregue arquivos digitais</span>
              </li>
            </ul>
          </div>

                     <!-- Contato -->
           <div>
             <h3 class="text-base font-semibold text-scroll-beige">Contato</h3>
             <div class="space-y-2 text-xs text-scroll-beige/60">
               <p>contato@dtavern.com</p>
               <p>Suporte: suporte@dtavern.com</p>
               <p>Horário: Seg-Sex, 9h-18h</p>
             </div>
             <div class="pt-3">
               <button
                 routerLink="/em-desenvolvimento"
                 class="px-4 py-2 bg-candlelight-gold text-tavern-wood rounded-lg font-medium hover:bg-warm-amber hover:shadow-lg transition-all text-xs"
               >
                 Fale Conosco
               </button>
             </div>
           </div>
        </div>

                 <!-- Linha de Separação -->
         <div class="border-t border-brass-accent/30 mt-2 pt-2">
           <div class="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
             <div class="text-xs text-scroll-beige/60">
               © 2024 DTavern. Todos os direitos reservados.
             </div>
             <div class="flex space-x-6 text-xs">
               <a routerLink="/termos-uso" class="text-scroll-beige/60 hover:text-candlelight-gold transition-colors">
                 Termos de Uso
               </a>
               <a routerLink="/politica-privacidade" class="text-scroll-beige/60 hover:text-candlelight-gold transition-colors">
                 Política de Privacidade
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
