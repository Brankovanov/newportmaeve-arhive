import { Injectable, inject } from '@angular/core';
import { District } from '../models';
import { ContentLoaderService } from './content-loader.service';

/**
 * DistrictIndexService provides slug-to-district lookup and city exploration.
 * Enables fast O(1) district detail page route resolution.
 */
@Injectable({
  providedIn: 'root',
})
export class DistrictIndexService {
  private readonly loader = inject(ContentLoaderService);
  private districtIndex: Map<string, District> | null = null;
  private districts: District[] | null = null;

  /**
   * Load and build the district index if not already cached.
   */
  async ensureIndex(): Promise<void> {
    if (this.districtIndex && this.districts) {
      return;
    }

    const content = await this.loader.loadContent();
    const sortedDistricts = [...content.city.districts].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    this.districts = sortedDistricts;
    this.districtIndex = new Map(sortedDistricts.map((district) => [district.slug, district]));
  }

  /**
   * Get district by slug. Returns null if not found.
   * Call ensureIndex() first, or use findBySlug() for automatic loading.
   */
  getBySlug(slug: string): District | null {
    if (!this.districtIndex) {
      throw new Error('District index not loaded. Call ensureIndex() first.');
    }

    return this.districtIndex.get(slug) ?? null;
  }

  /**
   * Load and get district by slug. Automatically ensures index is built.
   */
  async findBySlug(slug: string): Promise<District | null> {
    await this.ensureIndex();
    return this.getBySlug(slug);
  }

  /**
   * Get all districts sorted by displayOrder. Returns null if index not yet loaded.
   */
  getAllDistricts(): District[] | null {
    return this.districts ? [...this.districts] : null;
  }

  /**
   * Load and get all districts sorted by displayOrder.
   */
  async findAll(): Promise<District[]> {
    await this.ensureIndex();
    return [...this.districts!];
  }
}
