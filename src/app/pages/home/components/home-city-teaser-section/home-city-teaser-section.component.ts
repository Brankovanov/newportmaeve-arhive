import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { City } from '../../../../core/content/models';

@Component({
  selector: 'app-home-city-teaser-section',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './home-city-teaser-section.component.html',
  styleUrl: './home-city-teaser-section.component.scss',
})
export class HomeCityTeaserSectionComponent {
  readonly city = input.required<City>();
}