
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecorderComponent } from '../../audio-recorder/audio-recorder.component';
import { TelegramService } from '../../../services/telegram.service';
import { ExercisesService } from '../../../services/database/exercises.service';


@Component({
  selector: 'app-exercise-speaking',
  standalone: true,
  imports: [CommonModule, AudioRecorderComponent],
  templateUrl: './exercise-speaking.component.html',
  styleUrl: './exercise-speaking.component.scss'
})
export class ExerciseSpeakingComponent {
  private recordedAudioURL: string | null = null;

  constructor(private telegram: TelegramService, private exercisesService: ExercisesService) {
    this.telegram.showBackButton();
  }

  handleRecordedAudio = async (event: {audioURL: string, audioBlob: Blob}) => {
    const result = await this.exercisesService.checkAuditionAnswer(1, event.audioBlob, this.telegram.getUserTGId()!);
    console.log(result);
  }
}
