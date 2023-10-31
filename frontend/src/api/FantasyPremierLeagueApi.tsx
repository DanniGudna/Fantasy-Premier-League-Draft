/* eslint-disable no-console */
import { AxiosInstance } from 'axios';

import { IFootballPlayerInfo } from '../interfaces/FootballPlayer';
import { ILeagueDetails } from '../interfaces/League';
import instance from './axios';

class FantasyPremierLeagueApi {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = instance;
  }

  // todo change names
  async getLeagueTableDetails(leagueID: string): Promise<ILeagueDetails | null> {
    try {
      const { data: result } = await this.httpClient.get(`api/data/${leagueID}`);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getFPLPlayerData(): Promise<IFootballPlayerInfo[] | null> {
    try {
      const { data: result } = await this.httpClient.get('api/bootstrap-static');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default FantasyPremierLeagueApi;
