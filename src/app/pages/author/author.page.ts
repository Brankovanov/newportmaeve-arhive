import { Component, OnInit, inject } from '@angular/core';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-author-page',
  templateUrl: './author.page.html',
  styleUrl: './author.page.scss'
})
export class AuthorPage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('Author | Newportmaeve Archives');
    this.meta.setDescription('Learn about the creator behind the Newportmaeve Archives - Dean Jordanov and the vision behind these chronicles.');
    this.meta.setOgTitle('About the Author - Newportmaeve Archives');
    this.meta.setOgDescription('Discover the story and vision of Dean Jordanov.');
    this.meta.setOgType('website');
  }
}
