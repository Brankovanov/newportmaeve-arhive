import { Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error.page.html',
  styleUrl: './error.page.scss'
})
export class ErrorPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly returnUrl = computed(() => this.route.snapshot.queryParamMap.get('returnUrl') ?? '/');
}
