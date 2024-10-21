import { AchievementProgressCardComponent } from './../../components/achievement-progress-card/achievement-progress-card.component';
import { Component, inject } from '@angular/core';
import { AchievementProgress } from '../../interfaces/achievements';
import { faHeadphones, faLanguage, faLink, faParagraph, faSpellCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { TelegramService } from '../../telegram.service';

const achievementsProgressesList: AchievementProgress[] = [
  {
    id: 0,
    name: "Общее",
    icon: faStar,
    completed: 5,
    total: 10
  },
  {
    id: 1,
    name: "Предложения",
    icon: faParagraph,
    completed: 10,
    total: 10
  },
  {
    id: 2,
    name: "Слова",
    icon: faLanguage,
    completed: 0,
    total: 10
  },
  {
    id: 3,
    name: "Аудирование",
    icon: faHeadphones,
    completed: 5,
    total: 21
  },
  {
    id: 4,
    name: "Грамматика",
    icon: faSpellCheck,
    completed: 9,
    total: 10
  },
  {
    id: 5,
    name: "Цепочки",
    icon: faLink,
    completed: 7,
    total: 9
  }
];

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  imports: [ CommonModule, FontAwesomeModule, AchievementProgressCardComponent],
  templateUrl: './achievements-page.component.html',
  styleUrl: './achievements-page.component.scss'
})
export class AchievementsPageComponent {
  telegram = inject(TelegramService);
  achievementsProgressesList = achievementsProgressesList;

  constructor() {
    this.telegram.showBackButton();
  }
}
