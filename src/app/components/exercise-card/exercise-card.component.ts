import { Component, Input } from '@angular/core';
import { ExerciseCardData } from '../../interfaces/exercise-card-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent {
 @Input({required: true}) exerciseCardData: ExerciseCardData | undefined;
}
