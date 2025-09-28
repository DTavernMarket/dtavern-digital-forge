import { Component, Input, Output, EventEmitter, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface OpcaoSelect {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-customizado',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomizadoComponent),
      multi: true
    }
  ],
  template: `
    <div class="mb-4">
      <label *ngIf="label" class="block text-sm font-medium mb-2" [class]="labelClasses">
        {{ label }}
      </label>
      <div class="relative">
        <button
          (click)="toggleDropdown()"
          [class]="buttonClasses"
        >
          <span>{{ obterTextoSelecionado() }}</span>
          <svg class="w-4 h-4 transition-transform" [class.rotate-180]="isOpen()" [class]="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        <!-- Dropdown Customizado -->
        <div
          *ngIf="isOpen()"
          [class]="dropdownClasses"
        >
          <div class="py-1">
            <button
              *ngFor="let opcao of opcoes"
              (click)="selecionarOpcao(opcao.value)"
              [class]="optionClasses"
            >
              {{ opcao.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SelectCustomizadoComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() opcoes: OpcaoSelect[] = [];
  @Input() valorSelecionado: string = '';
  @Input() placeholder: string = 'Selecione uma opção';
  
  // Classes customizáveis
  @Input() labelClasses: string = 'text-scroll-beige/80';
  @Input() buttonClasses: string = 'w-full px-3 py-2 bg-stone-gray/20 backdrop-blur-sm border border-brass-accent/30 rounded-lg text-scroll-beige focus:outline-none focus:ring-2 focus:ring-candlelight-gold/50 text-sm flex items-center justify-between';
  @Input() iconClasses: string = 'text-scroll-beige/60';
  @Input() dropdownClasses: string = 'absolute top-full left-0 right-0 mt-1 bg-midnight-brown border border-brass-accent/30 rounded-lg shadow-xl z-50';
  @Input() optionClasses: string = 'w-full text-left px-3 py-1.5 text-scroll-beige hover:bg-stone-gray/40 transition-colors text-sm';

  @Output() valorMudou = new EventEmitter<string>();

  isOpen = signal(false);
  value: string = '';
  disabled = false;

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  selecionarOpcao(valor: string) {
    this.value = valor;
    this.isOpen.set(false);
    this.onChange(this.value);
    this.onTouched();
    this.valorMudou.emit(valor);
  }

  obterTextoSelecionado(): string {
    if (!this.value) {
      return this.placeholder;
    }
    
    const opcao = this.opcoes.find(o => o.value === this.value);
    return opcao ? opcao.label : this.placeholder;
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
