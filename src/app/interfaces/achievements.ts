import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface AchievementProgress {
  id: number;
  name: string;
  icon: IconDefinition;
  completed: number;
  total: number;
}

export interface Achievement {
  id: number;
  type_id: number;
  name: string;
  description: string;
  is_completed: boolean;
  is_sbt_claimed: boolean;
}
