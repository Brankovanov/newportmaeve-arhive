import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button Component
 *
 * Reusable button with support for multiple variants, sizes, and states.
 *
 * Variants:
 * - primary (brass accent) - Main CTAs, primary actions
 * - secondary (subtle) - Secondary actions, less prominent
 * - tertiary (danger) - Destructive actions, warnings
 *
 * Sizes:
 * - sm (small) - Compact buttons
 * - md (medium) - Default button size
 * - lg (large) - Prominent buttons
 *
 * Usage:
 * ```html
 * <app-button variant="primary" size="md">Click Me</app-button>
 * <app-button variant="secondary" disabled>Disabled</app-button>
 * <app-button variant="tertiary" (click)="onDelete()">Delete</app-button>
 * ```
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    class: 'inline-block',
  },
})
export class ButtonComponent {
  /**
   * Button style variant
   * @default 'primary'
   */
  readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary');

  /**
   * Button size
   * @default 'md'
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Disabled state
   * @default false
   */
  readonly disabled = input(false);

  /**
   * Button HTML type attribute
   * @default 'button'
   */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /**
   * Optional ARIA label for accessibility
   */
  readonly ariaLabel = input<string | null>(null);

  /**
   * Click event emitter
   */
  readonly click = output<void>();

  /**
   * Emit click event
   */
  onButtonClick(): void {
    if (!this.disabled()) {
      this.click.emit();
    }
  }
}
