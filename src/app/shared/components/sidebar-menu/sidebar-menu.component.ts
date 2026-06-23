import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarMenuItem {
  readonly href: string;
  readonly label: string;
  readonly description?: string;
}

export interface SidebarMenuSection {
  readonly id: string;
  readonly title: string;
  readonly items: readonly SidebarMenuItem[];
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent {
  readonly ariaLabel = input('Section navigation');
  readonly sections = input<readonly SidebarMenuSection[]>([]);
}