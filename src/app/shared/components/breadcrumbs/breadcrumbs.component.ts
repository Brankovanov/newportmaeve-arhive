import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly items = signal<BreadcrumbItem[]>([]);
  protected readonly breadcrumbs = computed(() => this.items());
  protected readonly hasTrail = computed(() => this.items().length > 1);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.items.set(this.buildBreadcrumbs());
      });

    this.items.set(this.buildBreadcrumbs());
  }

  private buildBreadcrumbs(): BreadcrumbItem[] {
    const trail: BreadcrumbItem[] = [{ label: 'Home', url: '/' }];

    let url = '';
    let route: ActivatedRoute | null = this.activatedRoute.firstChild;

    while (route) {
      if (route.outlet !== PRIMARY_OUTLET) {
        route = route.firstChild;
        continue;
      }

      const segment = route.snapshot.url.map((s) => s.path).join('/');
      if (segment) {
        url += `/${segment}`;
      }

      const breadcrumbData = route.snapshot.data['breadcrumb'] as string | undefined;
      if (breadcrumbData) {
        const label = this.resolveLabel(breadcrumbData, route);
        if (trail[trail.length - 1]?.label !== label) {
          trail.push({ label, url: url || '/' });
        }
      }

      route = route.firstChild;
    }

    return trail;
  }

  private resolveLabel(value: string, route: ActivatedRoute): string {
    if (value.startsWith(':')) {
      const paramName = value.slice(1);
      const paramValue = route.snapshot.paramMap.get(paramName) ?? paramName;
      return this.humanize(paramValue);
    }

    return this.humanize(value);
  }

  private humanize(value: string): string {
    return value
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }
}
