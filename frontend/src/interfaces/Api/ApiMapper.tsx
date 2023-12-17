import { IDraftPlayer, ILeague, ILeagueDetails, IMatch, IStanding } from '../League';
import { APIDraftPlayer, APILeague, APILeagueDetails, APIMatch, APIStanding } from './Api';

const mapDraftPlayer = (draftPlayer: APIDraftPlayer): IDraftPlayer => ({
  id: draftPlayer.id,
  fullName: draftPlayer.player_first_name + ' ' + draftPlayer.player_last_name,
  initials: draftPlayer.short_name,
  firstName: draftPlayer.player_first_name.split(' ')[0], // dont display middle names
  waiverPick: draftPlayer.waiver_pick,
  teamName: draftPlayer.entry_name,
});
// todo maybe add the names here in the mapping
const mapMatch = (match: APIMatch): IMatch => ({
  round: match.event,
  finished: match.finished,
  team1Id: match.league_entry_1,
  team1Points: match.league_entry_1_points,
  team2Id: match.league_entry_2,
  team2Points: match.league_entry_2_points,
  started: match.started,
});

const mapStanding = (standing: APIStanding): IStanding => ({
  rankLastWeek: standing.last_rank,
  currentRank: standing.rank,
  playerId: standing.league_entry,
  matchesDrawn: standing.matches_drawn,
  matchesLost: standing.matches_lost,
  matchesPlayed: standing.matches_played,
  matchesWon: standing.matches_won,
  matchPointsAgainst: standing.points_against,
  matchPointsFor: standing.points_for,
  leaguePoints: standing.total,
  matchPointsDiff: standing.points_for - standing.points_against,
  averageMatchPoints: Math.round(standing.points_for / (standing.matches_drawn + standing.matches_lost + standing.matches_won)),
});

const mapLeague = (league: APILeague): ILeague => ({
  id: league.id,
  name: league.name,
});

const mapLeagueDetails = (leagueDetails: APILeagueDetails): ILeagueDetails => ({
  league: mapLeague(leagueDetails.league),
  draftPlayers: leagueDetails.league_entries.map((leagueEntry) => mapDraftPlayer(leagueEntry)),
  matches: leagueDetails.matches.map((match) => mapMatch(match)),
  standings: leagueDetails.standings.map((standing) => mapStanding(standing)),
});

export default mapLeagueDetails;
