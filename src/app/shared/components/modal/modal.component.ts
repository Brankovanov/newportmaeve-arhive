import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, effect, inject, input, output } from '@angular/core';

let modalInstanceId = 0;

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
  @ViewChild('modalContent') modalContent?: ElementRef<HTMLElement>;

  private readonly document = inject(DOCUMENT);
  private readonly hostElement = inject(ElementRef<HTMLElement>);

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
   * Optional description for screen readers
   */
  readonly description = input<string | null>(null);

  /**
   * Emitted when close is requested
   */
  readonly onClose = output<void>();

  /**
   * Emitted when confirm/submit is clicked
   */
  readonly onConfirm = output<void>();

  protected readonly titleId = `modal-title-${modalInstanceId}`;
  protected readonly bodyId = `modal-body-${modalInstanceId}`;

  /**
   * Track previous open state for animation
   */
  private previousOpenState = false;
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor() {
    modalInstanceId += 1;

    effect(() => {
      const isOpen = this.isOpen();

      if (isOpen && !this.previousOpenState) {
        this.captureFocus();
        queueMicrotask(() => this.focusInitialElement());
      }

      if (!isOpen && this.previousOpenState) {
        this.restoreFocus();
      }

      this.previousOpenState = isOpen;
    });

    // Handle ESC key to close modal
    effect(() => {
      if (!this.isOpen()) {
        return;
      }

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.closeOnEsc()) {
          event.preventDefault();
          this.close();
          return;
        }

        if (event.key === 'Tab') {
          this.trapFocus(event);
        }
      };

      this.document.addEventListener('keydown', handleKeydown);

      return () => {
        this.document.removeEventListener('keydown', handleKeydown);
      };
    });
  }

  ngAfterViewInit(): void {
    if (this.isOpen() && this.modalContent) {
      this.focusInitialElement();
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

  private captureFocus(): void {
    const activeElement = this.document.activeElement;
    this.previouslyFocusedElement = activeElement instanceof HTMLElement ? activeElement : null;
  }

  private focusInitialElement(): void {
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }

    this.modalContent?.nativeElement.focus();
  }

  private restoreFocus(): void {
    this.previouslyFocusedElement?.focus();
    this.previouslyFocusedElement = null;
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0) {
      event.preventDefault();
      this.modalContent?.nativeElement.focus();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const activeElement = this.document.activeElement;

    if (event.shiftKey && activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const modalElement = this.modalContent?.nativeElement ?? this.hostElement.nativeElement;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(modalElement.querySelectorAll(focusableSelector))
      .map((element) => element as HTMLElement)
      .filter((element) => !element.hasAttribute('hidden') && !element.getAttribute('aria-hidden'));
  }
}
