import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  NmData,
  SeriesInfo,
  Audiobook,
  Character,
  City,
  Quote,
  Author,
  CommunityLink,
} from '../models';

/**
 * ContentLoaderService loads and validates static Newport Maeve content from JSON files.
 *
 * Provides typed access to:
 * - Series metadata (title, tagline, stats)
 * - Audiobook information (prequel details, YouTube embed)
 * - Characters (roster with metadata for detail pages)
 * - City and districts
 * - Quotes
 * - Author profile
 * - Community links
 *
 * All content is loaded asynchronously and cached. JSON validation ensures
 * malformed data is caught at load time.
 */
@Injectable({
  providedIn: 'root',
})
export class ContentLoaderService {
  private readonly http = inject(HttpClient);
  private contentCache: NmData | null = null;
  private loadPromise: Promise<NmData> | null = null;

  /**
   * Load and return all content in a single atomic operation.
   * Subsequent calls return the cached result.
   */
  async loadContent(): Promise<NmData> {
    if (this.contentCache) {
      return this.contentCache;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = this.loadAllContent();
    return this.loadPromise;
  }

  private async loadAllContent(): Promise<NmData> {
    const [series, audiobook, characters, city, quotes, author, communityLinks] =
      await Promise.all([
        this.loadSeries(),
        this.loadAudiobook(),
        this.loadCharacters(),
        this.loadCity(),
        this.loadQuotes(),
        this.loadAuthor(),
        this.loadCommunityLinks(),
      ]);

    this.contentCache = {
      series,
      audiobook,
      characters,
      city,
      quotes,
      author,
      communityLinks,
    };

    return this.contentCache;
  }

  private loadSeries(): Promise<SeriesInfo> {
    return this.loadAndValidate<SeriesInfo>('/data/series.json', this.validateSeries);
  }

  private loadAudiobook(): Promise<Audiobook> {
    return this.loadAndValidate<Audiobook>('/data/audiobook.json', this.validateAudiobook);
  }

  private loadCharacters(): Promise<Character[]> {
    return this.loadAndValidate<Character[]>('/data/characters.json', (data) => {
      if (!Array.isArray(data)) {
        throw new Error('Characters must be an array');
      }

      return data.map((char, idx) => this.validateCharacter(char, idx));
    });
  }

  private loadCity(): Promise<City> {
    return this.loadAndValidate<City>('/data/city.json', this.validateCity);
  }

  private loadQuotes(): Promise<Quote[]> {
    return this.loadAndValidate<Quote[]>('/data/quotes.json', (data) => {
      if (!Array.isArray(data)) {
        throw new Error('Quotes must be an array');
      }

      return data.map((quote, idx) => this.validateQuote(quote, idx));
    });
  }

  private loadAuthor(): Promise<Author> {
    return this.loadAndValidate<Author>('/data/author.json', this.validateAuthor);
  }

  private loadCommunityLinks(): Promise<CommunityLink[]> {
    return this.loadAndValidate<CommunityLink[]>('/data/community.json', (data) => {
      if (!Array.isArray(data)) {
        throw new Error('Community links must be an array');
      }

      return data.map((link, idx) => this.validateCommunityLink(link, idx));
    });
  }

  private loadAndValidate<T>(
    path: string,
    validate: (data: unknown) => T
  ): Promise<T> {
    return this.http
      .get(path)
      .toPromise()
      .then((data: unknown) => {
        try {
          return validate(data);
        } catch (err: unknown) {
          console.error(`Validation error in ${path}:`, err);
          throw err;
        }
      })
      .catch((err: unknown) => {
        console.error(`Failed to load content from ${path}:`, err);
        throw err;
      });
  }

  private validateSeries(data: unknown): SeriesInfo {
    if (typeof data !== 'object' || !data) {
      throw new Error('Series data must be an object');
    }

    const series = data as Record<string, unknown>;

    if (typeof series['title'] !== 'string') {
      throw new Error('Series title must be a string');
    }

    if (typeof series['tagline'] !== 'string') {
      throw new Error('Series tagline must be a string');
    }

    if (
      !Array.isArray(series['description']) ||
      !series['description'].every((d) => typeof d === 'string')
    ) {
      throw new Error('Series description must be an array of strings');
    }

    if (!Array.isArray(series['stats'])) {
      throw new Error('Series stats must be an array');
    }

    return data as SeriesInfo;
  }

  private validateAudiobook(data: unknown): Audiobook {
    if (typeof data !== 'object' || !data) {
      throw new Error('Audiobook data must be an object');
    }

    const audiobook = data as Record<string, unknown>;

    if (typeof audiobook['title'] !== 'string') {
      throw new Error('Audiobook title must be a string');
    }

    if (typeof audiobook['youtubeId'] !== 'string') {
      throw new Error('Audiobook youtubeId must be a string');
    }

    if (typeof audiobook['chapterCount'] !== 'number') {
      throw new Error('Audiobook chapterCount must be a number');
    }

    return data as Audiobook;
  }

  private validateCharacter(data: unknown, index: number): Character {
    if (typeof data !== 'object' || !data) {
      throw new Error(`Character at index ${index} must be an object`);
    }

    const char = data as Record<string, unknown>;

    if (typeof char['slug'] !== 'string' || !char['slug']) {
      throw new Error(`Character at index ${index} must have a non-empty slug`);
    }

    if (typeof char['name'] !== 'string') {
      throw new Error(`Character "${char['slug']}" must have a name`);
    }

    if (!/^[a-z0-9-]+$/.test(char['slug'] as string)) {
      throw new Error(`Character slug "${char['slug']}" must be lowercase alphanumeric with hyphens only`);
    }

    return data as Character;
  }

  private validateCity(data: unknown): City {
    if (typeof data !== 'object' || !data) {
      throw new Error('City data must be an object');
    }

    const city = data as Record<string, unknown>;

    if (typeof city['name'] !== 'string') {
      throw new Error('City name must be a string');
    }

    if (!Array.isArray(city['districts'])) {
      throw new Error('City districts must be an array');
    }

    (city['districts'] as unknown[]).forEach((district, idx) => {
      this.validateDistrict(district, idx);
    });

    return data as City;
  }

  private validateDistrict(data: unknown, index: number): void {
    if (typeof data !== 'object' || !data) {
      throw new Error(`District at index ${index} must be an object`);
    }

    const district = data as Record<string, unknown>;

    if (typeof district['slug'] !== 'string' || !district['slug']) {
      throw new Error(`District at index ${index} must have a non-empty slug`);
    }

    if (typeof district['name'] !== 'string') {
      throw new Error(`District "${district['slug']}" must have a name`);
    }

    if (!/^[a-z0-9-]+$/.test(district['slug'] as string)) {
      throw new Error(
        `District slug "${district['slug']}" must be lowercase alphanumeric with hyphens only`
      );
    }
  }

  private validateQuote(data: unknown, index: number): Quote {
    if (typeof data !== 'object' || !data) {
      throw new Error(`Quote at index ${index} must be an object`);
    }

    const quote = data as Record<string, unknown>;

    if (typeof quote['id'] !== 'string' || !quote['id']) {
      throw new Error(`Quote at index ${index} must have a non-empty id`);
    }

    if (typeof quote['text'] !== 'string') {
      throw new Error(`Quote "${quote['id']}" must have text`);
    }

    if (typeof quote['speaker'] !== 'string') {
      throw new Error(`Quote "${quote['id']}" must have a speaker`);
    }

    return data as Quote;
  }

  private validateAuthor(data: unknown): Author {
    if (typeof data !== 'object' || !data) {
      throw new Error('Author data must be an object');
    }

    const author = data as Record<string, unknown>;

    if (typeof author['name'] !== 'string') {
      throw new Error('Author name must be a string');
    }

    if (typeof author['bio'] !== 'string') {
      throw new Error('Author bio must be a string');
    }

    if (!Array.isArray(author['links'])) {
      throw new Error('Author links must be an array');
    }

    return data as Author;
  }

  private validateCommunityLink(data: unknown, index: number): CommunityLink {
    if (typeof data !== 'object' || !data) {
      throw new Error(`Community link at index ${index} must be an object`);
    }

    const link = data as Record<string, unknown>;

    if (typeof link['label'] !== 'string') {
      throw new Error(`Community link at index ${index} must have a label`);
    }

    if (typeof link['url'] !== 'string') {
      throw new Error(`Community link "${link['label']}" must have a url`);
    }

    return data as CommunityLink;
  }
}
