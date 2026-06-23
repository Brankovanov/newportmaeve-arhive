import { Component, OnInit, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';

@Component({
  selector: 'app-character-detail-page',
  imports: [RouterLink, TitleCasePipe, SocialShareComponent],
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    const displayName = this.displayName();
    this.meta.setTitle(`${displayName} | Newportmaeve Archives`);
    this.meta.setDescription(`Learn about ${displayName} - a key figure in the chronicles of Newport Maeve.`);
    this.meta.setOgTitle(`${displayName} - Newportmaeve Archives`);
    this.meta.setOgDescription(`Discover the story of ${displayName}.`);
    this.meta.setOgType('article');
  }

  protected readonly slug = computed(() => this.route.snapshot.paramMap.get('slug') ?? 'unknown');
  protected readonly displayName = computed(() => this.slug().replace(/-/g, ' '));
}
