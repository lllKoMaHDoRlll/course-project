export interface ExerciseSentencesData {
  id: number;
  sentence: [number, string][];
  translation: string;
}

export interface ExerciseWordsData {
  id: number;
  words: string[];
  translations: string[]
}

export interface ExerciseListeningData {
  id: number;
  audioFilePath: string;
}

export interface ExerciseGramarData {
  id: number;
  taskDescription: string;
  taskList: [string, string][];
}

export interface ExerciseChainData {
  type: "input" | "output" | "placeholder";
  isPlaceHolder?: true;
  word: string;
}

export type AnswerStatus = "correct"   |
                           "incorrect" |
                           "checking"  |
                           "not-answered";
