import { Injectable, inject } from '@angular/core';
import { Character } from '../models';
import { ContentLoaderService } from './content-loader.service';

/**
 * CharacterIndexService provides slug-to-character lookup and roster access.
 * Enables fast O(1) character detail page route resolution.
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterIndexService {
  private readonly loader = inject(ContentLoaderService);
  private characterIndex: Map<string, Character> | null = null;

  /**
   * Load and build the character index if not already cached.
   */
  async ensureIndex(): Promise<void> {
    if (this.characterIndex) {
      return;
    }

    const content = await this.loader.loadContent();
    this.characterIndex = new Map(
      content.characters.map((char: Character) => [char.slug, char])
    );
  }

  /**
   * Get character by slug. Returns null if not found.
   * Call ensureIndex() first, or use findBySlug() for automatic loading.
   */
  getBySlug(slug: string): Character | null {
    if (!this.characterIndex) {
      throw new Error('Character index not loaded. Call ensureIndex() first.');
    }

    return this.characterIndex.get(slug) ?? null;
  }

  /**
   * Load and get character by slug. Automatically ensures index is built.
   */
  async findBySlug(slug: string): Promise<Character | null> {
    await this.ensureIndex();
    return this.getBySlug(slug);
  }

  /**
   * Get all characters. Returns null if index not yet loaded.
   */
  getAllCharacters(): Character[] | null {
    return this.characterIndex ? Array.from(this.characterIndex.values()) : null;
  }

  /**
   * Load and get all characters. Automatically ensures index is built.
   */
  async findAll(): Promise<Character[]> {
    const content = await this.loader.loadContent();
    return content.characters;
  }
}
