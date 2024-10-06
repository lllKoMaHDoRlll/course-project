import { AfterViewInit, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../button/button.component';
import { exercisesService } from '../../../services/database/exercises.service';
import { AnswerStatus, ExerciseListeningData } from '../../../interfaces/exercises-data';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-listening',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent, CommonModule, LoadingComponent],
  templateUrl: './exercise-listening.component.html',
  styleUrl: './exercise-listening.component.scss'
})
export class ExerciseListeningComponent implements AfterViewInit {
  exerciseListeningData: ExerciseListeningData | undefined;
  audio: HTMLAudioElement | undefined;
  answerInput: HTMLInputElement | undefined;
  answerStatus: AnswerStatus = "not-answered";

  faPlay = faPlay;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  constructor(private router: Router) {}

  async ngAfterViewInit() {
    this.exerciseListeningData = await exercisesService.getRandomExerciseListeningData();

    setTimeout(() => {
      this.audio = document.querySelector(".exercise-card__audio > audio") as HTMLAudioElement;
      this.answerInput = document.querySelector(".exercise-card__answer > input") as HTMLInputElement;
    }, 500);
  }

  play = (ev: MouseEvent) => {
    console.log(1);
    this.audio!.play();
  }

  handleAnswer = async () => {
    console.log(this.answerInput!.value);
    const answer = this.answerInput!.value;
    if (!answer) return;
    this.answerStatus = "checking";

    const res = await exercisesService.checkListeningAnswer(1, answer);
    if (res) {
      this.answerStatus = "correct";
    }
    else this.answerStatus = "incorrect";
  }

  goBack = () => {
    this.router.navigate(['exercises']);
  }

  resetExercise = async () => {
    this.exerciseListeningData = undefined;
    this.answerStatus = "not-answered";
    this.exerciseListeningData = await exercisesService.getRandomExerciseListeningData();

    setTimeout(() => {
      this.audio = document.querySelector(".exercise-card__audio > audio") as HTMLAudioElement;
      this.answerInput = document.querySelector(".exercise-card__answer > input") as HTMLInputElement;
    }, 500);
  }
}
