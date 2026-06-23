import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly exact?: boolean;
}

@Component({
  selector: 'app-header-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-navigation.component.html',
  styleUrl: './header-navigation.component.scss'
})
export class HeaderNavigationComponent {
  protected readonly navigationItems: readonly NavigationItem[] = [
    { href: '/', label: 'Home', exact: true },
    { href: '/listen', label: 'Listen' },
    { href: '/characters', label: 'Characters' },
    { href: '/city', label: 'City' },
    { href: '/author', label: 'Author' },
    { href: '/connect', label: 'Connect' }
  ];
}