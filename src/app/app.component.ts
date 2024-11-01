import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Location } from '@angular/common';
import { TelegramService } from './services/telegram.service';
import { DatabaseService } from './services/database/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  index: number = 0;
  constructor(private _location: Location, private telegram: TelegramService, private database: DatabaseService) { }

  async ngOnInit() {
    await this.telegram.init();
    console.log("telegram inited");

    this.telegram.setHeaderColor("#089beb");
    this.telegram.expand();
    this.telegram.hideBackButton();

    this.telegram.onBackButtonClick(() => {
      this._location.back();
    });

    await this.database.init();
    console.log("database inited");

    // await this.database.createOrUpdateUser(this.telegram.getUserTGId()!)
    // this.database.updateVisitStatus(this.telegram.getUserTGId()!)
  }
}
