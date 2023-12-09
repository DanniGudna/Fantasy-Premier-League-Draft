import { IFootballPlayerInfo } from './FootballPlayer';
import { IDraftPlayer, IDraftPlayerForm, IDraftPlayerStanding, IMatch, ISeasonStats, IStanding } from './League';

export type TextFieldType = 'email' | 'text' | 'tel' | 'number';

export type LeagueMovementDirections = 'up' | 'down' | 'noChange';

export type ChevronDirection = 'up' | 'down';

// export type PageType = 'leagueTable' | 'stats' | 'charts' | 'draft' | 'transactions'; // TODO confirm this is correct
// todo cleanup these types and add it to static objects
export enum PageType {
  LeagueTable = 'leagueTable',
  Stats = 'stats',
  Charts = 'charts',
  Draft = 'draft',
  Transactions = 'transactions',
  Form = 'form'
  // tbd
}

export const PageTypeNames: Record<PageType, string> = {
  [PageType.LeagueTable]: 'Tables',
  [PageType.Stats]: 'Stat Page',
  [PageType.Charts]: 'Charts',
  [PageType.Draft]: 'Draft Page',
  [PageType.Transactions]: 'Transaction Page',
  [PageType.Form]: 'Form Page',
};

/* export interface ILeagueContext {
  leagueId: number | null;
  leagueName: string;
  // leagueDetails: ILeagueDetails;
  draftPlayers: IDraftPlayer[];
  footballPlayers: IFootballPlayerInfo[];
  standings: IStanding[];
  draftPlayerForms: IDraftPlayerForm[];
  matches: IMatch[];
  draftPlayerStandings: IDraftPlayerStanding[];
  setLeagueId: React.Dispatch<React.SetStateAction<number | null>>
  setLeagueName: React.Dispatch<React.SetStateAction<string>>
  setDraftPlayers: React.Dispatch<React.SetStateAction<IDraftPlayer[]>>
  setFootballPlayers: React.Dispatch<React.SetStateAction<IFootballPlayerInfo[]>>
  setStandings: React.Dispatch<React.SetStateAction<IStanding[]>>
  setDraftPlayerForms: React.Dispatch<React.SetStateAction<IDraftPlayerForm[]>>
  setMatches: React.Dispatch<React.SetStateAction<IMatch[]>>
  setDraftPlayerStandings: React.Dispatch<React.SetStateAction<IDraftPlayerStanding[]>>
} */

export interface ILeagueContext {
  selectedSeason: ISeasonStats;
  setSelectedSeason: React.Dispatch<React.SetStateAction<ISeasonStats>>
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
