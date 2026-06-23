import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  readonly href: string;
  readonly label: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly footerLinks: readonly FooterLink[] = [
    { href: '/characters', label: 'Characters' },
    { href: '/city', label: 'City Districts' },
    { href: '/listen', label: 'Listen' },
    { href: '/connect', label: 'Connect' }
  ];
}