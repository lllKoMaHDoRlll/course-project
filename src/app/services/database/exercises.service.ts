import { Injectable, ElementRef } from '@angular/core';
import { ExerciseSentencesData } from '../../interfaces/exercises-data';

@Injectable({
  providedIn: 'root'
})
class ExercisesService {

  constructor() { }

  getRandomExerciseSentenceData = (): Promise<ExerciseSentencesData> => {
    let words = "What a wonderful day today!".split(" ");
    const translation = "Какой замечательный день сегодня!";
    let sentence: [number, string][] = [];
    let index = 0;
    while (words.length > 0) {
      let randomIndex = Math.floor(Math.random() * (words.length));
      sentence.push([index, words.at(randomIndex)!]);
      words.splice(randomIndex, 1);
      index++;
    }
    const result: ExerciseSentencesData = {
      sentence: sentence,
      translation: translation
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }
}

class Point {
  absX: number;
  absY: number;
  constructor(absX: number = 0, absY: number = 0) {
    this.absX = absX;
    this.absY = absY;
  }

  getDistance = (point: Point): number => {
    return Math.pow(this.absX - point.absX, 2) + Math.pow(this.absY - point.absY, 2);
  }
}

class ElementPoint extends Point {
  elementRef: HTMLElement | null;
  relX: number;
  relY: number;
  fittedInto: number;

  constructor(absX: number = 0, absY: number = 0, relX: number = 0, relY: number = 0, elementRef: HTMLElement | null = null, fittedInto: number = -1) {
    super(absX, absY);
    this.elementRef = elementRef;
    this.relX = relX;
    this.relY = relY;
    this.fittedInto = fittedInto;
  }

  moveBy = (deltaX: number, deltaY: number): void => {
    this.relX += deltaX;
    this.relY += deltaY;
    this.elementRef!.style.left = this.relX.toString() + "px";
    this.elementRef!.style.top = this.relY.toString() + "px";
  }

  clearRel = () => {
    this.relX = 0;
    this.relY = 0;
  }

  setAbsWithRect = () => {
    const rect = this.elementRef!.getBoundingClientRect();
    this.absX = (rect.left + rect.right) / 2;
    this.absY = (rect.top + rect.bottom) / 2;
  }

  getMinDistance = (points: Point[], answers: number[]): [number, number] => {
    let minIndex = -1;
    let minDistance: number | undefined;
    points.forEach((point, index) => {
      if (answers.findIndex((value) => value === index) != -1) return;

      let distance = this.getDistance(point);
      if (!minDistance || distance < minDistance) {
        minIndex = index;
        minDistance = distance;
      }
    });
    return [minIndex, minDistance!];
  }

  goHome = (containerRef: HTMLDivElement) => {
    containerRef.appendChild(this.elementRef!);
    this.elementRef!.style.position = "relative";
    this.elementRef!.style.top = "0";
    this.elementRef!.style.left = "0";
    this.fittedInto = -1;
  }

  fitIntoSlot = (cell: HTMLLIElement, cellIndex: number) => {
    this.fittedInto = cellIndex
    cell.style.minWidth = "0";
    cell.style.minHeight = "0";
    cell.appendChild(this.elementRef!);
    this.elementRef!.style.position = "relative";
    this.elementRef!.style.top = "0";
    this.elementRef!.style.left = "0";
  }

}

export const exercisesService = new ExercisesService();
export {Point, ElementPoint};
