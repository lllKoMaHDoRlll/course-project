import { Injectable, ElementRef, QueryList } from '@angular/core';
import { ExerciseChainData, ExerciseGramarData, ExerciseListeningData, ExerciseSentencesData, ExerciseWordsData } from '../../interfaces/exercises-data';
import axios from "axios";

const DB_HOST = "https://tonolingo.ru";

@Injectable({
  providedIn: 'root'
})
class ExercisesService {

  constructor() { }

  getUserProfilePicture = async (userId: number): Promise<string> => {
    const result = await axios.get(`${DB_HOST}/api/telegram/profile_photo?user_id=${userId}`, {
      responseType: "blob"
    });
    console.log(result);
    const href = URL.createObjectURL(result.data);
    return href;
  }

  getRandomExerciseSentenceData = async (): Promise<ExerciseSentencesData> => {
    // let words = "What a wonderful day today!".split(" ");
    // const translation = "Какой замечательный день сегодня!";
    // const id = 1;
    // let sentence: [number, string][] = [];
    // let index = 0;
    // while (words.length > 0) {
    //   let randomIndex = Math.floor(Math.random() * (words.length));
    //   sentence.push([index, words.at(randomIndex)!]);
    //   words.splice(randomIndex, 1);
    //   index++;
    // }
    // const result: ExerciseSentencesData = {
    //   id: id,
    //   sentence: sentence,
    //   translation: translation
    // };
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(result);
    //   }, 1000);
    // });
    const result = await axios.get(`${DB_HOST}/api/exercises/sentence`, {
      headers: {
        "bypass-tunnel-reminder": "*"
      }
    });
    return result.data;
  }

  async checkSentenceAnswer(sentenceId: number, answer: string): Promise<boolean> {
    // let res = false;
    // if (answer == "What a wonderful day today!") res = true;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(res);
    //   }, 1000);
    // });
    const result = await axios.post(`${DB_HOST}/api/exercises/sentence`, {
        "id": sentenceId,
        "answer": answer
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

  checkWordsAnswer = async (exerciseId: number, words: string[]): Promise<boolean> => {
    const result = await axios.post(`${DB_HOST}/api/exercises/words`, {
      id: exerciseId,
      words: words
    });
    return result.data.result;
  }

  getRandomExerciseListeningData = async (): Promise<ExerciseListeningData> => {
    // const data: ExerciseListeningData = {
    //   id: 1,
    //   audioFilePath: "./assets/audio/audio_mok.mp3"
    // };
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(data);
    //   }, 1000);
    // });
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

  checkListeningAnswer = (listeningId: number, answer: string): Promise<boolean> => {
    let res = false;
    if (answer == "sound") res = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });



  }

  getRandomExerciseGramarData = (): Promise<ExerciseGramarData> => {
    const data: ExerciseGramarData = {
      id: 1,
      taskDescription: "Заполните пропуски словами в правильной форме",
      taskList: [
        ["It was warm, so I", "off my coat. (take)"],
        ["The film wasn't very good. I", "it very much. (enjoy)"],
        ["I knew Kate was very busy, so I", "her. (disturb)"],
        ["I was very tired, so I", "to bed early. (go)"],
        ["The bed was very uncomfortable. I", "very well. (sleep)"],
        ["Fabiola wasn't hungry, so she", "anything. (eat)"],
        ["We went to Laila's house but she", "at home. (be)"],
        ["It was a funny situation but nobody", ". (laugh)"],
        ["The window was open and a bird ", "into the room. (fly)"],
        ["The hotel wasn't very expensive. It", "very much. (cost)"],
        ["I was in a hurry, so I", "time to phone you. (have)"],
        ["It was very hard work carrying the bags. They", "very heavy. (be)"],
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }

  checkGramarAnswer = (taskId: number, userAnswer: string[]): Promise<boolean> => {
    let isCorrect = true;
    const correctAnswer = [
      "took",
      "didn't enjoy",
      "didn't disturb",
      "went",
      "didn't sleep",
      "didn't eat",
      "wasn't",
      "laughted",
      "flew",
      "didn't cost",
      "didn't have",
      "were"
    ];
    for (let i = 0; i < userAnswer.length; i++) {
      if (correctAnswer[i] != userAnswer[i]) {
        isCorrect = false;
        break;
      }
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(isCorrect);
      }, 1000);
    });
  }

  getWordForChain = async (prevWord?: ExerciseChainData): Promise<ExerciseChainData | null> => {
    // let word = "weather";
    // if (prevWord) {
    //   switch(prevWord.word[-1]) {
    //     case "o": {
    //       word = "orange";
    //       break;
    //     }
    //     case "h": {
    //       word = "rush";
    //       break;
    //     }
    //     case "e": {
    //       word = "energy";
    //       break;
    //     }
    //   }
    // }
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
