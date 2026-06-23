import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type SpinnerVariant = 'circular' | 'dots' | 'bars';
type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'primary' | 'secondary';

/**
 * Spinner component for displaying loading states
 *
 * @example
 * ```html
 * <app-spinner variant="circular" size="md" color="primary" />
 *
 * <app-spinner variant="dots" size="lg" label="Loading..." />
 * ```
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [CommonModule],
  host: {
    role: 'status',
    'aria-live': 'polite',
    '[attr.aria-label]': 'accessibleLabel()',
    '[attr.aria-busy]': 'true',
    class: 'app-spinner',
  },
})
export class SpinnerComponent {
  /** Spinner animation style variant */
  variant = input<SpinnerVariant>('circular');

  /** Spinner size */
  size = input<SpinnerSize>('md');

  /** Spinner color theme */
  color = input<SpinnerColor>('primary');

  /** Optional label text displayed below spinner */
  label = input<string | null>(null);

  /** Optional ARIA label for accessibility */
  ariaLabel = input<string | null>(null);

  protected readonly accessibleLabel = computed(() => {
    return this.ariaLabel() ?? this.label() ?? 'Loading';
  });
}
