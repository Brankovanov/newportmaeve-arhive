import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Character } from '../../../../core/content/models';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-home-character-roster-section',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './home-character-roster-section.component.html',
  styleUrl: './home-character-roster-section.component.scss',
})
export class HomeCharacterRosterSectionComponent {
  readonly characters = input.required<Character[]>();
}