import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from './meta.service';

/**
 * CanonicalUrlService manages canonical URL tags for SEO
 * 
 * Automatically sets canonical URLs for pages to prevent duplicate content issues.
 * Should be initialized in the root component's ngOnInit to listen for route changes.
 * 
 * Usage:
 * ```typescript
 * export default class AppComponent implements OnInit {
 *   private readonly canonicalUrl = inject(CanonicalUrlService);
 * 
 *   ngOnInit() {
 *     this.canonicalUrl.initialize();
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CanonicalUrlService {
  private readonly router = inject(Router);
  private readonly meta = inject(MetaService);
  private readonly baseUrl = 'https://newportmaeve.com';
  private initialized = false;

  /**
   * Initialize canonical URL tracking on route changes
   * Call this once in the root component's ngOnInit
   */
  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    // Set canonical URL on navigation end
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setCanonicalUrlFromRoute(event.urlAfterRedirects);
        }
      });

    // Set initial canonical URL
    this.setCanonicalUrlFromRoute(this.router.url);
  }

  /**
   * Manually set canonical URL
   * @param relativePath - The path relative to the base URL (e.g., '/characters/maeve')
   */
  setCanonicalUrl(relativePath: string): void {
    const url = this.buildFullUrl(relativePath);
    this.meta.setCanonicalUrl(url);
  }

  /**
   * Internal helper to set canonical URL from current route
   */
  private setCanonicalUrlFromRoute(url: string): void {
    // Normalize the URL (remove trailing slashes except for root)
    const normalizedUrl = url === '/' ? '/' : url.replace(/\/$/, '');
    this.setCanonicalUrl(normalizedUrl);
  }

  /**
   * Internal helper to build full URL
   */
  private buildFullUrl(relativePath: string): string {
    return `${this.baseUrl}${relativePath}`;
  }
}
