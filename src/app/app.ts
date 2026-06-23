import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BreadcrumbsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
