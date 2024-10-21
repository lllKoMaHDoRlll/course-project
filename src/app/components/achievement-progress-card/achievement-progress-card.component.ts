import { Component, Input } from '@angular/core';
import { AchievementProgress } from '../../interfaces/achievements';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-achievement-progress-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './achievement-progress-card.component.html',
  styleUrl: './achievement-progress-card.component.scss'
})
export class AchievementProgressCardComponent {
  @Input({required: true}) achievementProgress!: AchievementProgress;
}
