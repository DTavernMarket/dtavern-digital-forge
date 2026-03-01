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
          [readonly]="readonly"
          [required]="required"
          [min]="min"
          [max]="max"
          [step]="step"
          [attr.maxlength]="maxlength"
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
          [readonly]="readonly"
          [required]="required"
          [rows]="rows"
          [attr.maxlength]="maxlength"
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
  @Input() readonly: boolean = false;
  @Input() icon: string = '';
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  
  // Propriedades numéricas
  @Input() min: number | string = '';
  @Input() max: number | string = '';
  @Input() step: number | string = '';
  @Input() rows: number = 3;
  @Input() maxlength: number | string = '';
  
  // Valor externo (para campos readonly)
  @Input() set value(value: string | number | null | undefined) {
    if (value !== null && value !== undefined) {
      this._value = String(value);
    } else {
      this._value = '';
    }
  }
  get value(): string {
    return this._value;
  }
  
  // Classes customizáveis
  @Input() labelClasses: string = 'text-scroll-beige/80 text-sm font-medium mb-2';
  @Input() inputClasses: string = 'w-full px-4 py-2 bg-tavern-wood/20 border border-brass-accent/40 rounded-lg text-scroll-beige placeholder-scroll-beige/60';
  @Input() iconClasses: string = 'text-scroll-beige/60';
  @Input() helpTextClasses: string = 'text-scroll-beige/60';
  
  // Propriedades de tamanho
  @Input() width: string = 'w-full';
  @Input() height: string = '';

  private _value: string = '';
  isFocused = false;

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event) {
    if (this.readonly) {
      return; // Não permite mudanças em campos readonly
    }
    const target = event.target as HTMLInputElement;
    this._value = target.value;
    this.onChange(this._value);
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
    if (!this.readonly) {
      // Só atualiza via ControlValueAccessor se não for readonly
      // Campos readonly devem ser atualizados via @Input() value
      this._value = value || '';
    }
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
    
    if (this.readonly) {
      classes += ' bg-tavern-wood/10 cursor-not-allowed text-scroll-beige/70';
    }
    
    if (this.errorMessage) {
      classes = classes.replace('border-brass-accent/40', 'border-red-400');
    }
    
    return classes;
  }
}
