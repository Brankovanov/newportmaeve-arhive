import { Component, OnInit, inject } from '@angular/core';
import { MetaService } from '../../core/services/meta.service';

interface ExternalLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-connect-page',
  templateUrl: './connect.page.html',
  styleUrl: './connect.page.scss'
})
export class ConnectPage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('Connect | Newportmaeve Archives');
    this.meta.setDescription('Connect with the Newportmaeve Archives community - find us on YouTube, Wiki, DeviantArt, and Facebook.');
    this.meta.setOgTitle('Connect with Newportmaeve');
    this.meta.setOgDescription('Join the Newportmaeve Archives community across social media.');
    this.meta.setOgType('website');
  }
  protected readonly links: ExternalLink[] = [
    { label: 'YouTube', href: 'https://www.youtube.com/' },
    { label: 'Wiki', href: 'https://www.wikipedia.org/' },
    { label: 'DeviantArt', href: 'https://www.deviantart.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' }
  ];
}
