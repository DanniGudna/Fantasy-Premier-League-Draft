export interface ILeague {
  admin_entry: number;
  closed: boolean;
  draft_dt: string;
  draft_pick_time_limit: number;
  draft_status: string;
  draft_tz_show: string;
  id: number;
  ko_rounds: number;
  make_code_public: boolean;
  max_entries: number;
  min_entries: number;
  name: string;
  scoring: string;
  start_event: number;
  stop_event: number;
  trades: string;
  transaction_mode: string;
  variety: string;
}

export interface IPlayer {
  entry_id: number;
  entry_name: string;
  id: number;
  joined_time: string;
  player_first_name: string;
  player_last_name: string;
  short_name: string;
  waiver_pick: number;
}

export interface IMatch {
  event: number;
  finished: boolean;
  league_entry_1: number;
  league_entry_1_points: number;
  league_entry_2: number;
  league_entry_2_points: number;
  started: boolean;
  // winning_league_entry: number | null;
  // winning_method: string | null;
}

export interface IStanding {
  last_rank: number;
  league_entry: number;
  matches_drawn: number;
  matches_lost: number;
  matches_played: number;
  matches_won: number;
  points_against: number;
  points_for: number;
  rank: number;
  rank_sort: number;
  total: number;
  points_diff: number;
  event_total: number;
  [key: string]: any; // allow access by string
}

export interface ILeagueDetails {
  league: ILeague;
  league_entries: IPlayer[];
  matches?: IMatch[];
  standings: IStanding[];
  playerForms?: IPlayerForm[];
}

export type MatchResult = 'win' | 'loss' | 'draw';

export interface IMatchInfo {
  result: MatchResult;
  opponentID: number;
  playerPoints: number;
  opponentPoints: number;
  event: number; // event is equal to gameweak in the FPL api so ill use the same name
}

export interface IPlayerForm {
  matchInfo: IMatchInfo[];
  playerID: number;
  playerName: string;
  teamName: string;
}

export type StreakTypes = 'win' | 'loss' | 'undefeated';
export interface IStreak {
  type: StreakTypes;
  length: number;
  playerID: number;
  playerName: string;
  teamName: string;
  streakStart: number;
  streakEnd: number;
}

export interface IScoreInfo {
  playerName: string;
  playerTeamName: string;
  playerID: number;
  points: number;
  event: number;
  opponentName: string;
  opponentTeamName: string;
  opponentID: number;
}

export interface IPlayerWeeklyStanding {
  event: number;
  leaguePoints: number;
  points: number;
  rank: number;
}

export interface IPlayerStanding {
  playerName: string;
  teamName: string;
  playerID: number;
  weeklyStandings: IPlayerWeeklyStanding[];
}

export interface IGameWeekScores {
  event: number;
  score: number;
}
