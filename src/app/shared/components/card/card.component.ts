import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Component
 *
 * Reusable card container with optional header, footer, and elevation.
 * Supports flexible content projection for maximum reusability.
 *
 * Elevation Levels:
 * - none (flat)
 * - sm (subtle shadow)
 * - md (default shadow)
 * - lg (prominent shadow)
 * - hover (interactive, glows on hover)
 *
 * Usage:
 * ```html
 * <app-card elevation="md">
 *   <div class="card-body">
 *     Card content goes here
 *   </div>
 * </app-card>
 *
 * <app-card elevation="hover">
 *   <div class="card-header">
 *     <h3>Title</h3>
 *   </div>
 *   <div class="card-body">
 *     Content
 *   </div>
 *   <div class="card-footer">
 *     Footer
 *   </div>
 * </app-card>
 * ```
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    class: 'block',
  },
})
export class CardComponent {
  /**
   * Elevation level for shadow/prominence
   * @default 'md'
   */
  readonly elevation = input<'none' | 'sm' | 'md' | 'lg' | 'hover'>('md');

  /**
   * Padding preset
   * @default 'md'
   */
  readonly padding = input<'sm' | 'md' | 'lg' | 'none'>('md');

  /**
   * Optional CSS class names to apply to the card
   */
  readonly class = input<string | null>(null);

  /**
   * Border radius
   * @default 'md'
   */
  readonly rounded = input<'none' | 'sm' | 'md' | 'lg'>('md');

  /**
   * Whether card has a border
   * @default true
   */
  readonly bordered = input(true);
}
