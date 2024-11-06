import { Component, inject, Input } from '@angular/core';
import { Achievement } from '../../interfaces/achievements';
import { ButtonComponent } from "../button/button.component";
import { TelegramService } from '../../services/telegram.service';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-achievement-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './achievement-card.component.html',
  styleUrl: './achievement-card.component.scss'
})
export class AchievementCardComponent {
  @Input({required: true}) achievementData!: Achievement;

  constructor(private database: DatabaseService, private telegram: TelegramService) { }

  showAchievementDescription() {
    this.telegram.showPopup(this.achievementData.name, this.achievementData.description,
      [{
        id: "close-button",
        type: "ok"
      }]
    );
  }

  async claimSBT() {
    this.database.claimSBT(this.telegram.getUserTGId()!, this.achievementData.id);
  }
}
