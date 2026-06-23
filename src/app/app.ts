import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderNavigationComponent } from './shared/components/header-navigation/header-navigation.component';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';
import { CanonicalUrlService } from './core/services/canonical-url.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BreadcrumbsComponent,
    HeaderNavigationComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly canonicalUrl = inject(CanonicalUrlService);

  ngOnInit(): void {
    this.canonicalUrl.initialize();
  }
}
