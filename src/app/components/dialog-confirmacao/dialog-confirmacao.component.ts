import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (mostrar) {
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
        [style.z-index]="zIndex"
        (click)="fechar()"
      >
        <div
          class="bg-midnight-brown border border-brass-accent/40 rounded-xl p-5 sm:p-6 max-w-md w-full max-h-[90svh] overflow-y-auto"
          (click)="$event.stopPropagation()"
        >
          <h3 class="text-lg sm:text-xl font-semibold text-scroll-beige mb-4 break-words">{{ titulo }}</h3>
          <p class="text-scroll-beige/80 mb-6 break-words">
            {{ texto }}
          </p>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
            <button
              type="button"
              (click)="cancelar()"
              class="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-tavern-wood/20 border border-brass-accent/40 text-scroll-beige rounded-lg hover:bg-tavern-wood/30 transition-colors"
            >
              Não
            </button>
            <button
              type="button"
              (click)="confirmar()"
              class="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
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
  @Input() zIndex: number = 50;

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

