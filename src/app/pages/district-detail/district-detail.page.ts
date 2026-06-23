import { Component, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-district-detail-page',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './district-detail.page.html',
  styleUrl: './district-detail.page.scss'
})
export class DistrictDetailPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly district = computed(() => this.route.snapshot.paramMap.get('district') ?? 'unknown-district');
  protected readonly displayName = computed(() => this.district().replace(/-/g, ' '));
}
