import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

interface District {
  name: string;
  slug: string;
  summary: string;
}

@Component({
  selector: 'app-city-page',
  imports: [RouterLink],
  templateUrl: './city.page.html',
  styleUrl: './city.page.scss'
})
export class CityPage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('City Districts | Newportmaeve Archives');
    this.meta.setDescription('Explore the districts and wards of Newport Maeve - from Saltmarket Harbor to the Glass Meridian skyline.');
    this.meta.setOgTitle('Newport Maeve Districts');
    this.meta.setOgDescription('Discover the unique districts that make up the city of Newport Maeve.');
    this.meta.setOgType('website');
  }
  protected readonly districts: District[] = [
    {
      name: 'Saltmarket Ward',
      slug: 'saltmarket-ward',
      summary: 'A harbor district where contracts are whispered, not signed.'
    },
    {
      name: 'Glass Meridian',
      slug: 'glass-meridian',
      summary: 'Skyline observatories and mirrored courtyards hide old secrets.'
    },
    {
      name: 'Cathedral Underground',
      slug: 'cathedral-underground',
      summary: 'Subterranean archives beneath a flooded basilica.'
    }
  ];
}
