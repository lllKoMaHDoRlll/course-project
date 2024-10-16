import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { expandViewport, disableVerticalSwipes } from "@telegram-apps/sdk";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    expandViewport();
    disableVerticalSwipes();
  }

  preventMovement(ev: TouchEvent) {
    ev.preventDefault();
  }
}
