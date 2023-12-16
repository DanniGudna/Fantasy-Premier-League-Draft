import { IDraftPlayerStats, ILeagueTableDetails, IStanding } from './League';

const mapLeagueTableDetails = (standing: IStanding, draftPlayerStats?: IDraftPlayerStats): ILeagueTableDetails => ({
  rankLastWeek: standing.rankLastWeek,
  currentRank: standing.currentRank,
  playerId: standing.playerId,
  matchesDrawn: standing.matchesDrawn,
  matchesLost: standing.matchesLost,
  matchesPlayed: standing.matchesPlayed,
  matchesWon: standing.matchesWon,
  matchPointsAgainst: standing.matchPointsAgainst,
  matchPointsFor: standing.matchPointsFor,
  leaguePoints: standing.leaguePoints,
  matchPointsDiff: standing.matchPointsDiff,
  averageMatchPoints: standing.averageMatchPoints,
  wonByOnePoint: draftPlayerStats?.wonByOnePoint ?? -100, // find a better way then find to find correct draftPlayerStats so this isnt needed
  lostByOnePoint: draftPlayerStats?.lostByOnePoint ?? -100,
  wonWithThirdMostPoints: draftPlayerStats?.wonWithThirdMostPoints ?? -100,
  lostWithSecondMostPoints: draftPlayerStats?.lostWithSecondMostPoints ?? -100,
});

export default mapLeagueTableDetails;
