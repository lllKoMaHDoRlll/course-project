import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const RETRIES_AMOUNT = 4;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  axios;
  constructor() {
    this.axios = axios.create({timeout: 5000});
  }

  async get(url: string, params?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any, any> | undefined> {
    let retries_count = 0;
    while (retries_count < RETRIES_AMOUNT) {
      try {
        return await this.axios.get(url, params);
      } catch (e) {
        retries_count++;
        if (retries_count == RETRIES_AMOUNT) throw e;
      }
    }
    return;
  }

  async post(url: string, data?: any, params?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any, any> | undefined> {
    let retries_count = 0;
    while (retries_count < RETRIES_AMOUNT) {
      try {
        return await this.axios.post(url, data, params);
      } catch (e) {
        retries_count++;
        if (retries_count == RETRIES_AMOUNT) {
          throw e;
        }
      }
    }
    return;
  }
}
