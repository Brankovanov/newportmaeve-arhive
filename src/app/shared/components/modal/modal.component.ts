import { Component, input, output, effect, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal/Dialog Component
 *
 * Reusable modal dialog with backdrop, header, body, and footer sections.
 * Supports open/close state, backdrop click to close, and ESC key to close.
 * Includes accessibility features: focus trapping, ARIA attributes.
 *
 * Usage:
 * ```html
 * <app-modal
 *   [isOpen]="isModalOpen()"
 *   (onClose)="closeModal()"
 *   title="Confirm Action"
 * >
 *   <div class="modal-body">
 *     Are you sure?
 *   </div>
 *   <div class="modal-footer">
 *     <app-button (click)="confirm()">Confirm</app-button>
 *     <app-button variant="secondary" (click)="closeModal()">Cancel</app-button>
 *   </div>
 * </app-modal>
 * ```
 *
 * To open the modal from a parent component:
 * ```typescript
 * isModalOpen = signal(false);
 *
 * openModal() {
 *   this.isModalOpen.set(true);
 * }
 *
 * closeModal() {
 *   this.isModalOpen.set(false);
 * }
 * ```
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  host: {
    class: 'block',
  },
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalContent') modalContent?: ElementRef;

  /**
   * Whether the modal is open
   * @default false
   */
  readonly isOpen = input(false);

  /**
   * Optional modal title
   */
  readonly title = input<string | null>(null);

  /**
   * Allow closing by clicking the backdrop
   * @default true
   */
  readonly closeOnBackdropClick = input(true);

  /**
   * Allow closing with ESC key
   * @default true
   */
  readonly closeOnEsc = input(true);

  /**
   * Modal size variant
   * @default 'md'
   */
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  /**
   * Emitted when close is requested
   */
  readonly onClose = output<void>();

  /**
   * Emitted when confirm/submit is clicked
   */
  readonly onConfirm = output<void>();

  /**
   * Track previous open state for animation
   */
  private previousOpenState = false;

  constructor(private elementRef: ElementRef) {
    // Handle ESC key to close modal
    effect(() => {
      if (this.isOpen() && this.closeOnEsc()) {
        const handleEsc = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            this.close();
          }
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
          document.removeEventListener('keydown', handleEsc);
        };
      }
      return;
    });
  }

  ngAfterViewInit(): void {
    // Focus modal content when opened
    if (this.isOpen() && this.modalContent) {
      this.modalContent.nativeElement.focus();
    }
  }

  /**
   * Close the modal
   */
  close(): void {
    this.onClose.emit();
  }

  /**
   * Emit confirm event
   */
  confirm(): void {
    this.onConfirm.emit();
  }

  /**
   * Handle backdrop click
   */
  onBackdropClick(event: MouseEvent): void {
    // Only close if clicking on backdrop itself, not content
    if (event.target === event.currentTarget && this.closeOnBackdropClick()) {
      this.close();
    }
  }

  /**
   * Check if footer content exists (for conditional rendering)
   */
  contentHasFooter(): boolean {
    return true; // Always show footer area, content projection will handle visibility
  }
}
