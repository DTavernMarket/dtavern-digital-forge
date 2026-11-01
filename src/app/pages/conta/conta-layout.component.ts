import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { MenuLateralContaComponent } from '../../components/menu-lateral-conta/menu-lateral-conta.component';

@Component({
  selector: 'app-conta-layout',
  standalone: true,
  imports: [RouterModule, BarraNavegacaoComponent, MenuLateralContaComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown">
      <app-barra-navegacao [isFixed]="true" />
      <div class="pt-20">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col gap-6 md:flex-row md:items-start">
            <app-menu-lateral-conta />
            <div class="min-w-0 flex-1">
              <router-outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContaLayoutComponent {}
