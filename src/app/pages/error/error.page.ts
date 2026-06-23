import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error.page.html',
  styleUrl: './error.page.scss'
})
export class ErrorPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('Error | Newportmaeve Archives');
    this.meta.setDescription('An unexpected error occurred while accessing the Newportmaeve Archives.');
  }

  protected readonly returnUrl = computed(() => this.route.snapshot.queryParamMap.get('returnUrl') ?? '/');
}
