import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-counter.component.html',
  styleUrl: './stat-counter.component.scss',
})
export class StatCounterComponent implements AfterViewInit {
  readonly value = input('0');
  readonly label = input('');

  protected readonly displayValue = signal('0');
  private readonly counterElement = viewChild<ElementRef<HTMLElement>>('counter');

  ngAfterViewInit(): void {
    const elementRef = this.counterElement();

    if (!elementRef) {
      this.displayValue.set(this.value());
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        observer.disconnect();
        this.startCounter();
      },
      { threshold: 0.35 }
    );

    observer.observe(elementRef.nativeElement);
  }

  private startCounter(): void {
    const target = this.value();

    if (!/^\d+$/.test(target)) {
      this.displayValue.set(target);
      return;
    }

    const endValue = Number(target);

    if (endValue <= 0) {
      this.displayValue.set(target);
      return;
    }

    const durationMs = 800;
    const stepTimeMs = Math.max(Math.floor(durationMs / endValue), 24);
    let currentValue = 0;

    const timer = window.setInterval(() => {
      currentValue += 1;
      this.displayValue.set(String(currentValue));

      if (currentValue >= endValue) {
        window.clearInterval(timer);
      }
    }, stepTimeMs);
  }
}