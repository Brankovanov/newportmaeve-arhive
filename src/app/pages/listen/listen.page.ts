import { Component, OnInit, inject } from '@angular/core';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-listen-page',
  templateUrl: './listen.page.html',
  styleUrl: './listen.page.scss'
})
export class ListenPage implements OnInit {
  private readonly meta = inject(MetaService);

  ngOnInit(): void {
    this.meta.setTitle('Listen | Newportmaeve Archives');
    this.meta.setDescription('Listen to the audiobook narration of the Newportmaeve Chronicles - an immersive journey through the stories of Newport Maeve.');
    this.meta.setOgTitle('Listen to Newportmaeve Chronicles');
    this.meta.setOgDescription('Experience the audiobook of Newportmaeve Archives.');
    this.meta.setOgType('website');
  }
}
