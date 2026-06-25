import { Component, input } from '@angular/core';
import { Quote } from '../../../../core/content/models';

@Component({
  selector: 'app-home-quotes-section',
  standalone: true,
  templateUrl: './home-quotes-section.component.html',
  styleUrl: './home-quotes-section.component.scss',
})
export class HomeQuotesSectionComponent {
  readonly quotes = input.required<Quote[]>();
}