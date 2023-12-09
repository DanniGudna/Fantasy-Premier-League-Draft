/* eslint-disable no-console */
import { AxiosInstance } from 'axios';

import mapLeagueDetails from '../interfaces/Api/ApiMapper';
import { IChoice } from '../interfaces/Draft';
import { IFootballPlayerInfo } from '../interfaces/FootballPlayer';
import { ILeagueDetails } from '../interfaces/League';
import instance from './axios';

class FantasyPremierLeagueApi {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = instance;
  }

  // todo change names
  async getLeagueTableDetails(leagueId: string): Promise<ILeagueDetails | null> {
    try {
      const { data: result } = await this.httpClient.get(`api/data/${leagueId}`);
      return mapLeagueDetails(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getFPLPlayerData(): Promise<IFootballPlayerInfo[] | null> {
    try {
      const { data: result } = await this.httpClient.get('api/football-players');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getDraft(leagueId: string): Promise<IChoice[] | null> {
    try {
      const { data: result } = await this.httpClient.get(`api/draft/${leagueId}`);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // on hold
  /* async getTransactions(leagueID: string): Promise<IChoice[] | null> {
    try {
      const { data: result } = await this.httpClient.get(`api/draft/${leagueID}`);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  } */
}

export default FantasyPremierLeagueApi;
