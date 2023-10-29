import { IAllChartData, IChartData } from '../interfaces/Generic';
import { IGameWeekScores, IMatch, IMatchInfo, IPlayer, IPlayerForm, IPlayerStanding, IPlayerWeeklyStanding, IScoreInfo, IStreak, MatchResult } from '../interfaces/League';

function getMatchInfo(playerId: number, match: IMatch): IMatchInfo | null {
  if (match.finished) {
    const matchInfo = {} as IMatchInfo;
    matchInfo.event = match.event;

    // check first if it is a draw
    if (match.league_entry_1_points === match.league_entry_2_points) {
      matchInfo.result = 'draw';
      // same points for both players
      matchInfo.opponentPoints = match.league_entry_1_points;
      matchInfo.playerPoints = match.league_entry_1_points;
      matchInfo.opponentID = match.league_entry_1 === playerId ? match.league_entry_2 : match.league_entry_1;
      return matchInfo;
    }
    // entry 1 win
    if (match.league_entry_1_points > match.league_entry_2_points) {
      // entry 1 win, if that is the player id return a win
      if (match.league_entry_1 === playerId) {
        // 1 is player, 2 is opponent
        matchInfo.result = 'win';
        matchInfo.opponentPoints = match.league_entry_2_points;
        matchInfo.playerPoints = match.league_entry_1_points;
        matchInfo.opponentID = match.league_entry_2;
        return matchInfo;
      }

      // 1 is opponent, 2 is player
      matchInfo.result = 'loss';
      matchInfo.opponentPoints = match.league_entry_1_points;
      matchInfo.playerPoints = match.league_entry_2_points;
      matchInfo.opponentID = match.league_entry_1;
      return matchInfo;
    }
    // else entry 2 won, we dont have to do a if check here since entry2 winning entry1 is the only remaining possibility
    // entry 2 win, if that is the player id return a win
    if (match.league_entry_1 === playerId) {
      // 1 is player, 2 is opponent
      matchInfo.result = 'loss';
      matchInfo.opponentPoints = match.league_entry_2_points;
      matchInfo.playerPoints = match.league_entry_1_points;
      matchInfo.opponentID = match.league_entry_2;
      return matchInfo;
    }
    // else return a loss
    // 2 is player, 1 is opponent
    matchInfo.result = 'win';
    matchInfo.opponentPoints = match.league_entry_1_points;
    matchInfo.playerPoints = match.league_entry_2_points;
    matchInfo.opponentID = match.league_entry_1;
    return matchInfo;
  }
  return null;
}

export function getPlayerForm(player: IPlayer, matches: IMatch[]): IPlayerForm {
  // filter out the matches that the pllayer didnt play in
  const filteredMatches = matches.filter((match) => (
    match.league_entry_1 === player.id || match.league_entry_2 === player.id) && match.finished);
  const playerForm = {} as IPlayerForm;
  playerForm.playerID = player.id;
  playerForm.playerName = player.player_first_name + ' ' + player.player_last_name;
  playerForm.teamName = player.entry_name;
  playerForm.matchInfo = [];
  filteredMatches.forEach((filteredMatch) => {
    // only add results for matches that have been played
    const matchInfo = getMatchInfo(player.id, filteredMatch);
    if (matchInfo) {
      playerForm.matchInfo.push(matchInfo);
    }
  });

  return playerForm;
}

export function getPlayerById(ID: number, players: IPlayer[]): IPlayer | undefined {
  return players.find((player) => player.id === ID);
}

// todo combine these functions
function getPlayerNameByIdFromPlayerForms(ID: number, players: IPlayerForm[]): string {
  const playerInfo = players.find((player) => player.playerID === ID);
  if (playerInfo) {
    return playerInfo.playerName;
  }
  return 'name not found';
}

function getPlayerTeamNameByIdFromPlayerForms(ID: number, players: IPlayerForm[]): string {
  const playerInfo = players.find((player) => player.playerID === ID);
  if (playerInfo) {
    return playerInfo.teamName;
  }
  return 'name not found';
}

function getStreakEnd(numberOfFinishedGW: number, currentGW: number, matchingResult: boolean): number {
  return currentGW === numberOfFinishedGW && matchingResult ? currentGW : currentGW - 1;
}

export function getAllStreaks(playerForms: IPlayerForm[]) {
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
      /*       console.log('event', match.event);
      console.log('result', match.result);
      console.log('win', winStreak);
      console.log('undef', undefeatedStreak);
      console.log('loss', lossStreak); */
      /*       // skip matchweek 7
      if (match.event !== 7) { */
      if (match.result === 'win') {
        winStreak++;
        undefeatedStreak++;
      } else if (match.result === 'loss') {
        lossStreak++;
      } else {
        undefeatedStreak++;
      }

      // Add to streaks if a streak has ended and only if it is longer than 1
      if (lastResult !== match.result || match.event === playerForm.matchInfo.length) {
        // win streak ends
        if (lastResult === 'win') {
          // if current streak is bigger than 1 then add it to the streak array
          if (winStreak > 1) {
            winStreaks.push({
              type: 'win',
              length: winStreak,
              playerID: playerForm.playerID,
              playerName: playerForm.playerName,
              teamName: playerForm.teamName,
              streakStart,
              streakEnd: getStreakEnd(playerForm.matchInfo.length, match.event, lastResult === match.result),
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
              playerID: playerForm.playerID,
              playerName: playerForm.playerName,
              teamName: playerForm.teamName,
              streakStart,
              streakEnd: getStreakEnd(playerForm.matchInfo.length, match.event, lastResult === match.result),
            });
          }
          // reset the streak counter
          lossStreak = 0;
        }
        lastResult = match.result;
        streakStart = match.event;
      }
      // undefeated streak only ends if result is loss, also check if it is the last game
      if (match.result === 'loss' || match.event === playerForm.matchInfo.length) {
        // if current streak is bigger than 1 then add it to the streak array
        if (undefeatedStreak > 1) {
          undefeatedStreaks.push({
            type: 'undefeated',
            length: undefeatedStreak,
            playerID: playerForm.playerID,
            playerName: playerForm.playerName,
            teamName: playerForm.teamName,
            streakStart: undefeatedStreakStart,
            streakEnd: getStreakEnd(playerForm.matchInfo.length, match.event, match.result !== 'loss'),
          });
        }
        // reset the streak
        undefeatedStreak = 0;
        undefeatedStreakStart = match.event + 1;
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

export function getMatchScores(playerForms: IPlayerForm[]) {
  const scores: IScoreInfo[] = [];

  playerForms.forEach((playerForm) => {
    playerForm.matchInfo.forEach((matchInfo) => {
      // in week 7 no games were played and all players got 0 points, removing that gameweek gives better results
      // NOTE this should only be for league 22/23
      /*  if (matchInfo.event !== 7) { */
      scores.push({
        playerName: playerForm.playerName,
        playerTeamName: playerForm.teamName,
        playerID: playerForm.playerID,
        points: matchInfo.playerPoints,
        event: matchInfo.event,
        opponentName: getPlayerNameByIdFromPlayerForms(matchInfo.opponentID, playerForms),
        opponentTeamName: getPlayerTeamNameByIdFromPlayerForms(matchInfo.opponentID, playerForms),
        opponentID: matchInfo.opponentID,
      });
      /*  } */
    });
  });

  // sort scores
  scores.sort((a, b) => b.points - a.points);

  return scores;
}

export function getPlayerStandings(playerForm: IPlayerForm) {
  const playerStandings = {
    playerName: playerForm.playerName,
    teamName: playerForm.teamName,
    playerID: playerForm.playerID,
  } as IPlayerStanding;
  const weeklyStandings = [] as IPlayerWeeklyStanding[];
  const pointIndicator = { win: 3, draw: 1, loss: 0 };

  let currentLeaguePoints = 0;
  let currentPoints = 0;

  playerForm.matchInfo.forEach((match) => {
    currentPoints += match.playerPoints;
    currentLeaguePoints += pointIndicator[match.result];
    weeklyStandings.push({
      event: match.event,
      leaguePoints: currentLeaguePoints,
      points: currentPoints,
    } as IPlayerWeeklyStanding);
  });

  playerStandings.weeklyStandings = weeklyStandings;

  return playerStandings;
}

export function addRankToPlayerStandings(playerStandings: IPlayerStanding[]) {
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

export function createChartData(playerStandings: IPlayerStanding[]): IAllChartData {
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
      tension: 0.3,
    };
    const pointsDataset = {
      label: playerStanding.teamName,
      data: pointsDataForPlayer,
      fill: false,
      borderColor: color,
      tension: 0.3,
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

export function getHighestScoringGameWeeks(matches: IMatch[]) {
  // filter out the matches that havent been played yet
  const filteredMatches = matches.filter((match) => (match.finished));
  let currentEvent = 1;
  let currentScore = 0;
  const gameWeekScores = [] as IGameWeekScores[];

  filteredMatches.forEach((match) => {
    // if the event matches the current event then add to the score
    if (match.event === currentEvent) {
      currentScore += match.league_entry_1_points + match.league_entry_2_points;
    }
    // else add to the gameWeekScores array, increment currenEvent,reset the score and finally start claculating the scores again
    else {
      gameWeekScores.push({ event: currentEvent, score: currentScore });
      currentEvent += 1;
      currentScore = 0;
      currentScore += match.league_entry_1_points + match.league_entry_2_points;
    }
  });

  // sort the game week scores in descending order based on their scores
  const sortedGameWeekScores = gameWeekScores.sort((a, b) => b.score - a.score);

  return sortedGameWeekScores;
}
