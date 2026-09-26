import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { take } from 'rxjs/operators';
import { BarraNavegacaoComponent } from '../../components/barra-navegacao/barra-navegacao.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { StatusPagamento, Venda } from '../../models/venda.model';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-minha-conta-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BarraNavegacaoComponent, RodapeComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-midnight-brown via-tavern-wood to-dark-brown font-body flex flex-col">
      <app-barra-navegacao [isFixed]="false" />

      <section class="py-8 flex-1">
        <div class="container mx-auto px-4">
          <div class="mb-8">
            <h1 class="text-3xl font-medieval font-bold text-scroll-beige mb-2">Meus Pedidos</h1>
            <p class="text-scroll-beige/70">Acompanhe o status de todos os seus pagamentos.</p>
          </div>

          <div class="mb-6 flex flex-col md:flex-row gap-3 md:items-end">
            <div class="flex-1">
              <label class="block text-sm text-scroll-beige/70 mb-2">Buscar por produto ou loja</label>
              <input
                type="text"
                [(ngModel)]="termoBusca"
                (keyup.enter)="buscarPedidos()"
                placeholder="Nome do produto ou da loja"
                class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/30 rounded-lg text-scroll-beige placeholder-scroll-beige/50"
              />
            </div>
            <div class="w-full md:w-56">
              <label class="block text-sm text-scroll-beige/70 mb-2">Status</label>
              <select
                [(ngModel)]="statusSelecionado"
                (change)="buscarPedidos()"
                class="w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/30 rounded-lg text-scroll-beige"
              >
                <option value="">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="APROVADO">Aprovado</option>
                <option value="RECUSADO">Recusado</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>
            <button
              (click)="buscarPedidos()"
              class="px-6 py-3 bg-candlelight-gold text-tavern-wood font-semibold rounded-lg hover:bg-candlelight-gold/90 transition-colors"
            >
              Buscar
            </button>
          </div>

          @if (carregando()) {
            <div class="text-center py-16 text-scroll-beige/80">Carregando pedidos...</div>
          } @else if (pedidos().length === 0) {
            <div class="bg-midnight-brown/50 border border-brass-accent/30 rounded-lg p-8 text-center text-scroll-beige/80">
              Nenhum pedido encontrado com os filtros atuais.
            </div>
          } @else {
            <div class="space-y-3">
              @for (pedido of pedidos(); track pedido.dataCompra.toString() + pedido.produto.nomeNormalizado) {
                <article class="bg-midnight-brown/50 border border-brass-accent/30 rounded-lg p-5">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p class="text-scroll-beige font-semibold text-lg">{{ pedido.produto.nome }}</p>
                      <p class="text-scroll-beige/70 text-sm">
                        Loja:
                        <a
                          [routerLink]="['/lojas', pedido.produto.dominioLoja]"
                          class="text-candlelight-gold hover:underline"
                        >
                          {{ pedido.produto.nomeLoja }}
                        </a>
                      </p>
                      <p class="text-scroll-beige/60 text-xs mt-1">{{ formatarData(pedido.dataCompra) }}</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="text-candlelight-gold font-semibold">R$ {{ pedido.valorVenda | number:'1.2-2' }}</span>
                      <span
                        class="px-3 py-1 rounded-full text-xs font-semibold border"
                        [ngClass]="classesStatus(pedido.statusPagamento)"
                      >
                        {{ rotuloStatus(pedido.statusPagamento) }}
                      </span>
                    </div>
                  </div>
                </article>
              }
            </div>

            @if (totalPages() > 1) {
              <div class="mt-8 flex justify-center items-center gap-4">
                <button
                  (click)="irParaPagina(paginaAtual() - 1)"
                  [disabled]="paginaAtual() === 0"
                  class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg disabled:opacity-50"
                >
                  Anterior
                </button>
                <span class="text-scroll-beige/70">Página {{ paginaAtual() + 1 }} de {{ totalPages() }}</span>
                <button
                  (click)="irParaPagina(paginaAtual() + 1)"
                  [disabled]="paginaAtual() >= totalPages() - 1"
                  class="px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            }
          }
        </div>
      </section>

      <app-rodape />
    </div>
  `,
})
export class MinhaContaPedidosComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private authService = inject(AuthService);
  private router = inject(Router);

  pedidos = signal<Venda[]>([]);
  carregando = signal(true);
  paginaAtual = signal(0);
  totalPages = signal(0);
  tamanhoPagina = 10;
  termoBusca = '';
  statusSelecionado: StatusPagamento | '' = '';

  ngOnInit(): void {
    this.authService.getUserRole().pipe(take(1)).subscribe({
      next: (role) => {
        if (role !== 'COMPRADOR') {
          this.router.navigate(['/']);
          return;
        }
        this.buscarPedidos();
      },
      error: () => this.router.navigate(['/login']),
    });
  }

  buscarPedidos(): void {
    this.carregando.set(true);
    this.paginaAtual.set(0);
    this.carregarPagina(0);
  }

  irParaPagina(page: number): void {
    if (page < 0 || page >= this.totalPages()) return;
    this.carregarPagina(page);
  }

  private carregarPagina(page: number): void {
    this.carregando.set(true);
    this.clienteService
      .getPedidosCliente(
        page,
        this.tamanhoPagina,
        this.termoBusca || undefined,
        this.statusSelecionado
      )
      .subscribe({
        next: (resultado) => {
          this.pedidos.set(resultado.content);
          this.paginaAtual.set(resultado.page);
          this.totalPages.set(resultado.totalPages);
          this.carregando.set(false);
        },
        error: () => {
          this.pedidos.set([]);
          this.totalPages.set(0);
          this.carregando.set(false);
        },
      });
  }

  formatarData(data: Date | string): string {
    const dataObj = typeof data === 'string' ? new Date(data) : data;
    return dataObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  rotuloStatus(status: StatusPagamento): string {
    switch (status) {
      case 'APROVADO':
        return 'Aprovado';
      case 'RECUSADO':
        return 'Recusado';
      case 'CANCELADO':
        return 'Cancelado';
      default:
        return 'Pendente';
    }
  }

  classesStatus(status: StatusPagamento): string {
    switch (status) {
      case 'APROVADO':
        return 'border-green-400/60 text-green-300 bg-green-500/10';
      case 'RECUSADO':
        return 'border-red-400/60 text-red-300 bg-red-500/10';
      case 'CANCELADO':
        return 'border-orange-400/60 text-orange-300 bg-orange-500/10';
      default:
        return 'border-yellow-400/60 text-yellow-200 bg-yellow-500/10';
    }
  }
}
