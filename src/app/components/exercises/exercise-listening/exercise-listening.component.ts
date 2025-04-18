import { AfterViewInit, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../button/button.component';
import { ExercisesService } from '../../../services/database/exercises.service';
import { AnswerStatus, ExerciseListeningData } from '../../../interfaces/exercises-data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExerciseAnswerCardComponent } from '../../exercise-answer-card/exercise-answer-card.component';
import { LoadingForComponent } from '../../loading-for/loading-for.component';
import { ModalComponent } from '../../modal/modal.component';
import { TelegramService } from '../../../services/telegram.service';

@Component({
  selector: 'app-exercise-listening',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent, CommonModule, ExerciseAnswerCardComponent, LoadingForComponent, ModalComponent],
  templateUrl: './exercise-listening.component.html',
  styleUrl: './exercise-listening.component.scss'
})
export class ExerciseListeningComponent implements AfterViewInit {
  exerciseListeningData: ExerciseListeningData | undefined;
  audio: HTMLAudioElement | undefined;
  answerInput: HTMLInputElement | undefined;
  answerStatus: AnswerStatus = "not-answered";

  faPlay = faPlay;

  constructor(private router: Router, private telegram: TelegramService, private exercisesService: ExercisesService) {
    this.telegram.showBackButton();
  }

  async ngAfterViewInit() {
    this.exerciseListeningData = await this.exercisesService.getRandomExerciseListeningData();

    setTimeout(() => {
      this.audio = document.querySelector(".exercise-card__audio > audio") as HTMLAudioElement;
      this.answerInput = document.querySelector(".exercise-card__answer > input") as HTMLInputElement;
    }, 1);
  }

  play = (ev: MouseEvent) => {
    this.audio!.play();
  }

  handleAnswer = async () => {
    console.log(this.answerInput!.value);
    const answer = this.answerInput!.value;
    if (!answer) return;
    this.answerStatus = "checking";

    const res = await this.exercisesService.checkListeningAnswer(this.exerciseListeningData?.id!, answer, this.telegram.getUserTGId()!);
    if (res) {
      this.answerStatus = "correct";
    }
    else this.answerStatus = "incorrect";
  }

  resetExercise = async () => {
    this.exerciseListeningData = undefined;
    this.answerStatus = "not-answered";
    this.exerciseListeningData = await this.exercisesService.getRandomExerciseListeningData();

    setTimeout(() => {
      this.audio = document.querySelector(".exercise-card__audio > audio") as HTMLAudioElement;
      this.answerInput = document.querySelector(".exercise-card__answer > input") as HTMLInputElement;
    }, 1);
  }
}
