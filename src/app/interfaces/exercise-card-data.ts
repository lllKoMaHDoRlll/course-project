import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface ExerciseCardData {
  name: string;
  icon: IconDefinition;
  id: number;
}

export const exercisesMap = new Map<number, string>([
  [0, "sentences"],
  [1, "words"],
  [2, "listening"],
  [3, "gramar"],
  [4, "chain"]
]);
