import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { LoadingForComponent } from '../../loading-for/loading-for.component';
import { ButtonComponent } from '../../button/button.component';
import { ModalComponent } from '../../modal/modal.component';
import { ExerciseAnswerCardComponent } from '../../exercise-answer-card/exercise-answer-card.component';
import { AnswerStatus, ExerciseGramarData } from '../../../interfaces/exercises-data';
import { ExercisesService } from '../../../services/database/exercises.service';
import { TelegramService } from '../../../services/telegram.service';

@Component({
  selector: 'app-exercise-gramar',
  standalone: true,
  imports: [CommonModule, LoadingForComponent, ButtonComponent, ModalComponent, ExerciseAnswerCardComponent],
  templateUrl: './exercise-gramar.component.html',
  styleUrl: './exercise-gramar.component.scss'
})
export class ExerciseGramarComponent implements AfterViewInit{
  answerStatus: AnswerStatus = "not-answered";
  exerciseData: ExerciseGramarData | undefined;

  userInputs: HTMLInputElement[] | undefined;
  userPseudoAnswers: string[] = [];

  telegram = inject(TelegramService);
  exercisesService = inject(ExercisesService)

  constructor() {
    this.telegram.showBackButton();
  }

  async ngAfterViewInit() {
    this.exerciseData = await this.exercisesService.getRandomExerciseGramarData();
    for(let i = 0; i < this.exerciseData.taskList.length; i++) {
      this.userPseudoAnswers[i] = "";
    }

    setTimeout(() => {
      this.userInputs = Array.from(document.querySelectorAll(".exercise-card__task-list__item > input"));
    }, 1);
  }

  handleInput = (ev: Event, inputId: number) => {
    const target = ev.target as HTMLInputElement;

    this.userPseudoAnswers[inputId] = target.value;
  }

  handleAnswer = async () => {
    for (let i = 0; i < this.userPseudoAnswers.length; i++) {
      if (this.userPseudoAnswers[i].trim().length == 0) return;
    }

    this.answerStatus = "checking";
    const res = await this.exercisesService.checkGramarAnswer(this.exerciseData!.id, this.userPseudoAnswers, this.telegram.getUserTGId()!);
    this.answerStatus = res ? "correct" : "incorrect";
  }

  resetExercise = async () => {
    this.answerStatus = "not-answered";
    this.exerciseData = undefined;
    this.exerciseData = await this.exercisesService.getRandomExerciseGramarData();
    for(let i = 0; i < this.exerciseData.taskList.length; i++) {
      this.userPseudoAnswers[i] = "";
    }
    for(let i = 0; i < this.exerciseData.taskList.length; i++) {
      this.userPseudoAnswers[i] = "";
    }

    setTimeout(() => {
      this.userInputs = Array.from(document.querySelectorAll(".exercise-card__task-list__item > input"));
    }, 1);
  }
}
