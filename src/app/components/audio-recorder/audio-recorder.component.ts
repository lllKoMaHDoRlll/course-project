import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.scss'
})
export class AudioRecorderComponent {
  @ViewChild("audioRef") audioEl!: ElementRef<HTMLAudioElement>;

  private icons = {
    mic: faMicrophone,
    stop: faStop
  };
  activeIcon = this.icons.mic;

  private audioChunks: Blob[] = [];
  isRecording = false;
  audioUrl: string | null = null;
  private mediaRecorder: MediaRecorder | null = null;

  audioRecorded = output<{audioURL: string, audioBlob: Blob}>();

  private startRecording = () => {
    if (!this.mediaRecorder) return;
    this.mediaRecorder.start();
    this.isRecording = true;
    this.audioChunks = [];
    this.audioUrl = null;
  }

  private stopRecording = () => {
    if (!this.mediaRecorder) return;
    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  handleRecordClick = () => {
    if (!this.isRecording) {
      this.startRecording();
      this.activeIcon = this.icons.stop;
    } else {
      this.stopRecording();
      this.activeIcon = this.icons.mic;
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true});
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, {type: "audio/wav"});
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audioEl.nativeElement.src = this.audioUrl!;
        this.audioEl.nativeElement.load();
        this.audioRecorded.emit({
          audioURL: this.audioUrl!,
          audioBlob: audioBlob
        });
      }
    } catch (error) {
      console.log(`An error was occured: ${error}`);
    }
  }
}
