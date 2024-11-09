import { Injectable } from '@angular/core';
import { TonConnect, TonConnectUI, Wallet } from '@tonconnect/ui';
import { DatabaseService } from './database/database.service';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root'
})
export default class TonConnectService {
  connector;
  tonConnectUI;
  wallet: string | undefined;
  constructor (private database: DatabaseService, private telegram: TelegramService) {
    this.connector = new TonConnect({manifestUrl: "https://tonolingo.ru/tonconnect-manifest.json"});
    this.connector.restoreConnection();
    this.tonConnectUI = new TonConnectUI({connector: this.connector});
    this.connector.onStatusChange(async (wallet) => {
      if (wallet) {
        console.log(wallet.account.address);
        this.setWallet(wallet.account.address);
      }
    });

  }

  getWallet(): string | undefined {
    return this.wallet;
  }

  async setWallet(wallet: string | undefined) {
    if (!wallet || this.wallet == wallet) return;
    this.wallet = wallet;
  }

}
