/**
 * SitemapService generates XML sitemaps for search engine crawling
 * 
 * This service creates sitemaps for the Newportmaeve Archives including:
 * - Main sitemap with static pages
 * - Character sitemap with character detail pages
 * - District sitemap with district detail pages
 * 
 * In production, these would be exposed via HTTP endpoints or pre-generated
 * during the build process and served as static files.
 * 
 * Usage:
 * ```typescript
 * export class SitemapService {
 *   generateMainSitemap(): string { ... }
 *   generateCharacterSitemap(characters: string[]): string { ... }
 *   generateDistrictSitemap(districts: string[]): string { ... }
 * }
 * ```
 */

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapService {
  private readonly baseUrl = 'https://newportmaeve.com';

  /**
   * Generate main sitemap with static pages
   */
  generateMainSitemap(): string {
    const entries: SitemapEntry[] = [
      {
        loc: `${this.baseUrl}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 1.0
      },
      {
        loc: `${this.baseUrl}/listen`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/characters`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/city`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/author`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/connect`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7
      }
    ];

    return this.generateXmlSitemap(entries);
  }

  /**
   * Generate sitemap for character detail pages
   * @param characters - Array of character slugs
   */
  generateCharacterSitemap(characters: string[]): string {
    const entries: SitemapEntry[] = characters.map((slug) => ({
      loc: `${this.baseUrl}/characters/${slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    }));

    return this.generateXmlSitemap(entries);
  }

  /**
   * Generate sitemap for district detail pages
   * @param districts - Array of district slugs
   */
  generateDistrictSitemap(districts: string[]): string {
    const entries: SitemapEntry[] = districts.map((slug) => ({
      loc: `${this.baseUrl}/city/${slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    }));

    return this.generateXmlSitemap(entries);
  }

  /**
   * Generate sitemap index for referencing multiple sitemaps
   */
  generateSitemapIndex(): string {
    const sitemaps = [
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/sitemap-characters.xml`,
      `${this.baseUrl}/sitemap-districts.xml`
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    sitemaps.forEach((sitemap) => {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.escapeXml(sitemap)}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '  </sitemap>\n';
    });

    xml += '</sitemapindex>';

    return xml;
  }

  /**
   * Internal helper to generate XML sitemap from entries
   */
  private generateXmlSitemap(entries: SitemapEntry[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    entries.forEach((entry) => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(entry.loc)}</loc>\n`;

      if (entry.lastmod) {
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      }

      if (entry.changefreq) {
        xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      }

      if (entry.priority !== undefined) {
        xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      }

      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  }

  /**
   * Escape special XML characters
   */
  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
