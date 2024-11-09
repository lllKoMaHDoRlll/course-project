import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Achievement } from '../../interfaces/achievements';
import { DatabaseService } from '../../services/database/database.service';
import { TelegramService } from '../../services/telegram.service';
import { CommonModule } from '@angular/common';
import { AchievementCardComponent } from "../../components/achievement-card/achievement-card.component";
import { LoadingForComponent } from '../../components/loading-for/loading-for.component';

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  imports: [CommonModule, AchievementCardComponent, LoadingForComponent],
  templateUrl: './achievements-page.component.html',
  styleUrl: './achievements-page.component.scss'
})
export class AchievementsPageComponent implements OnInit{
  constructor(private route: ActivatedRoute, private database: DatabaseService, private telegram: TelegramService) {
    this.telegram.showBackButton();
  }
  achievementTypeId = Number(this.route.snapshot.paramMap.get("type_id"));
  achievements: Achievement[] = [];
  async ngOnInit() {
    this.achievements = await this.database.getAchievements(this.telegram.getUserTGId()!, this.achievementTypeId!);
    console.log(this.achievements);
  }
}
