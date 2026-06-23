import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

/**
 * MetaService manages page-level metadata for SEO and social sharing
 * 
 * Handles dynamic title and description management across the application.
 * Integrates with Angular's Title and Meta services for proper DOM manipulation.
 * 
 * Usage:
 * ```typescript
 * export default class HomePage {
 *   private readonly meta = inject(MetaService);
 * 
 *   ngOnInit() {
 *     this.meta.setTitle('Home | Newportmaeve Archives');
 *     this.meta.setDescription('Explore the chronicles of Newport Maeve...');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private defaultTitle = 'Newportmaeve Archives';
  private defaultDescription =
    'Explore the rich chronicles and archives of Newport Maeve - stories, characters, and districts preserved for history.';

  /**
   * Set the page title
   * @param title - The page title to display in the browser tab
   */
  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Set the page meta description
   * @param description - The meta description for search engines and social sharing
   */
  setDescription(description: string): void {
    this.updateMetaTag('name', 'description', description);
  }

  /**
   * Set Open Graph title (for social media sharing)
   * @param title - The Open Graph title
   */
  setOgTitle(title: string): void {
    this.updateMetaTag('property', 'og:title', title);
  }

  /**
   * Set Open Graph description (for social media sharing)
   * @param description - The Open Graph description
   */
  setOgDescription(description: string): void {
    this.updateMetaTag('property', 'og:description', description);
  }

  /**
   * Set Open Graph image (for social media sharing)
   * @param imageUrl - The image URL to display when shared
   */
  setOgImage(imageUrl: string): void {
    this.updateMetaTag('property', 'og:image', imageUrl);
  }

  /**
   * Set Open Graph URL (for social media sharing)
   * @param url - The canonical URL of the page
   */
  setOgUrl(url: string): void {
    this.updateMetaTag('property', 'og:url', url);
  }

  /**
   * Set Open Graph type (e.g., 'website', 'article')
   * @param type - The Open Graph type
   */
  setOgType(type: string): void {
    this.updateMetaTag('property', 'og:type', type);
  }

  /**
   * Set Twitter Card meta tags
   * @param cardType - Card type: 'summary', 'summary_large_image', 'app', 'player'
   */
  setTwitterCard(cardType: string): void {
    this.updateMetaTag('name', 'twitter:card', cardType);
  }

  /**
   * Set Twitter Creator handle
   * @param handle - Twitter handle without @ symbol (e.g., 'newportmaeve')
   */
  setTwitterCreator(handle: string): void {
    this.updateMetaTag('name', 'twitter:creator', `@${handle}`);
  }

  /**
   * Set canonical URL for the page
   * @param url - The canonical URL
   */
  setCanonicalUrl(url: string): void {
    let canonicalTag = this.metaService.getTag('rel="canonical"');

    if (!canonicalTag) {
      this.metaService.addTag({ rel: 'canonical', href: url });
    } else {
      this.metaService.updateTag({ rel: 'canonical', href: url });
    }
  }

  /**
   * Reset metadata to default values
   */
  resetToDefaults(): void {
    this.setTitle(this.defaultTitle);
    this.setDescription(this.defaultDescription);
  }

  /**
   * Batch update multiple meta tags at once
   * Useful for setting multiple tags in a single operation
   */
  updateMultipleTags(
    tags: Array<{ attribute: 'name' | 'property'; content: string; value: string }>
  ): void {
    tags.forEach((tag) => {
      this.updateMetaTag(tag.attribute, tag.content, tag.value);
    });
  }

  /**
   * Internal helper to update or add a meta tag
   */
  private updateMetaTag(
    attribute: 'name' | 'property',
    contentAttr: string,
    value: string
  ): void {
    const selector = `${attribute}="${contentAttr}"`;
    let tag = this.metaService.getTag(selector);

    if (tag) {
      this.metaService.updateTag({ [attribute]: contentAttr, content: value });
    } else {
      this.metaService.addTag({ [attribute]: contentAttr, content: value });
    }
  }
}
