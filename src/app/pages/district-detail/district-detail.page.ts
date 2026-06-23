import { Component, OnInit, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { DistrictIndexService } from '../../core/content/loaders/district-index.service';
import { ImageService } from '../../core/services/image.service';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { District } from '../../core/content/models';

@Component({
  selector: 'app-district-detail-page',
  imports: [RouterLink, NgOptimizedImage, SocialShareComponent],
  templateUrl: './district-detail.page.html',
  styleUrl: './district-detail.page.scss'
})
export class DistrictDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(MetaService);
  private readonly districtIndex = inject(DistrictIndexService);
  private readonly imageService = inject(ImageService);

  protected readonly district = signal<District | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadDistrict();
  }

  private async loadDistrict(): Promise<void> {
    try {
      this.loading.set(true);
      const slug = this.route.snapshot.paramMap.get('district');

      if (!slug) {
        this.error.set('No district selected');
        return;
      }

      await this.districtIndex.ensureIndex();
      const dist = this.districtIndex.getBySlug(slug);

      if (!dist) {
        this.error.set(`District "${slug}" not found`);
        this.meta.setTitle('District Not Found | Newportmaeve Archives');
        return;
      }

      this.district.set(dist);
      this.meta.setTitle(`${dist.name} | Newportmaeve Archives`);
      this.meta.setDescription(`Explore ${dist.name} - ${dist.summary}`);
      this.meta.setOgTitle(`${dist.name} - Newportmaeve Archives`);
      this.meta.setOgDescription(`Discover the mysteries of ${dist.name}.`);
      this.meta.setOgType('article');
    } catch (err) {
      console.error('Error loading district:', err);
      this.error.set('Failed to load district data');
    } finally {
      this.loading.set(false);
    }
  }

  protected getImageUrl(filename: string | undefined): string {
    return filename ? this.imageService.resolveImageUrl('districts', filename) : this.imageService.getPlaceholderImage();
  }
}

