import { Component, OnInit, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-district-detail-page',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './district-detail.page.html',
  styleUrl: './district-detail.page.scss'
})
export class DistrictDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    const displayName = this.displayName();
    this.meta.setTitle(`${displayName} | Newportmaeve Archives`);
    this.meta.setDescription(`Explore ${displayName} - a unique ward of Newport Maeve with its own secrets and stories.`);
    this.meta.setOgTitle(`${displayName} - Newportmaeve Archives`);
    this.meta.setOgDescription(`Discover the mysteries of ${displayName}.`);
    this.meta.setOgType('article');
  }

  protected readonly district = computed(() => this.route.snapshot.paramMap.get('district') ?? 'unknown-district');
  protected readonly displayName = computed(() => this.district().replace(/-/g, ' '));
}
