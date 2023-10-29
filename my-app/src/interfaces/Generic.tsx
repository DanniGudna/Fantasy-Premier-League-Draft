import { ILeagueDetails, IMatch, IPlayer, IPlayerForm, IPlayerStanding, IStanding } from './League';

export type TextFieldType = 'email' | 'text' | 'tel' | 'number';

export type LeagueMovementDirections = 'up' | 'down' | 'noChange';

export type ChevronDirection = 'up' | 'down';

export interface IUserContext {
  leagueID: string;
  leagueName: string;
  leagueDetails: ILeagueDetails;
  players: IPlayer[];
  standings: IStanding[];
  playerForms: IPlayerForm[];
  matches: IMatch[];
  playerStandings: IPlayerStanding[];
  setLeagueID: React.Dispatch<React.SetStateAction<string>>
  setLeagueName: React.Dispatch<React.SetStateAction<string>>
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
  setStandings: React.Dispatch<React.SetStateAction<IStanding[]>>
  setPlayerForms: React.Dispatch<React.SetStateAction<IPlayerForm[]>>
  setMatches: React.Dispatch<React.SetStateAction<IMatch[]>>
  setPlayerStandings: React.Dispatch<React.SetStateAction<IPlayerStanding[]>>

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
