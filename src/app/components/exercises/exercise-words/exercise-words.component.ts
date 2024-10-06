import { Component, ElementRef } from '@angular/core';
import { ExerciseWordsData } from '../../../interfaces/exercises-data';
import { ElementPoint, exercisesService } from '../../../services/database/exercises.service';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { LoadingComponent } from '../../loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-exercise-words',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingComponent, FontAwesomeModule],
  templateUrl: './exercise-words.component.html',
  styleUrl: './exercise-words.component.scss'
})
export class ExerciseWordsComponent {
  exerciseData: ExerciseWordsData | undefined;
  wordsContainerRef: HTMLDivElement | null = null;
  wordsPoints: ElementPoint[] = [];
  lastTouchPosition: number[] | null = null;
  answersSlots: ElementPoint[] = [];
  answerResult: -2 | -1 | 0 | 1 = -2;

  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  constructor(private router: Router, private elementRef: ElementRef) { }

  async ngAfterViewInit() {
    this.exerciseData = await exercisesService.getRandomExerciseWordsData();
    for (let i = 0; i < this.exerciseData.words.length; i++) {
      this.wordsPoints.push(new ElementPoint());
    }
    setTimeout(() => {
      this.wordsContainerRef = (this.elementRef.nativeElement as HTMLDivElement).querySelector("div.exercise-card__sentence-words");
      this.calculateAbsSlotsPositions();
    }, 500);
  }

  moveWord = (ev: TouchEvent, wordId: number) => {
    if (!this.wordsPoints[wordId].elementRef) {
      const target = ev.target! as HTMLSpanElement;
      this.wordsPoints[wordId].elementRef = target;
    }
    if (!this.lastTouchPosition) {
      this.lastTouchPosition = [ev.touches[0].clientX, ev.touches[0].clientY];
      this.wordsPoints[wordId].clearRel();
    }
    else {
      const deltaX = ev.touches[0].clientX - this.lastTouchPosition[0];
      const deltaY = ev.touches[0].clientY - this.lastTouchPosition[1];
      this.wordsPoints[wordId].moveBy(deltaX, deltaY);
      this.lastTouchPosition = [ev.touches[0].clientX, ev.touches[0].clientY];
    }
  }

  stopMoveWord = (ev: TouchEvent, wordId: number) => {
    this.lastTouchPosition = null;

    this.wordsPoints[wordId].setAbsWithRect();
    let [minI, minDistance] = this.wordsPoints[wordId].getMinDistance(this.answersSlots, this.wordsPoints.map((value) => value.fittedInto));

    if (minDistance! > 1000) {
      minI = -1;
    }

    if (this.wordsPoints[wordId].fittedInto != -1) {
      this.answersSlots[this.wordsPoints[wordId].fittedInto].elementRef!.style.minWidth = "50px";
      this.answersSlots[this.wordsPoints[wordId].fittedInto].elementRef!.style.minHeight = "30px";
      this.wordsPoints[wordId].goHome(this.wordsContainerRef!);
    }

    if (minI != -1) {
      this.wordsPoints[wordId].fitIntoSlot(this.answersSlots[minI].elementRef! as HTMLLIElement, minI);
    }
    else {
      this.wordsPoints[wordId].goHome(this.wordsContainerRef!);
    }
    this.calculateAbsSlotsPositions();
  }

  calculateAbsSlotsPositions = () => {
    const answersCells = (this.elementRef.nativeElement as HTMLDivElement).querySelectorAll("li.exercise-card__answer-cells__cell__slot");
    answersCells.forEach((el, index) => {
      let rect = el.getBoundingClientRect();
      this.answersSlots[index] = new ElementPoint((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2, 0, 0, el as HTMLLIElement);
    });
  }

  handleAsnwer = async () => {
    let answer: string[] = [];
    for (let i = 0; i < this.wordsPoints.length; i++) {
      if (!(this.wordsPoints[i].elementRef?.innerText)) {
        console.log("empty");
        return;
      }
      answer[this.wordsPoints[i].fittedInto] = this.wordsPoints[i].elementRef!.innerText;
    }
    this.answerResult = -1;
    const result = await exercisesService.checkSentenceAnswer(this.exerciseData!.id, answer.join(" "));
    if (result) this.answerResult = 1;
    else this.answerResult = 0;
  }

  goBack = () => {
    this.router.navigate(['exercises']);
  }

  resetExercise = async () => {
    this.exerciseData = undefined;
    this.wordsContainerRef = null;
    this.wordsPoints = [];
    this.lastTouchPosition = null;
    this.answersSlots = [];
    this.answerResult = -2;

    this.exerciseData = await exercisesService.getRandomExerciseWordsData();
    for (let i = 0; i < this.exerciseData.words.length; i++) {
      this.wordsPoints.push(new ElementPoint());
    }
    setTimeout(() => {
      this.wordsContainerRef = (this.elementRef.nativeElement as HTMLDivElement).querySelector("div.exercise-card__sentence-words");
      this.calculateAbsSlotsPositions();
    }, 500);
  }
}
