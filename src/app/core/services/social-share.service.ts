import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface ShareLinks {
  x: string;
  facebook: string;
  linkedin: string;
  reddit: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocialShareService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  readonly canUseNativeShare =
    isPlatformBrowser(this.platformId) && typeof navigator !== 'undefined' && 'share' in navigator;

  getCurrentUrl(sharePath?: string): string {
    if (isPlatformBrowser(this.platformId) && this.document.location) {
      if (sharePath) {
        return new URL(sharePath, this.document.location.origin).toString();
      }

      return this.document.location.href;
    }

    const fallbackOrigin = 'https://newportmaeve.com';
    const routePath = sharePath ?? this.router.url;
    const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
    return `${fallbackOrigin}${normalizedPath}`;
  }

  buildShareLinks(url: string, title: string): ShareLinks {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return {
      x: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`,
    };
  }

  async nativeShare(data: { title: string; text: string; url: string }): Promise<boolean> {
    if (!this.canUseNativeShare) {
      return false;
    }

    await navigator.share(data);
    return true;
  }

  async copyUrl(url: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId) || !navigator.clipboard) {
      return false;
    }

    await navigator.clipboard.writeText(url);
    return true;
  }
}
