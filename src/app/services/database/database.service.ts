import { Injectable } from '@angular/core';
import axios from "axios";

const DB_HOST = "https://tonolingo.ru";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

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
  }
}
