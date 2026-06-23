import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('Home | Newportmaeve Archives');
    this.meta.setDescription(
      'Welcome to the Newportmaeve Archives. Explore the chronicles of Newport Maeve - stories, characters, and districts preserved for history.'
    );
  }
}
