import { Injectable } from '@angular/core';
import { TonConnect, TonConnectUI, Wallet } from '@tonconnect/ui';
import { DatabaseService } from './database/database.service';
import { TelegramService } from './telegram.service';
import { TonApiClient } from "@ton-api/client";

@Injectable({
  providedIn: 'root'
})
export default class TonConnectService {
  connector;
  tonConnectUI;
  wallet: string | undefined;
  tonApiClient: TonApiClient;
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

    this.tonApiClient = new TonApiClient({
      baseUrl: "https://testnet.tonapi.io"
    });
  }

  getWallet(): string | undefined {
    return this.wallet;
  }

  async setWallet(wallet: string | undefined) {
    if (!wallet || this.wallet == wallet) return;
    this.wallet = wallet;
    await this.database.createOrUpdateUser(this.telegram.getUserTGId()!, this.wallet);
  }

  async getTxStatus(tx_hash: string): Promise<boolean> {
    console.log(1);
    const response = await this.tonApiClient.traces.getTrace(tx_hash);
    console.log(response);
    if (!response) return false;
    let status = response.transaction.success;
    let tx = response;
    while (status && tx.children && tx.children.length > 0) {
      tx = tx.children[0];
      status = tx.transaction.success;
    }
    return status;
  }

}
