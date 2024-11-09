import { AchievementProgressCardComponent } from '../../components/achievement-progress-card/achievement-progress-card.component';
import { Component, inject, OnInit } from '@angular/core';
import { AchievementProgress } from '../../interfaces/achievements';
import { faHeadphones, faLanguage, faLink, faParagraph, faSpellCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TelegramService } from '../../services/telegram.service';
import { DatabaseService } from '../../services/database/database.service';
import { Router } from '@angular/router';
import { LoadingForComponent } from '../../components/loading-for/loading-for.component';

const achievementsTypesIcons = [
  faStar,
  faParagraph,
  faLanguage,
  faHeadphones,
  faSpellCheck,
  faLink
];

@Component({
  selector: 'app-achievements-types-page',
  standalone: true,
  imports: [ CommonModule, AchievementProgressCardComponent, LoadingForComponent],
  templateUrl: './achievements-types-page.component.html',
  styleUrl: './achievements-types-page.component.scss'
})
export class AchievementsTypesPageComponent implements OnInit{
  database = inject(DatabaseService);
  telegram = inject(TelegramService);
  achievementsProgressesList: AchievementProgress[] = [];

  constructor(private router: Router) {
    this.telegram.showBackButton();
  }

  async ngOnInit() {
    this.achievementsProgressesList = (await this.database.achievementsTypesProgresses).sort((a, b) => a.id - b.id);
    for (let i = 0; i < this.achievementsProgressesList.length; i++) {
      this.achievementsProgressesList[i].icon = achievementsTypesIcons[i];
    }
  }

  navigateTo(id: number) {
    this.router.navigate(["achievements", id])
  }
}
