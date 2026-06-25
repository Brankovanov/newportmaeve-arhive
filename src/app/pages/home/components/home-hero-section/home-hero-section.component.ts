import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.scss',
})
export class HomeHeroSectionComponent {}