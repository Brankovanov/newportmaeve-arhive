import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { SeriesInfo } from '../../../../core/content/models';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { StatCounterComponent } from '../stat-counter/stat-counter.component';

@Component({
  selector: 'app-home-series-summary-section',
  standalone: true,
  imports: [NgOptimizedImage, CardComponent, StatCounterComponent],
  templateUrl: './home-series-summary-section.component.html',
  styleUrl: './home-series-summary-section.component.scss',
})
export class HomeSeriesSummarySectionComponent {
  readonly series = input.required<SeriesInfo>();
}