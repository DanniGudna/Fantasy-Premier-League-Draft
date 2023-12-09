import { IAllChartData, IChartData } from '../interfaces/Generic';
import { IDraftPlayer, IDraftPlayerForm, IDraftPlayerStanding, IDraftPlayerWeeklyStanding, IGameWeekScores, IMatch, IMatchInfo, IScoreInfo, IStreak, MatchResult } from '../interfaces/League';

/**
 * Gets the matchinfo for the draftPlayer in the provided match
 * @param draftPlayerId the id of the draft player
 * @param match the match, from FPL api
 * @returns The matchInfo for the given match relating to the draftPlayer
 */
function getMatchInfo(draftPlayerId: number, match: IMatch): IMatchInfo | null {
  if (!match.finished) {
    return null;
  }
  const matchInfo = {} as IMatchInfo;
  matchInfo.round = match.round;

  // check first if it is a draw
  if (match.team1Points === match.team2Points) {
    matchInfo.result = 'draw';
    // same points for both players
    matchInfo.opponentPoints = match.team1Points;
    matchInfo.playerPoints = match.team1Points;
    matchInfo.opponentId = match.team1Id === draftPlayerId ? match.team2Id : match.team1Id;
    return matchInfo;
  }
  // entry 1 win
  if (match.team1Points > match.team2Points) {
    // entry 1 win, if that is the player id return a win
    if (match.team1Id === draftPlayerId) {
      // 1 is player, 2 is opponent
      matchInfo.result = 'win';
      matchInfo.opponentPoints = match.team2Points;
      matchInfo.playerPoints = match.team1Points;
      matchInfo.opponentId = match.team2Id;
      return matchInfo;
    }

    // 1 is opponent, 2 is player
    matchInfo.result = 'loss';
    matchInfo.opponentPoints = match.team1Points;
    matchInfo.playerPoints = match.team2Points;
    matchInfo.opponentId = match.team1Id;
    return matchInfo;
  }
  // else entry 2 won, we dont have to do a if check here since entry2 winning entry1 is the only remaining possibility
  // entry 2 win, if that is the player id return a win
  if (match.team1Id === draftPlayerId) {
    // 1 is player, 2 is opponent
    matchInfo.result = 'loss';
    matchInfo.opponentPoints = match.team2Points;
    matchInfo.playerPoints = match.team1Points;
    matchInfo.opponentId = match.team2Id;
    return matchInfo;
  }
  // else return a loss
  // 2 is player, 1 is opponent
  matchInfo.result = 'win';
  matchInfo.opponentPoints = match.team1Points;
  matchInfo.playerPoints = match.team2Points;
  matchInfo.opponentId = match.team1Id;
  return matchInfo;
}

/**
 * Gets the result of all the matches the draftPlayer has played
 * @param draftPlayer the draftPLayer id
 * @param matches All matches from the FPL api
 * @returns The form of the draftPlayer, i.e it contains the results of all the matches he has played
 */
export function getPlayerForm(draftPlayer: IDraftPlayer, matches: IMatch[]): IDraftPlayerForm {
  // filter out the matches that the pllayer didnt play in
  const filteredMatches = matches.filter((match) => (
    match.team1Id === draftPlayer.id || match.team2Id === draftPlayer.id) && match.finished);
  const playerForm = {} as IDraftPlayerForm;
  playerForm.playerId = draftPlayer.id;
  playerForm.playerName = draftPlayer.fullName;
  playerForm.teamName = draftPlayer.teamName;
  playerForm.matchInfo = [];
  filteredMatches.forEach((filteredMatch) => {
    // only add results for matches that have been played
    const matchInfo = getMatchInfo(draftPlayer.id, filteredMatch);
    if (matchInfo) {
      playerForm.matchInfo.push(matchInfo);
    }
  });

  return playerForm;
}

/**
 * Get the draftPlyaer with the given Id
 * @param Id id for the draftPlayer
 * @param draftPlayers all draftPlayers from the FPL api
 * @returns The draftPLayer with the given Id
 */
export function getPlayerById(Id: number, draftPlayers: IDraftPlayer[]): IDraftPlayer | undefined {
  return draftPlayers.find((draftPlayer) => draftPlayer.id === Id);
}

// todo combine these functions
function getPlayerNameByIdFromPlayerForms(Id: number, players: IDraftPlayerForm[]): string {
  const playerInfo = players.find((player) => player.playerId === Id);
  if (playerInfo) {
    return playerInfo.playerName;
  }
  return 'name not found';
}

function getPlayerTeamNameByIdFromPlayerForms(Id: number, players: IDraftPlayerForm[]): string {
  const playerInfo = players.find((player) => player.playerId === Id);
  if (playerInfo) {
    return playerInfo.teamName;
  }
  return 'name not found';
}

function getStreakEnd(numberOfFinishedGW: number, currentGW: number, matchingResult: boolean): number {
  return currentGW === numberOfFinishedGW && matchingResult ? currentGW : currentGW - 1;
}

export function getAllStreaks(playerForms: IDraftPlayerForm[]) {
  const winStreaks: IStreak[] = [];
  const undefeatedStreaks: IStreak[] = [];
  const lossStreaks: IStreak[] = [];

  // const pf = [playerForms[2]]; // used if you want to test only one

  playerForms.forEach((playerForm) => {
    let winStreak = 0;
    let lossStreak = 0;
    let undefeatedStreak = 0;
    let streakStart = 1;
    let undefeatedStreakStart = 1; // we need a seperate one for undefeated since draw stops the other streaks but not undefeated
    let lastResult: MatchResult | undefined;
    playerForm.matchInfo.forEach((match) => {
      /*       // skip matchweek 7
      if (match.event !== 7) { */ // TODO FIX
      if (match.result === 'win') {
        winStreak++;
        undefeatedStreak++;
      } else if (match.result === 'loss') {
        lossStreak++;
      } else {
        undefeatedStreak++;
      }

      // Add to streaks if it is longer than 1 and the streak has ended, or ongoing and reach the final match
      if (lastResult !== match.result || match.round === playerForm.matchInfo.length) {
        // win streak ends
        if (lastResult === 'win') {
          // if current streak is bigger than 1 then add it to the streak array
          if (winStreak > 1) {
            winStreaks.push({
              type: 'win',
              length: winStreak,
              playerId: playerForm.playerId,
              playerName: playerForm.playerName,
              teamName: playerForm.teamName,
              streakStart,
              streakEnd: getStreakEnd(playerForm.matchInfo.length, match.round, lastResult === match.result),
            });
          }
          // reset the streak counter
          winStreak = 0;
        }
        else if (lastResult === 'loss') {
          // if current streak is bigger than 1 then add it to the streak array
          if (lossStreak > 1) {
            lossStreaks.push({
              type: 'loss',
              length: lossStreak,
              playerId: playerForm.playerId,
              playerName: playerForm.playerName,
              teamName: playerForm.teamName,
              streakStart,
              streakEnd: getStreakEnd(playerForm.matchInfo.length, match.round, lastResult === match.result),
            });
          }
          // reset the streak counter
          lossStreak = 0;
        }
        lastResult = match.result;
        streakStart = match.round;
      }
      // undefeated streak only ends if result is loss, also check if it is the last game
      if (match.result === 'loss' || match.round === playerForm.matchInfo.length) {
        // if current streak is bigger than 1 then add it to the streak array
        if (undefeatedStreak > 1) {
          undefeatedStreaks.push({
            type: 'undefeated',
            length: undefeatedStreak,
            playerId: playerForm.playerId,
            playerName: playerForm.playerName,
            teamName: playerForm.teamName,
            streakStart: undefeatedStreakStart,
            streakEnd: getStreakEnd(playerForm.matchInfo.length, match.round, match.result !== 'loss'),
          });
        }
        // reset the streak
        undefeatedStreak = 0;
        undefeatedStreakStart = match.round + 1;
      }
      /*       } */
    });
  });

  // Sort streaks by length in descending order
  winStreaks.sort((a, b) => b.length - a.length);
  lossStreaks.sort((a, b) => b.length - a.length);
  undefeatedStreaks.sort((a, b) => b.length - a.length);

  return {
    winStreaks,
    lossStreaks,
    undefeatedStreaks,
  };
}

export function getMatchScores(playerForms: IDraftPlayerForm[]) {
  const scores: IScoreInfo[] = [];

  playerForms.forEach((playerForm) => {
    playerForm.matchInfo.forEach((matchInfo) => {
      // in week 7 no games were played and all players got 0 points, removing that gameweek gives better results
      // NOTE this should only be for league 22/23
      /*  if (matchInfo.event !== 7) { */
      scores.push({
        playerName: playerForm.playerName,
        playerTeamName: playerForm.teamName,
        playerId: playerForm.playerId,
        points: matchInfo.playerPoints,
        round: matchInfo.round,
        opponentName: getPlayerNameByIdFromPlayerForms(matchInfo.opponentId, playerForms),
        opponentTeamName: getPlayerTeamNameByIdFromPlayerForms(matchInfo.opponentId, playerForms),
        opponentId: matchInfo.opponentId,
      });
      /*  } */
    });
  });

  // sort scores
  scores.sort((a, b) => b.points - a.points);

  return scores;
}

export function getPlayerStandings(playerForm: IDraftPlayerForm) {
  const playerStandings = {
    playerName: playerForm.playerName,
    teamName: playerForm.teamName,
    playerId: playerForm.playerId,
  } as IDraftPlayerStanding;
  const weeklyStandings = [] as IDraftPlayerWeeklyStanding[];
  const pointIndicator = { win: 3, draw: 1, loss: 0 };

  let currentLeaguePoints = 0;
  let currentPoints = 0;

  playerForm.matchInfo.forEach((match) => {
    currentPoints += match.playerPoints;
    currentLeaguePoints += pointIndicator[match.result];
    weeklyStandings.push({
      round: match.round,
      leaguePoints: currentLeaguePoints,
      points: currentPoints,
    } as IDraftPlayerWeeklyStanding);
  });

  playerStandings.weeklyStandings = weeklyStandings;

  return playerStandings;
}

export function addRankToPlayerStandings(playerStandings: IDraftPlayerStanding[]) {
  for (let i = 0; i < playerStandings[0].weeklyStandings.length; i++) {
    const infoForCurrentWeek = [];
    for (let j = 0; j < playerStandings.length; j++) {
      // get all standings info from all players for the currentWeak
      infoForCurrentWeek.push({ player: playerStandings[j], weeklyStanding: playerStandings[j].weeklyStandings[i] });
    }
    // sore the currenWeek info by leaguepoints
    infoForCurrentWeek.sort((a, b) => {
      if (a.weeklyStanding.leaguePoints !== b.weeklyStanding.leaguePoints) {
        return b.weeklyStanding.leaguePoints - a.weeklyStanding.leaguePoints;
      }
      // if there is a tie we break the tiebreak with the points
      return b.weeklyStanding.points - a.weeklyStanding.points;
    });

    // finally loop through the sorted array
    let rank = 1;
    infoForCurrentWeek.forEach((info) => {
      info.player.weeklyStandings[i].rank = rank;
      rank++;
    });
  }
}

export function createChartData(playerStandings: IDraftPlayerStanding[]): IAllChartData {
  addRankToPlayerStandings(playerStandings);
  const labels = [];
  // add numbers to labels equal to the length of weeklyStandings
  for (let i = 0; i < playerStandings[0].weeklyStandings.length; i++) {
    labels.push('GW ' + (i + 1));
  }
  const leaguePointsData = { labels, datasets: [] } as IChartData;
  const pointsData = { labels, datasets: [] } as IChartData;
  const rankData = { labels, datasets: [] } as IChartData;

  // here we have 6 colors that will be used for the line.
  const colors = [
    'rgb(255, 99, 132)', // red
    'rgb(54, 162, 235)', // blue
    'rgb(255, 206, 86)', // yeallow
    'rgb(75, 192, 192)', // green
    'rgb(153, 102, 255)', // purple
    'rgb(255, 159, 64)', // orange
  ];

  // add a dataset for each player
  playerStandings.forEach((playerStanding, i) => {
    const leaguePointsDataForPlayer = [] as number[];
    const pointsDataForPlayer = [] as number[];
    const rankDataForPlayer = [] as number[];
    const color = colors[i % colors.length];
    // teh dataset should include data from weeklyStanding for each week that has been played so far
    playerStanding.weeklyStandings.forEach((weeklyStanding) => {
      leaguePointsDataForPlayer.push(weeklyStanding.leaguePoints);
      pointsDataForPlayer.push(weeklyStanding.points);
      rankDataForPlayer.push(weeklyStanding.rank); // todo
    });
    const leaguePointsDataset = {
      label: playerStanding.teamName,
      data: leaguePointsDataForPlayer,
      fill: false,
      borderColor: color,
      tension: 0.0,
    };
    const pointsDataset = {
      label: playerStanding.teamName,
      data: pointsDataForPlayer,
      fill: false,
      borderColor: color,
      tension: 0.2,
    };
    const rankDataset = {
      label: playerStanding.teamName,
      data: rankDataForPlayer,
      fill: false,
      borderColor: color,
      tension: 0.0,
    };
    leaguePointsData.datasets.push(leaguePointsDataset);
    pointsData.datasets.push(pointsDataset);
    rankData.datasets.push(rankDataset);
  });

  return {
    leaguePointsData,
    pointsData,
    rankData,
  };
}

// todo do this better
export function getHighestScoringGameWeeks(matches: IMatch[]) {
  // filter out the matches that havent been played yet
  const filteredMatches = matches.filter((match) => (match.finished));
  let currentRound = 1;
  let currentScore = 0;
  const gameWeekScores = [] as IGameWeekScores[];

  filteredMatches.forEach((match) => {
    // if the event matches the current event then add to the score
    if (match.round === currentRound) {
      currentScore += match.team1Points + match.team2Points;
    }
    // else add to the gameWeekScores array, increment currenEvent,reset the score and finally start calculating the scores again
    else {
      gameWeekScores.push({ round: currentRound, score: currentScore });
      currentRound += 1;
      currentScore = 0;
      currentScore += match.team1Points + match.team2Points;
    }
  });

  // sort the game week scores in descending order based on their scores
  gameWeekScores.sort((a, b) => b.score - a.score);

  return gameWeekScores;
}
