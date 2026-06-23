import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { DistrictIndexService } from '../../core/content/loaders/district-index.service';
import { District } from '../../core/content/models';

@Component({
  selector: 'app-city-page',
  imports: [RouterLink],
  templateUrl: './city.page.html',
  styleUrl: './city.page.scss'
})
export class CityPage implements OnInit {
  private readonly meta = inject(MetaService);
  private readonly districtIndex = inject(DistrictIndexService);

  ngOnInit(): void {
    this.meta.setTitle('City Districts | Newportmaeve Archives');
    this.meta.setDescription('Explore the districts and wards of Newport Maeve - from Saltmarket Harbor to the Glass Meridian skyline.');
    this.meta.setOgTitle('Newport Maeve Districts');
    this.meta.setOgDescription('Discover the unique districts that make up the city of Newport Maeve.');
    this.meta.setOgType('website');

    this.loadDistricts();
  }

  protected readonly districts = signal<District[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  private async loadDistricts(): Promise<void> {
    try {
      this.loading.set(true);
      await this.districtIndex.ensureIndex();
      const allDistricts = await this.districtIndex.findAll();
      this.districts.set(allDistricts);
    } catch (err) {
      console.error('Error loading districts:', err);
      this.error.set('Failed to load districts');
    } finally {
      this.loading.set(false);
    }
  }
}
