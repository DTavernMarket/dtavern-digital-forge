import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral-conta',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="flex w-full flex-row gap-2 md:w-52 md:flex-shrink-0 md:flex-col" aria-label="Conta">
      <a
        routerLink="/conta"
        routerLinkActive="ativo"
        [routerLinkActiveOptions]="{ exact: true }"
        class="rounded-lg px-4 py-3 text-sm font-medium text-scroll-beige transition-colors hover:bg-tavern-wood/20 hover:text-candlelight-gold [&.ativo]:bg-tavern-wood/30 [&.ativo]:text-candlelight-gold"
      >
        Minha Conta
      </a>
      <a
        routerLink="/conta/loja"
        routerLinkActive="ativo"
        class="rounded-lg px-4 py-3 text-sm font-medium text-scroll-beige transition-colors hover:bg-tavern-wood/20 hover:text-candlelight-gold [&.ativo]:bg-tavern-wood/30 [&.ativo]:text-candlelight-gold"
      >
        Minha loja
      </a>
    </nav>
  `
})
export class MenuLateralContaComponent {}
