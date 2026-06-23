import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly panelId?: string;
  readonly href?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  readonly ariaLabel = input('Content sections');
  readonly items = input<readonly TabItem[]>([]);
  readonly activeId = input<string | null>(null);

  readonly activeTabChange = output<string>();

  protected readonly resolvedActiveId = computed(() => {
    const activeId = this.activeId();
    if (activeId) {
      return activeId;
    }

    const firstEnabled = this.items().find((item) => !item.disabled);
    return firstEnabled?.id ?? null;
  });

  protected selectTab(item: TabItem): void {
    if (item.disabled || item.href) {
      return;
    }

    this.activeTabChange.emit(item.id);
  }
}