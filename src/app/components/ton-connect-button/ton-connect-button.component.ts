import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { TelegramService } from '../../services/telegram.service';
import TonConnectService from '../../services/ton-connect.service';


@Component({
  selector: 'app-ton-connect-button',
  standalone: true,
  imports: [],
  templateUrl: './ton-connect-button.component.html',
  styleUrl: './ton-connect-button.component.scss'
})
export class TonConnectButtonComponent implements AfterViewInit, OnDestroy{
  constructor(private database: DatabaseService, private telegram: TelegramService, private tonconnect: TonConnectService) { }

  ngAfterViewInit(): void {
    this.tonconnect.tonConnectUI.uiOptions = {buttonRootId: "ton-connect"};
  }

  ngOnDestroy(): void {
    this.tonconnect.tonConnectUI.uiOptions = {buttonRootId: null};
  }
}
