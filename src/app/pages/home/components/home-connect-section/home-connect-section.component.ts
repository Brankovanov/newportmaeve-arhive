import { Component, input } from '@angular/core';
import { CommunityLink } from '../../../../core/content/models';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { SocialShareComponent } from '../../../../shared/components/social-share/social-share.component';

@Component({
  selector: 'app-home-connect-section',
  standalone: true,
  imports: [CardComponent, SocialShareComponent],
  templateUrl: './home-connect-section.component.html',
  styleUrl: './home-connect-section.component.scss',
})
export class HomeConnectSectionComponent {
  readonly links = input.required<CommunityLink[]>();

  protected readonly iconByLabel: Record<string, string> = {
    YouTube: '▶',
    'Fandom Wiki': '📖',
    DeviantArt: '🎨',
    Facebook: '📢',
  };
}