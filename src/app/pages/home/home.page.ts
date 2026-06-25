import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  Audiobook,
  Author,
  Character,
  City,
  CommunityLink,
  Quote,
  SeriesInfo,
} from '../../core/content/models';
import { ContentLoaderService } from '../../core/content/loaders/content-loader.service';
import { MetaService } from '../../core/services/meta.service';
import { HomeAudiobookSectionComponent } from './components/home-audiobook-section/home-audiobook-section.component';
import { HomeAuthorSectionComponent } from './components/home-author-section/home-author-section.component';
import { HomeCharacterRosterSectionComponent } from './components/home-character-roster-section/home-character-roster-section.component';
import { HomeCityTeaserSectionComponent } from './components/home-city-teaser-section/home-city-teaser-section.component';
import { HomeConnectSectionComponent } from './components/home-connect-section/home-connect-section.component';
import { HomeHeroSectionComponent } from './components/home-hero-section/home-hero-section.component';
import { HomeQuotesSectionComponent } from './components/home-quotes-section/home-quotes-section.component';
import { HomeSeriesSummarySectionComponent } from './components/home-series-summary-section/home-series-summary-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeAudiobookSectionComponent,
    HomeAuthorSectionComponent,
    HomeCharacterRosterSectionComponent,
    HomeCityTeaserSectionComponent,
    HomeConnectSectionComponent,
    HomeHeroSectionComponent,
    HomeQuotesSectionComponent,
    HomeSeriesSummarySectionComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  private readonly meta = inject(MetaService);
  private readonly loader = inject(ContentLoaderService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly series = signal<SeriesInfo | null>(null);
  protected readonly audiobook = signal<Audiobook | null>(null);
  protected readonly characters = signal<Character[]>([]);
  protected readonly quotes = signal<Quote[]>([]);
  protected readonly city = signal<City | null>(null);
  protected readonly author = signal<Author | null>(null);
  protected readonly communityLinks = signal<CommunityLink[]>([]);
  protected readonly featuredCharacters = computed(() => this.characters().slice(0, 6));
  protected readonly featuredQuotes = computed(() => this.quotes().slice(0, 3));

  ngOnInit(): void {
    this.meta.setTitle('The Newport Maeve Chronicles | Newportmaeve Archives');
    this.meta.setDescription(
      'Enter the Newportmaeve Archives and explore the gothic noir fantasy world of Newport Maeve through its prequel, characters, city, and creator.'
    );
    this.meta.setOgTitle('The Newport Maeve Chronicles');
    this.meta.setOgDescription(
      'A gothic noir fantasy world of steam, shadows, immortals, and a city under pressure.'
    );
    this.meta.setOgType('website');

    void this.loadHomeContent();
  }

  private async loadHomeContent(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const content = await this.loader.loadContent();
      this.series.set(content.series);
      this.audiobook.set(content.audiobook);
      this.characters.set(content.characters);
      this.quotes.set(content.quotes);
      this.city.set(content.city);
      this.author.set(content.author);
      this.communityLinks.set(content.communityLinks);
    } catch (error: unknown) {
      console.error('Error loading home content:', error);
      this.error.set('Failed to load the Newport Maeve home archive.');
    } finally {
      this.loading.set(false);
    }
  }
}
