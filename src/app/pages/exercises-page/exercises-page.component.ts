import { Component } from '@angular/core';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { ExerciseCardData, exercisesMap } from '../../interfaces/exercise-card-data';
import {faHeadphones, faLanguage, faLink, faParagraph, faSpellCheck} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
];

@Component({
  selector: 'app-exercises-page',
  standalone: true,
  imports: [ExerciseCardComponent, CommonModule],
  templateUrl: './exercises-page.component.html',
  styleUrl: './exercises-page.component.scss'
})
export class ExercisesPageComponent {
  exerciseCardDataList = exerciseCardDataList;
  exercisesMap = exercisesMap;

  constructor(private router: Router, private route: ActivatedRoute) {}

  goTo = (path: string) => {
    this.router.navigate([path], {relativeTo: this.route});
  }
}
