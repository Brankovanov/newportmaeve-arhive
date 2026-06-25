import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { Author } from '../../../../core/content/models';

@Component({
  selector: 'app-home-author-section',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home-author-section.component.html',
  styleUrl: './home-author-section.component.scss',
})
export class HomeAuthorSectionComponent {
  readonly author = input.required<Author>();
}