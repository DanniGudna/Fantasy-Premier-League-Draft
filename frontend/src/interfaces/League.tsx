export interface ILeague {
  id: number;
  name: string;

}

export interface IDraftPlayer {
  teamName: string;
  id: number;
  fullName: string;
  firstName: string;
  initials: string;
  waiverPick: number; // currently not used, might not be check later todo
}

// export type DraftPlayerSubset = Pick<IDraftPlayer, 'entry_name' | 'id'> & { playerName: string }; // todo

export interface IDraftPlayersPerSeason {
  [season: string]: IDraftPlayer[];
}

export interface IDraftSeason {
  leagueId: number;
  leagueName: string;
  seasonName: string;
  currentSeason: boolean;
}

export interface IMatch {
  round: number;
  finished: boolean;
  team1Id: number;
  team1Points: number;
  team2Id: number;
  team2Points: number;
  started: boolean;
}

export interface IStanding {
  rankLastWeek: number;
  currentRank: number;
  playerId: number;
  matchesDrawn: number;
  matchesLost: number;
  matchesPlayed: number;
  matchesWon: number;
  matchPointsAgainst: number;
  matchPointsFor: number;
  leaguePoints: number;
  matchPointsDiff: number;
  averageMatchPoints: number;
  [key: string]: any; // allow access by string, used for sorting
}

export interface ILeagueTableDetails extends IStanding, Pick<
  IDraftPlayerStats,
  'wonByOnePoint' | 'lostByOnePoint' | 'wonWithThirdMostPoints' | 'lostWithSecondMostPoints'
> { }

export interface ILeagueDetails {
  league: ILeague;
  draftPlayers: IDraftPlayer[];
  matches: IMatch[];
  standings: IStanding[];
}

export interface ISeasonStatsMap {
  [id: string]: ISeasonStats;
}
export interface ISeasonStats {
  leagueId: number;
  leagueName: string;
  seasonName: string;
  draftPlayers: IDraftPlayer[];
  draftPlayerForms: IDraftPlayerStats[];
  standings: IStanding[];
  draftPlayerStandings: IDraftPlayerStanding[]; // used for charts
  matches: IMatch[];
  streaks: IStreakMap;
  matchScores: IScoreInfo[];
}

export type MatchResult = 'win' | 'loss' | 'draw';

export interface IMatchInfo {
  result: MatchResult;
  opponentId: number;
  playerPoints: number;
  opponentPoints: number;
  round: number;
  rankForThisGW: 1 | 2 | 3 | 4;
}

export interface IDraftPlayerStats {
  matchInfo: IMatchInfo[];
  playerId: number;
  playerName: string;
  teamName: string;
  wonByOnePoint: number;
  lostByOnePoint: number;
  wonWithThirdMostPoints: number;
  lostWithSecondMostPoints: number;

  // streaks: IStreakMap;
}

export type StreakTypes = 'win' | 'loss' | 'undefeated';
export interface IStreak {
  type: StreakTypes;
  length: number;
  playerId: number;
  playerName: string;
  teamName: string;
  streakStart: number;
  streakEnd: number;
}

export interface IStreakMap {
  winStreaks: IStreak[];
  undefeatedStreaks: IStreak[];
  lossStreaks: IStreak[];
}

export interface IScoreInfo {
  playerName: string;
  playerTeamName: string;
  playerId: number;
  points: number;
  round: number;
  opponentName: string;
  opponentTeamName: string;
  opponentId: number;
}

export interface IDraftPlayerWeeklyStanding {
  round: number;
  leaguePoints: number;
  points: number;
  rank: number;
}

export interface IDraftPlayerStanding {
  playerName: string;
  teamName: string;
  playerId: number;
  weeklyStandings: IDraftPlayerWeeklyStanding[];
}

export interface IGameWeekScores {
  round: number;
  score: number;
}
