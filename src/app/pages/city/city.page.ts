import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
export class CityPage {
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
