import { Component } from '@angular/core';
import { ButtonComponent, ColorThemes } from '../../components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  router = new Router();

  goTo = (path: string) => {
    this.router.navigate([path]);
  }
}
