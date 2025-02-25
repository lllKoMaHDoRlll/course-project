import { Component, inject } from '@angular/core';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ExerciseCardData, exercisesMap } from '../../interfaces/exercise-card-data';
import {faHeadphones, faLanguage, faLink, faParagraph, faSpellCheck} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TelegramService } from '../../services/telegram.service';

const exerciseCardDataList: ExerciseCardData[] = [
  {
    name: "Предложения",
    icon: faParagraph,
    id: 0
  },
  {
    name: "Слова",
    icon: faLanguage,
    id: 1
  },
  {
    name: "Аудирование",
    icon: faHeadphones,
    id: 2
  },
  {
    name: "Грамматика",
    icon: faSpellCheck,
    id: 3
  },
  {
    name: "Цепочки",
    icon: faLink,
    id: 4
  },
  {
    name: "Произношение",
    icon: faHeadphones,
    id: 5
  },
];

@Component({
  selector: 'app-exercises-page',
  standalone: true,
  imports: [ExerciseCardComponent, CommonModule],
  templateUrl: './exercises-page.component.html',
  styleUrl: './exercises-page.component.scss'
})
export class ExercisesPageComponent{
  exerciseCardDataList = exerciseCardDataList;
  exercisesMap = exercisesMap;

  constructor(private router: Router, private route: ActivatedRoute, private telegram: TelegramService) {
    this.telegram.showBackButton();
  }

  goTo = (path: string) => {
    this.router.navigate([path], {relativeTo: this.route});
  }
}
