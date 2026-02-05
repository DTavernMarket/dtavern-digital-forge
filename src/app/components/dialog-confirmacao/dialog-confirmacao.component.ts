import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (mostrar) {
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        (click)="fechar()"
      >
        <div
          class="bg-midnight-brown border border-brass-accent/40 rounded-xl p-6 max-w-md w-full mx-4"
          (click)="$event.stopPropagation()"
        >
          <h3 class="text-xl font-semibold text-scroll-beige mb-4">{{ titulo }}</h3>
          <p class="text-scroll-beige/80 mb-6">
            {{ texto }}
          </p>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              (click)="cancelar()"
              class="px-6 py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors"
            >
              Não
            </button>
            <button
              type="button"
              (click)="confirmar()"
              class="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DialogConfirmacaoComponent {
  @Input() mostrar: boolean = false;
  @Input() titulo: string = 'Confirmar';
  @Input() texto: string = 'Você tem certeza?';

  @Output() resposta = new EventEmitter<boolean>();
  @Output() fecharDialog = new EventEmitter<void>();

  confirmar() {
    this.resposta.emit(true);
    this.mostrar = false;
    this.fecharDialog.emit();
  }

  cancelar() {
    this.resposta.emit(false);
    this.mostrar = false;
    this.fecharDialog.emit();
  }

  fechar() {
    this.cancelar();
  }
}

