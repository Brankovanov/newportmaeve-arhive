import { Component } from '@angular/core';

interface ExternalLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-connect-page',
  templateUrl: './connect.page.html',
  styleUrl: './connect.page.scss'
})
export class ConnectPage {
  protected readonly links: ExternalLink[] = [
    { label: 'YouTube', href: 'https://www.youtube.com/' },
    { label: 'Wiki', href: 'https://www.wikipedia.org/' },
    { label: 'DeviantArt', href: 'https://www.deviantart.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' }
  ];
}
