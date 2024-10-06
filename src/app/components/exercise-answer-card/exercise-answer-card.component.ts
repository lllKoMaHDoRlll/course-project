import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnswerStatus } from '../../interfaces/exercises-data';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-answer-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, LoadingComponent, ButtonComponent],
  templateUrl: './exercise-answer-card.component.html',
  styleUrl: './exercise-answer-card.component.scss'
})
export class ExerciseAnswerCardComponent {
  @Input({required: true}) answerStatus!: AnswerStatus;
  @Output() exerciseReseted = new EventEmitter<void>();

  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  constructor(private router: Router) { }

  goBack = () => {
    this.router.navigate(["exercises"]);
  }
}
