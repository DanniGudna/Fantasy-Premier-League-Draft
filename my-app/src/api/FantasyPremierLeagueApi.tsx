/* eslint-disable no-console */
import { AxiosInstance } from 'axios';

import { ILeagueDetails } from '../interfaces/League';
import instance from './axios';

class FantasyPremierLeagueApi {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = instance;
  }

  async getLeagueTableDetails(leagueID: string): Promise<ILeagueDetails | null> {
    try {
      const { data: result } = await this.httpClient.get('api/data/' + leagueID);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default FantasyPremierLeagueApi;
