import { Component, OnInit, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { CharacterIndexService } from '../../core/content/loaders/character-index.service';
import { ImageService } from '../../core/services/image.service';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { Character } from '../../core/content/models';

@Component({
  selector: 'app-character-detail-page',
  imports: [RouterLink, NgOptimizedImage, SocialShareComponent],
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(MetaService);
  private readonly characterIndex = inject(CharacterIndexService);
  private readonly imageService = inject(ImageService);

  protected readonly character = signal<Character | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadCharacter();
  }

  private async loadCharacter(): Promise<void> {
    try {
      this.loading.set(true);
      const slug = this.route.snapshot.paramMap.get('slug');
      
      if (!slug) {
        this.error.set('No character selected');
        return;
      }

      await this.characterIndex.ensureIndex();
      const char = this.characterIndex.getBySlug(slug);

      if (!char) {
        this.error.set(`Character "${slug}" not found`);
        this.meta.setTitle('Character Not Found | Newportmaeve Archives');
        return;
      }

      this.character.set(char);
      this.meta.setTitle(`${char.name} | Newportmaeve Archives`);
      this.meta.setDescription(`Learn about ${char.name} - ${char.tagline || 'a character in Newport Maeve'}`);
      this.meta.setOgTitle(`${char.name} - Newportmaeve Archives`);
      this.meta.setOgDescription(`Discover the story of ${char.name}.`);
      this.meta.setOgType('article');
    } catch (err) {
      console.error('Error loading character:', err);
      this.error.set('Failed to load character data');
    } finally {
      this.loading.set(false);
    }
  }

  protected getImageUrl(filename: string | undefined): string {
    return filename ? this.imageService.resolveImageUrl('characters', filename) : this.imageService.getPlaceholderImage();
  }
}

