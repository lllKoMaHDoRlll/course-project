export interface ExerciseSentencesData {
  id: number;
  sentence: [number, string][];
  translation: string;
}

export interface ExerciseWordsData {
  id: number;
  words: [number, string, string][];
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

export type AnswerStatus = "correct"   |
                           "incorrect" |
                           "checking"  |
                           "not-answered";
