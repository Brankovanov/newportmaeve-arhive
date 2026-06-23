import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface AnalyticsEventParams {
  [key: string]: string | number | boolean;
}

interface WindowWithAnalytics extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private initialized = false;
  private readonly measurementId = this.getMeasurementId();

  initialize(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId) || !this.measurementId) {
      return;
    }

    this.initialized = true;
    this.loadAnalyticsScript(this.measurementId);
    this.configureAnalytics(this.measurementId);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.trackPageView(event.urlAfterRedirects);
        }
      });

    this.trackPageView(this.router.url);
  }

  trackEvent(eventName: string, params: AnalyticsEventParams = {}): void {
    if (!isPlatformBrowser(this.platformId) || !this.measurementId || !this.windowRef.gtag) {
      return;
    }

    this.windowRef.gtag('event', eventName, params);
  }

  private trackPageView(path: string): void {
    if (!this.windowRef.gtag || !this.measurementId) {
      return;
    }

    this.windowRef.gtag('event', 'page_view', {
      page_path: path,
      page_title: this.document.title,
      page_location: this.absoluteUrl(path),
    });
  }

  private loadAnalyticsScript(measurementId: string): void {
    const existingScript = this.document.querySelector<HTMLScriptElement>(
      `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
    );

    if (existingScript) {
      return;
    }

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    this.document.head.appendChild(script);
  }

  private configureAnalytics(measurementId: string): void {
    const dataLayer = this.windowRef.dataLayer ?? [];
    this.windowRef.dataLayer = dataLayer;

    this.windowRef.gtag = (...args: unknown[]) => {
      dataLayer.push(args);
    };

    this.windowRef.gtag('js', new Date());
    this.windowRef.gtag('config', measurementId, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }

  private getMeasurementId(): string {
    const measurementMeta = this.document.querySelector<HTMLMetaElement>(
      'meta[name="ga-measurement-id"]'
    );

    return measurementMeta?.content?.trim() ?? '';
  }

  private absoluteUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const origin = this.document.location?.origin ?? 'https://newportmaeve.com';
    return `${origin}${normalizedPath}`;
  }

  private get windowRef(): WindowWithAnalytics {
    return window as WindowWithAnalytics;
  }
}
