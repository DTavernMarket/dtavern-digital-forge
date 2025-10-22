import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-customizado',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomizadoComponent),
      multi: true
    }
  ],
  template: `
    <div class="mb-4">
      <label *ngIf="label" class="block font-medium mb-2" [class]="labelClasses">
        {{ label }}
        <span *ngIf="required" class="text-red-400">*</span>
      </label>
      
      <div class="relative">
        <!-- Input normal -->
        <input
          *ngIf="type !== 'textarea'"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [required]="required"
          [min]="min"
          [max]="max"
          [step]="step"
          [class]="dynamicInputClasses"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />
        
        <!-- Textarea -->
        <textarea
          *ngIf="type === 'textarea'"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [required]="required"
          [rows]="rows"
          [class]="dynamicInputClasses + ' resize-none'"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        ></textarea>
        
        <!-- Ícone opcional -->
        <div *ngIf="icon && type !== 'textarea'" class="absolute inset-y-0 right-0 flex items-center pr-3">
          <span [class]="iconClasses">{{ icon }}</span>
        </div>
      </div>
      
      <!-- Mensagem de erro -->
      <div *ngIf="errorMessage" class="mt-1 text-sm text-red-400">
        {{ errorMessage }}
      </div>
      
      <!-- Texto de ajuda -->
      <div *ngIf="helpText && !errorMessage" class="mt-1 text-sm" [class]="helpTextClasses">
        {{ helpText }}
      </div>
    </div>
  `,
  styles: []
})
export class InputCustomizadoComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  
  // Propriedades numéricas
  @Input() min: number | string = '';
  @Input() max: number | string = '';
  @Input() step: number | string = '';
  @Input() rows: number = 3;
  
  // Classes customizáveis
  @Input() labelClasses: string = 'text-scroll-beige/80 text-sm';
  @Input() inputClasses: string = 'w-full px-4 py-3 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60 focus:outline-none focus:ring-2 focus:ring-candlelight-gold';
  @Input() iconClasses: string = 'text-scroll-beige/60';
  @Input() helpTextClasses: string = 'text-scroll-beige/60';
  
  // Propriedades de tamanho
  @Input() width: string = 'w-full';
  @Input() height: string = '';

  value: string = '';
  isFocused = false;

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }

  onFocus() {
    this.isFocused = true;
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

  // Getter para classes dinâmicas do input
  get dynamicInputClasses(): string {
    let classes = this.inputClasses;
    
    // Adicionar largura customizada
    if (this.width && this.width !== 'w-full') {
      classes = classes.replace('w-full', this.width);
    }
    
    // Adicionar altura customizada
    if (this.height) {
      classes += ` ${this.height}`;
    }
    
    // Adicionar classes de estado
    if (this.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    }
    
    if (this.errorMessage) {
      classes = classes.replace('border-brass-accent/40', 'border-red-400');
      classes = classes.replace('focus:ring-candlelight-gold', 'focus:ring-red-400');
    }
    
    return classes;
  }
}
