import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss'
})
export class NotFoundPage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('404 - Page Not Found | Newportmaeve Archives');
    this.meta.setDescription('The page you are looking for in the Newportmaeve Archives could not be found.');
  }
}
