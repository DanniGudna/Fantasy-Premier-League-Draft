import { IFootballPlayerInfo } from './FootballPlayer';
import { IDraftPlayer, IDraftPlayerForm, IDraftPlayerStanding, ILeagueDetails, IMatch, IStanding } from './League';

export type TextFieldType = 'email' | 'text' | 'tel' | 'number';

export type LeagueMovementDirections = 'up' | 'down' | 'noChange';

export type ChevronDirection = 'up' | 'down';

export interface IUserContext {
  leagueID: string;
  leagueName: string;
  leagueDetails: ILeagueDetails;
  draftPlayers: IDraftPlayer[];
  footballPlayers: IFootballPlayerInfo[];
  standings: IStanding[];
  draftPlayerForms: IDraftPlayerForm[];
  matches: IMatch[];
  draftPlayerStandings: IDraftPlayerStanding[];
  setLeagueID: React.Dispatch<React.SetStateAction<string>>
  setLeagueName: React.Dispatch<React.SetStateAction<string>>
  setDraftPlayers: React.Dispatch<React.SetStateAction<IDraftPlayer[]>>
  setFootballPlayers: React.Dispatch<React.SetStateAction<IFootballPlayerInfo[]>>
  setStandings: React.Dispatch<React.SetStateAction<IStanding[]>>
  setDraftPlayerForms: React.Dispatch<React.SetStateAction<IDraftPlayerForm[]>>
  setMatches: React.Dispatch<React.SetStateAction<IMatch[]>>
  setDraftPlayerStandings: React.Dispatch<React.SetStateAction<IDraftPlayerStanding[]>>

}

export interface IDataset {
  label: string,
  data: number[],
  fill: boolean,
  borderColor: string,
  tension: number
}

export interface IChartData {
  labels: string[],
  datasets: IDataset[],
}

export interface IAllChartData {
  leaguePointsData: IChartData;
  pointsData: IChartData;
  rankData: IChartData;
}

// export default TextFieldType;
