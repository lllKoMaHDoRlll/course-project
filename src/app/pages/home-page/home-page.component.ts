import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { TelegramService } from '../../telegram.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  router = new Router();
  telegram = inject(TelegramService);

  constructor() {
    this.telegram.hideBackButton();
  }

  goTo = (path: string) => {
    this.router.navigate([path]);
  }
}
