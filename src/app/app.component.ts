import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Location } from '@angular/common';
import { TelegramService } from './telegram.service';
import { DatabaseService } from './services/database/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  telegram = inject(TelegramService);
  database = inject(DatabaseService);

  index: number = 0;
  constructor(private _location: Location) { }

  async ngOnInit() {
    await this.telegram.init();
    this.telegram.setHeaderColor("#089beb");
    this.telegram.expand();
    this.telegram.hideBackButton();

    this.telegram.onBackButtonClick(() => {
      this._location.back();
    });
    await this.database.createOrUpdateUser(this.telegram.getUserTGId()!)
    this.database.updateVisitStatus(this.telegram.getUserTGId()!)
  }
}
