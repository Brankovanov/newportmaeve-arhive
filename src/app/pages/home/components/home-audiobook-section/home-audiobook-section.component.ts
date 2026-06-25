import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Audiobook } from '../../../../core/content/models';

@Component({
  selector: 'app-home-audiobook-section',
  standalone: true,
  templateUrl: './home-audiobook-section.component.html',
  styleUrl: './home-audiobook-section.component.scss',
})
export class HomeAudiobookSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly audiobook = input.required<Audiobook>();

  protected readonly embedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.audiobook().youtubeId}`
    )
  );
}