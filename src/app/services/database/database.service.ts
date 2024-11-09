import { Injectable } from '@angular/core';
import axios from "axios";
import { AchievementProgress, Achievement } from '../../interfaces/achievements';
import { TelegramService } from '../telegram.service';

// const DB_HOST = "https://tonolingo.ru";
const DB_HOST = "https://k12n97jx-8000.euw.devtunnels.ms" // testing purposes

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  profilePicture: Promise<string> | null = null;
  achievementsTypesProgresses: Promise<AchievementProgress[]> | [] = [];
  constructor(private telegram: TelegramService) { }

  async init() {
    this.profilePicture = this.getUserProfilePicture(this.telegram.getUserTGId()!);
    this.achievementsTypesProgresses = this.getAchievementsTypesProgresses(this.telegram.getUserTGId()!);
    this.updateVisitStatus(this.telegram.getUserTGId()!);
  }

  getUserProfilePicture = async (userId: number): Promise<string> => {
    const result = await axios.get(`${DB_HOST}/api/telegram/profile_photo?user_id=${userId}`, {
      responseType: "blob"
    });
    console.log(result);
    const href = URL.createObjectURL(result.data);
    return href;
  }

  createOrUpdateUser = async (userId: number, wallet: string | null = null) => {
    const result = await axios.post(`${DB_HOST}/api/users`, {
      user_id: userId,
      wallet: wallet
    });
  }

  updateVisitStatus = async (userId: number) => {
    const result = await axios.post(`${DB_HOST}/api/achievements/visits?user_id=${userId}`);
    if (result.data.completed_achievements) {
      this.telegram.showAchievementsClaimPopup(result.data.completed_achievements);
      this.setAchievementsTypesProgresses(userId);
    }
  }

  getAchievementsTypesProgresses = async (userId: number): Promise<AchievementProgress[]> => {
    const result = await axios.get(`${DB_HOST}/api/achievements/types?user_id=${userId}`);
    return result.data.result as AchievementProgress[];
  }

  setAchievementsTypesProgresses = async (userId: number) => {
    this.achievementsTypesProgresses = this.getAchievementsTypesProgresses(userId);
  }

  getAchievements = async (userId: number, achievementTypeId: number): Promise<Achievement[]> => {
    const result = await axios.get(`${DB_HOST}/api/achievements`, {
      params: {
        "user_id": userId,
        "type_id": achievementTypeId
      }
    });
    return result.data.result as Achievement[];
  }

  claimSBT = async (userId: number, achievementId: number): Promise<string> => {
    const result = await axios.post(
      `${DB_HOST}/api/achievements/sbt`,
      null,
      {
        params: {user_id: userId, achievement_id: achievementId}
      }
    );
    console.log(result.data);
    return result.data.result;
  }
}
