import { Injectable } from '@angular/core';
import { NmImage } from '../content/models';

/**
 * ImageService handles image path resolution and optimization metadata.
 * All images are stored in public/images/ with a consistent folder structure.
 *
 * Supported categories:
 * - characters: Character portraits, turnarounds, sheets, and items (.webp)
 * - districts: District imagery and maps (.webp)
 * - city: City-wide imagery (.webp)
 * - author: Author and creator images (.webp)
 * - content: General content, covers, and placeholders (.webp, .svg)
 *
 * All images use optimized WebP format with SVG placeholders as fallback.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly basePath = '/images';

  /**
   * Resolve the URL for an image based on its type and identifier.
   * Supports characters, districts, city, author, and general content images.
   */
  resolveImageUrl(category: 'characters' | 'districts' | 'city' | 'author' | 'content', filename: string): string {
    if (!filename) {
      return this.getPlaceholderImage();
    }
    return `${this.basePath}/${category}/${filename}`;
  }

  /**
   * Get optimized image metadata for NgOptimizedImage.
   * Provides dimensions and proper alt text handling.
   */
  getImageMetadata(image: NmImage | string): { url: string; width?: number; height?: number; alt: string } {
    if (typeof image === 'string') {
      return {
        url: image,
        alt: 'Image'
      };
    }

    const category = image.type ?? 'content';
    const metadata = {
      url: this.resolveImageUrl(category, image.src),
      alt: image.alt || 'Image'
    };

    if (image.width && image.height) {
      return {
        ...metadata,
        width: image.width,
        height: image.height
      };
    }

    return metadata;
  }

  /**
   * Get a placeholder image URL for missing content.
   */
  getPlaceholderImage(): string {
    return `${this.basePath}/content/placeholder.svg`;
  }

  /**
   * Validate that an image exists by checking if the path is well-formed.
   */
  isValidImagePath(filename: string): boolean {
    return typeof filename === 'string' && filename.length > 0 && !filename.includes('://');
  }
}
