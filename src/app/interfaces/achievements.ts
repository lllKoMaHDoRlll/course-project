import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface AchievementProgress {
  id: number;
  name: string;
  icon: IconDefinition;
  completed: number;
  total: number;
}
