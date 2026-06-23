import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type SkeletonVariant = 'text' | 'avatar' | 'card' | 'button' | 'list';
type SkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * Skeleton Loader component for displaying loading placeholders
 *
 * @example
 * ```html
 * <!-- Text skeleton (default) -->
 * <app-skeleton-loader />
 *
 * <!-- Avatar skeleton -->
 * <app-skeleton-loader variant="avatar" width="3rem" height="3rem" />
 *
 * <!-- Card skeleton -->
 * <app-skeleton-loader variant="card" />
 *
 * <!-- List skeleton with multiple rows -->
 * <app-skeleton-loader variant="list" [count]="5" />
 * ```
 */
@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SkeletonLoaderComponent {
  /** Skeleton loader variant/type */
  variant = input<SkeletonVariant>('text');

  /** Number of skeleton lines (for text/list variants) */
  count = input<number>(1);

  /** Custom width (CSS value) */
  width = input<string | null>(null);

  /** Custom height (CSS value) */
  height = input<string | null>(null);

  /** Border radius variant */
  rounded = input<SkeletonRounded>('md');

  /** Optional CSS classes */
  class = input<string | null>(null);

  /**
   * Generate array for list repetition
   */
  getSkeletonCount(): number[] {
    return Array(this.count()).fill(0).map((_, i) => i);
  }

  /**
   * Generate random width for text lines (between 70-100%)
   */
  getRandomWidth(index: number): string {
    const widths = ['70%', '75%', '80%', '85%', '90%', '95%', '100%'];
    return widths[index % widths.length];
  }
}
