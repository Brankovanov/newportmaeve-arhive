import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { ContentLoaderService } from '../../core/content/loaders/content-loader.service';
import { Character } from '../../core/content/models';

@Component({
  selector: 'app-characters-page',
  imports: [RouterLink],
  templateUrl: './characters.page.html',
  styleUrl: './characters.page.scss'
})
export class CharactersPage implements OnInit {
  private readonly meta = inject(MetaService);
  private readonly loader = inject(ContentLoaderService);

  ngOnInit(): void {
    this.meta.setTitle('Characters | Newportmaeve Archives');
    this.meta.setDescription('Meet the enigmatic characters of Newport Maeve - archivists, cartographers, and keepers of forgotten tales.');
    this.meta.setOgTitle('Newportmaeve Characters');
    this.meta.setOgDescription('Discover the characters shaping the chronicles of Newport Maeve.');
    this.meta.setOgType('website');

    this.loadCharacters();
  }

  protected readonly characters = signal<Character[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly activeReveal = signal<string | null>(null);

  private async loadCharacters(): Promise<void> {
    try {
      this.loading.set(true);
      const content = await this.loader.loadContent();
      this.characters.set(content.characters);
    } catch (err) {
      console.error('Error loading characters:', err);
      this.error.set('Failed to load characters');
    } finally {
      this.loading.set(false);
    }
  }

  protected toggleReveal(slug: string): void {
    this.activeReveal.update((current) => (current === slug ? null : slug));
  }
}

