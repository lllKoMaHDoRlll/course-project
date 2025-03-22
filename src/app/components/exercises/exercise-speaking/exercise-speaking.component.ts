
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecorderComponent } from '../../audio-recorder/audio-recorder.component';
import { TelegramService } from '../../../services/telegram.service';
import { ExercisesService } from '../../../services/database/exercises.service';
import { AnswerStatus, ExerciseAuditionData } from '../../../interfaces/exercises-data';
import { LoadingForComponent } from '../../loading-for/loading-for.component';
import { ModalComponent } from '../../modal/modal.component';
import { ExerciseAnswerCardComponent } from '../../exercise-answer-card/exercise-answer-card.component';


@Component({
  selector: 'app-exercise-speaking',
  standalone: true,
  imports: [CommonModule, AudioRecorderComponent, LoadingForComponent, ModalComponent, ExerciseAnswerCardComponent],
  templateUrl: './exercise-speaking.component.html',
  styleUrl: './exercise-speaking.component.scss'
})
export class ExerciseSpeakingComponent implements AfterViewInit {
  exerciseData: ExerciseAuditionData | undefined;
  answerStatus: AnswerStatus = "not-answered";
  private recordedAudioURL: string | null = null;

  constructor(private telegram: TelegramService, private exercisesService: ExercisesService, private changeDetectorRef: ChangeDetectorRef) {
    this.telegram.showBackButton();
  }

  async ngAfterViewInit() {
    this.exerciseData = await this.exercisesService.getRandomExerciseAuditionData();
    console.log(this.exerciseData);
  }

  resetExercise = async () => {
    this.exerciseData = undefined;
    this.answerStatus = "not-answered";
    this.changeDetectorRef.detectChanges();
    this.exerciseData = await this.exercisesService.getRandomExerciseAuditionData();
    this.changeDetectorRef.detectChanges();
  }

  setAnswerStatus = (newStatus: AnswerStatus) => {
    this.answerStatus = newStatus;
  }

  handleRecordedAudio = async (event: {audioURL: string, audioBlob: Blob}) => {
    this.setAnswerStatus("checking");
    console.log(this.answerStatus);
    this.changeDetectorRef.detectChanges();
    const result = await this.exercisesService.checkAuditionAnswer(this.exerciseData!.id, event.audioBlob, this.telegram.getUserTGId()!);
    console.log(result);
    if (result) this.setAnswerStatus("correct");
    else this.setAnswerStatus("incorrect");
    this.changeDetectorRef.detectChanges();
  }
}
