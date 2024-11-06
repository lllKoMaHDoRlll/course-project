import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import tonConnectService from '../../services/ton-connect.service';
import { DatabaseService } from '../../services/database/database.service';
import { TelegramService } from '../../services/telegram.service';


@Component({
  selector: 'app-ton-connect-button',
  standalone: true,
  imports: [],
  templateUrl: './ton-connect-button.component.html',
  styleUrl: './ton-connect-button.component.scss'
})
export class TonConnectButtonComponent implements AfterViewInit, OnDestroy{
  constructor(private database: DatabaseService, private telegram: TelegramService) { }

  ngAfterViewInit(): void {
    tonConnectService.tonConnectUI.uiOptions = {buttonRootId: "ton-connect"};
    tonConnectService.connector.onStatusChange(async (wallet) => {
      if (wallet) {
        console.log(wallet.account.address);
        await this.database.createOrUpdateUser(this.telegram.getUserTGId()!, wallet.account.address);
      }
    })
  }

  ngOnDestroy(): void {
    tonConnectService.tonConnectUI.uiOptions = {buttonRootId: null};
  }
}
