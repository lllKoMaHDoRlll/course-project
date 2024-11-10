import { Component, inject, Input } from '@angular/core';
import { Achievement } from '../../interfaces/achievements';
import { ButtonComponent } from "../button/button.component";
import { TelegramService } from '../../services/telegram.service';
import { DatabaseService } from '../../services/database/database.service';
import TonConnectService from '../../services/ton-connect.service';
import { ModalComponent } from '../modal/modal.component';
import { LoadingForComponent } from '../loading-for/loading-for.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-achievement-card',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, LoadingForComponent, CommonModule, FontAwesomeModule],
  templateUrl: './achievement-card.component.html',
  styleUrl: './achievement-card.component.scss'
})
export class AchievementCardComponent {
  @Input({required: true}) achievementData!: Achievement;
  isModalOpened = false;
  txStatus: boolean | undefined;
  txHash: string | undefined;

  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

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
      if (this.achievementData.is_sbt_claimed) {
        this.telegram.showPopup("SBT уже получено", "Вы не можете получить SBT больше одного раза.", [{"id": "close", "type": "close"}]);
        return;
      }
      if (!this.achievementData.is_completed) {
        this.telegram.showPopup("Вы еще не выполнили достижение", "Перед получением SBT выполните достижение.", [{"id": "close", "type": "close"}]);
        return;
      }
      if (!this.tonconnect.getWallet() || !this.telegram.getUserTGId() || this.achievementData.is_sbt_claimed) return;
      this.isModalOpened = true;
      const {tx_hash, status} = await this.database.claimSBT(this.telegram.getUserTGId()!, this.tonconnect.getWallet(), this.achievementData.id);
      this.txHash = tx_hash;
      this.txStatus = status;
      if (status) this.achievementData.is_sbt_claimed = true;
    }
    catch (e) {
      console.log(e);
    }
  }

  async closeModal() {
    this.isModalOpened = false;
    this.txStatus = undefined;
  }

  async openLink(url: string) {
    window.open(url);
  }
}
