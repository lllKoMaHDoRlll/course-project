import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {ElementPoint, exercisesService, Point} from './../../../services/database/exercises.service';
import { ExerciseSentencesData } from '../../../interfaces/exercises-data';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { LoadingComponent } from '../../loading/loading.component';


@Component({
  selector: 'app-exercise-sentences',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingComponent],
  templateUrl: './exercise-sentences.component.html',
  styleUrl: './exercise-sentences.component.scss'
})
export class ExerciseSentencesComponent implements AfterViewInit{
  exerciseData: ExerciseSentencesData | undefined;
  wordsContainerRef: HTMLDivElement | null = null;
  wordsPoints: ElementPoint[] = [];
  lastTouchPosition: number[] | null = null;
  answersSlots: ElementPoint[] = [];

  constructor(private elementRef: ElementRef) { }

  async ngAfterViewInit() {
    this.exerciseData = await exercisesService.getRandomExerciseSentenceData();
    for (let i = 0; i < this.exerciseData.sentence.length; i++) {
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
    const answersCells = (this.elementRef.nativeElement as HTMLDivElement).querySelectorAll("li.exercise-card__answer-cells__cell");
    answersCells.forEach((el, index) => {
      let rect = el.getBoundingClientRect();
      this.answersSlots[index] = new ElementPoint((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2, 0, 0, el as HTMLLIElement);
    });
  }
}
