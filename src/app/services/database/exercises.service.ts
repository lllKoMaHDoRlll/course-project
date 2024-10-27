import { Injectable, ElementRef, QueryList } from '@angular/core';
import { ExerciseChainData, ExerciseGramarData, ExerciseListeningData, ExerciseSentencesData, ExerciseWordsData } from '../../interfaces/exercises-data';
import axios from "axios";

const DB_HOST = "https://tonolingo.ru";

@Injectable({
  providedIn: 'root'
})
class ExercisesService {

  constructor() { }

  getRandomExerciseSentenceData = async (): Promise<ExerciseSentencesData> => {
    const result = await axios.get(`${DB_HOST}/api/exercises/sentence`, {
      headers: {
        "bypass-tunnel-reminder": "*"
      }
    });
    return result.data;
  }

  async checkSentenceAnswer(sentenceId: number, answer: string, userId: number): Promise<boolean> {
    const result = await axios.post(`${DB_HOST}/api/exercises/sentence`, {
        "id": sentenceId,
        "answer": answer
      }, {
        params: {
          user_id: userId
        }
      }
    );
    console.log(result);
    return result.data.result;
  }

  getRandomExerciseWordsData = async (): Promise<ExerciseWordsData> => {
    const response = await axios.get(`${DB_HOST}/api/exercises/words`)
    const exerciseWordsData: ExerciseWordsData = {
      id: response.data.id,
      words: response.data.words,
      translations: response.data.translations
    };

    return exerciseWordsData;
  }

  checkWordsAnswer = async (exerciseId: number, words: string[], userId: number): Promise<boolean> => {
    const result = await axios.post(`${DB_HOST}/api/exercises/words`, {
      id: exerciseId,
      words: words
    }, {
      params: {
        user_id: userId
      }
    });
    return result.data.result;
  }

  getRandomExerciseListeningData = async (): Promise<ExerciseListeningData> => {
    const exercise_data = await axios.get(`${DB_HOST}/api/exercises/listening`, {
      responseType: "blob"
    });
    const href = URL.createObjectURL(exercise_data.data);
    const regexp = new RegExp(/output_(?<id>[\d]+).wav/gm);
    const exerciseId = Number.parseInt(regexp.exec(exercise_data.headers["content-disposition"])?.groups!["id"]!);
    return {
      id: exerciseId,
      audioFilePath: href,
    };
  }

  checkListeningAnswer = async (listeningId: number, answer: string, userId: number): Promise<boolean> => {
    const result = await axios.post(`${DB_HOST}/api/exercises/listening`, {
      id: listeningId,
      words: answer.split(" ")
    }, {
      params: {
        user_id: userId
      }
    });
    return result.data.result;
  }

  getRandomExerciseGramarData = async (): Promise<ExerciseGramarData> => {
    const response = await axios.get(`${DB_HOST}/api/exercises/gramar`)
    const exerciseGramarData: ExerciseGramarData = {
      id: response.data.id,
      taskDescription: response.data.desctiption,
      taskList: response.data.tasks
    };

    return exerciseGramarData;
  }

  checkGramarAnswer = async (taskId: number, userAnswer: string[], userId: number): Promise<boolean> => {
    const result = await axios.post(`${DB_HOST}/api/exercises/gramar`, {
      id: taskId,
      answers: userAnswer
    }, {
      params: {
        user_id: userId
      }
    });
    return result.data.result;
  }

  getWordForChain = async (prevWord?: ExerciseChainData): Promise<ExerciseChainData | null> => {
    let word;
    if (prevWord) {
      word = (await axios.get(`${DB_HOST}/api/exercises/chain`, {params: {
        word: prevWord.word
      }})).data;
      if (!word) return null;
    }
    else {
      word = (await axios.get(`${DB_HOST}/api/exercises/chain`)).data;
    }

    const data: ExerciseChainData = {
      type: "input",
      word: word.result
    };
    console.log(data);
    return data;
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
