import { Component, inject, Input } from '@angular/core';
import { Achievement } from '../../interfaces/achievements';
import { ButtonComponent } from "../button/button.component";
import { TelegramService } from '../../services/telegram.service';
import { DatabaseService } from '../../services/database/database.service';
import TonConnectService from '../../services/ton-connect.service';
import { ModalComponent } from '../modal/modal.component';
import { LoadingForComponent } from '../loading-for/loading-for.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievement-card',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, LoadingForComponent, CommonModule],
  templateUrl: './achievement-card.component.html',
  styleUrl: './achievement-card.component.scss'
})
export class AchievementCardComponent {
  @Input({required: true}) achievementData!: Achievement;
  isModalOpened = false;
  txStatus: boolean | undefined;

  constructor(private database: DatabaseService, private telegram: TelegramService, private tonconnect: TonConnectService) { }

  showAchievementDescription() {
    this.telegram.showPopup(this.achievementData.name, this.achievementData.description,
      [{
        id: "close-button",
        type: "ok"
      }]
    );
  }

  async claimSBT() {
    try {
      this.isModalOpened = true;
      const tx_hash = await this.database.claimSBT(this.telegram.getUserTGId()!, this.tonconnect.getWallet(), this.achievementData.id);
      console.log(tx_hash);
      this.txStatus = await this.tonconnect.getTxStatus(tx_hash);
      console.log(this.txStatus);
    }
    catch (e) {
      console.log(e);
    }
  }

  async closeModal() {
    this.isModalOpened = false;
    this.txStatus = undefined;
  }
}
