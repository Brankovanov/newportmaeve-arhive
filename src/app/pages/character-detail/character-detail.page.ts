import { Component, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-detail-page',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly slug = computed(() => this.route.snapshot.paramMap.get('slug') ?? 'unknown');
  protected readonly displayName = computed(() => this.slug().replace(/-/g, ' '));
}
