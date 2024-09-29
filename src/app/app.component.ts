import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TonConnectUI } from '@tonconnect/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor() {

  }

  ngOnInit(): void {
    console.log(document);
    console.log(123);
    const tonConnectUI = new TonConnectUI({
      manifestUrl: 'https://tonolingo.ru/tonconnect-manifest.json',
      buttonRootId: 'ton-connect'
    });
  }




}
