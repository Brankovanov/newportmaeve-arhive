import { Component, ElementRef, QueryList, ViewChildren, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

let tabsInstanceId = 0;

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
  @ViewChildren('tabControl') private tabControls?: QueryList<ElementRef<HTMLElement>>;

  readonly ariaLabel = input('Content sections');
  readonly items = input<readonly TabItem[]>([]);
  readonly activeId = input<string | null>(null);

  readonly activeTabChange = output<string>();

  private readonly tabsIdPrefix = `tabs-${tabsInstanceId++}`;

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

  protected isSelected(item: TabItem): boolean {
    return this.resolvedActiveId() === item.id;
  }

  protected getTabId(item: TabItem): string {
    return `${this.tabsIdPrefix}-${item.id}`;
  }

  protected getTabIndex(item: TabItem): number {
    if (item.disabled) {
      return -1;
    }

    return this.isSelected(item) ? 0 : -1;
  }

  protected onTabKeydown(event: KeyboardEvent, item: TabItem): void {
    const enabledItems = this.items().filter((tab) => !tab.disabled);

    if (enabledItems.length < 2) {
      return;
    }

    const currentIndex = enabledItems.findIndex((tab) => tab.id === item.id);
    if (currentIndex === -1) {
      return;
    }

    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetIndex = (currentIndex + 1) % enabledItems.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = enabledItems.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    const targetItem = enabledItems[targetIndex];
    if (!targetItem.href) {
      this.activeTabChange.emit(targetItem.id);
    }

    this.focusTab(targetItem.id);
  }

  private focusTab(tabId: string): void {
    const tabControl = this.tabControls?.find(
      (control) => control.nativeElement.dataset['tabId'] === tabId
    );

    tabControl?.nativeElement.focus();
  }
}