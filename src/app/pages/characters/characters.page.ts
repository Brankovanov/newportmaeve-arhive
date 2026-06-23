import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

interface CharacterCard {
  name: string;
  slug: string;
  role: string;
  reveal: string;
}

@Component({
  selector: 'app-characters-page',
  imports: [RouterLink],
  templateUrl: './characters.page.html',
  styleUrl: './characters.page.scss'
})
export class CharactersPage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('Characters | Newportmaeve Archives');
    this.meta.setDescription('Meet the enigmatic characters of Newport Maeve - archivists, cartographers, and keepers of forgotten tales.');
    this.meta.setOgTitle('Newportmaeve Characters');
    this.meta.setOgDescription('Discover the characters shaping the chronicles of Newport Maeve.');
    this.meta.setOgType('website');
  }
  protected readonly activeReveal = signal<string | null>(null);

  protected readonly characters: CharacterCard[] = [
    {
      name: 'Maeve Thorn',
      slug: 'maeve-thorn',
      role: 'Night Archivist',
      reveal: 'Keeps journals that rewrite themselves when the tide rises.'
    },
    {
      name: 'Corin Vale',
      slug: 'corin-vale',
      role: 'District Cartographer',
      reveal: 'Can map streets that no longer exist.'
    },
    {
      name: 'Edda Wren',
      slug: 'edda-wren',
      role: 'Voice Engineer',
      reveal: 'Tunes old radios to echoes of unfinished conversations.'
    }
  ];

  protected toggleReveal(slug: string): void {
    this.activeReveal.update((current) => (current === slug ? null : slug));
  }
}
