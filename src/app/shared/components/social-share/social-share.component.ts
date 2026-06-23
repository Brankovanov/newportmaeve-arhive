import { Component, computed, inject, input, signal } from '@angular/core';
import { SocialShareService } from '../../../core/services/social-share.service';
import { AnalyticsService } from '../../../core/services/analytics.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.scss',
})
export class SocialShareComponent {
  private readonly shareService = inject(SocialShareService);
  private readonly analytics = inject(AnalyticsService);

  readonly title = input('Share this page');
  readonly text = input('Read this chapter from Newportmaeve Archives.');
  readonly sharePath = input<string | undefined>(undefined);

  protected readonly canUseNativeShare = this.shareService.canUseNativeShare;
  protected readonly copyStatus = signal<'idle' | 'done' | 'error'>('idle');

  protected readonly currentUrl = computed(() =>
    this.shareService.getCurrentUrl(this.sharePath())
  );

  protected readonly links = computed(() =>
    this.shareService.buildShareLinks(this.currentUrl(), this.title())
  );

  protected async shareNatively(): Promise<void> {
    const didShare = await this.shareService.nativeShare({
      title: this.title(),
      text: this.text(),
      url: this.currentUrl(),
    });

    if (didShare) {
      this.analytics.trackEvent('share', {
        method: 'native',
        content_type: 'page',
      });
    }
  }

  protected async copyLink(): Promise<void> {
    try {
      const didCopy = await this.shareService.copyUrl(this.currentUrl());
      this.copyStatus.set(didCopy ? 'done' : 'error');

      if (didCopy) {
        this.analytics.trackEvent('share', {
          method: 'copy_link',
          content_type: 'page',
        });
      }
    } catch {
      this.copyStatus.set('error');
    }
  }

  protected trackShare(method: string): void {
    this.analytics.trackEvent('share', {
      method,
      content_type: 'page',
    });
  }
}
