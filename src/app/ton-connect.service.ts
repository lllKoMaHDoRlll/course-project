import { Injectable } from '@angular/core';
import { ConnectedWallet, TonConnect, TonConnectUI, Wallet } from '@tonconnect/ui';

@Injectable({
  providedIn: 'root'
})
class TonConnectService {
  connector;
  tonConnectUI;
  constructor () {
    this.connector = new TonConnect({manifestUrl: "https://tonolingo.ru/tonconnect-manifest.json"});
    this.connector.restoreConnection();
    this.tonConnectUI = new TonConnectUI({connector: this.connector});
  }
}

export default new TonConnectService();
