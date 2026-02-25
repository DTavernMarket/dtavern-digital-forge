import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-botao-padrao',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button
      [routerLink]="routerLink"
      [queryParams]="queryParams"
      [type]="type"
      [disabled]="disabled"
      [class]="getClasses()"
      (click)="onClick($event)"
    >
      <span class="relative z-10">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

             button {
         position: relative;
         overflow: hidden;
         @apply bg-candlelight-gold text-tavern-wood rounded-lg font-medium transition-all duration-300 border-none cursor-pointer inline-flex items-center justify-center;
       }

       button:hover {
         @apply shadow-lg;
       }

             button:disabled {
         @apply opacity-50 cursor-not-allowed;
       }

      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 1.2s ease;
        z-index: 1;
      }

      button:hover::before {
        left: 100%;
      }

      button:disabled::before {
        display: none;
      }
    `,
  ],
})
export class BotaoPadraoComponent {
  @Input() routerLink?: string | unknown[];
  @Input() queryParams?: Record<string, string>;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth = false;

     getClasses(): string {
     const sizeClasses = {
       sm: 'px-3 py-1.5 text-sm',
       md: 'px-4 py-2 text-sm',
       lg: 'px-6 py-3 text-base'
     };
     const widthClass = this.fullWidth ? 'w-full' : '';

     return `${sizeClasses[this.size]} ${widthClass}`.trim();
   }

  onClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
  }
}
