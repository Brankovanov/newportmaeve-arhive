import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

/**
 * StructuredDataService manages JSON-LD structured data for SEO
 * 
 * Generates and injects schema.org JSON-LD markup for rich snippets in search results.
 * Supports Organization, WebPage, Article, Person, and Place schemas.
 * 
 * Usage:
 * ```typescript
 * export class HomePage {
 *   private readonly structuredData = inject(StructuredDataService);
 * 
 *   ngOnInit() {
 *     this.structuredData.setWebPageSchema({
 *       name: 'Home | Newportmaeve Archives',
 *       description: 'Welcome to the Newportmaeve Archives...'
 *     });
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  private readonly metaService = inject(Meta);
  private readonly baseUrl = 'https://newportmaeve.com';

  /**
   * Set organization schema (global site information)
   */
  setOrganizationSchema(data: {
    name: string;
    description: string;
    logo?: string;
    sameAs?: string[];
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      description: data.description,
      url: this.baseUrl,
      ...(data.logo && { logo: data.logo }),
      ...(data.sameAs && { sameAs: data.sameAs }),
    };

    this.injectJsonLd(schema);
  }

  /**
   * Set WebPage schema for general pages
   */
  setWebPageSchema(data: {
    name: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.name,
      description: data.description,
      url: this.baseUrl,
      ...(data.image && { image: data.image }),
      ...(data.datePublished && { datePublished: data.datePublished }),
      ...(data.dateModified && { dateModified: data.dateModified }),
    };

    this.injectJsonLd(schema);
  }

  /**
   * Set Article schema for character/district/story pages
   */
  setArticleSchema(data: {
    headline: string;
    description: string;
    image?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    url?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      ...(data.image && { image: data.image }),
      author: {
        '@type': 'Person',
        name: data.author || 'Dean Jordanov',
      },
      ...(data.datePublished && { datePublished: data.datePublished }),
      ...(data.dateModified && { dateModified: data.dateModified }),
      url: data.url || this.baseUrl,
    };

    this.injectJsonLd(schema);
  }

  /**
   * Set Person schema for character pages
   */
  setPersonSchema(data: {
    name: string;
    description?: string;
    role?: string;
    image?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.name,
      ...(data.description && { description: data.description }),
      ...(data.role && { jobTitle: data.role }),
      ...(data.image && { image: data.image }),
    };

    this.injectJsonLd(schema);
  }

  /**
   * Set Place schema for district/location pages
   */
  setPlaceSchema(data: {
    name: string;
    description?: string;
    image?: string;
    address?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: data.name,
      ...(data.description && { description: data.description }),
      ...(data.image && { image: data.image }),
      ...(data.address && { address: data.address }),
      url: this.baseUrl,
    };

    this.injectJsonLd(schema);
  }

  /**
   * Set FAQPage schema for FAQ-style content
   */
  setFAQSchema(
    faqs: Array<{
      question: string;
      answer: string;
    }>
  ): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    this.injectJsonLd(schema);
  }

  /**
   * Remove all JSON-LD scripts (useful for cleanup)
   */
  clearStructuredData(): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach((script) => script.remove());
  }

  /**
   * Internal helper to inject JSON-LD script tag
   */
  private injectJsonLd(schema: Record<string, unknown>): void {
    // Remove existing JSON-LD if present (replace rather than append)
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
