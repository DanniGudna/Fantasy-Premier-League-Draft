import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { IGameWeekScores, IScoreInfo, IStreak } from '../../interfaces/League';
import { getAllStreaks, getHighestScoringGameWeeks, getMatchScores } from '../../Utils/Utils';
import InfoHeader from '../InfoHeader/InfoHeader';
import LeagueInfoCard from './LeagueInfoCard';
import ScoreInfo from './ScoreInfo';
import StreakInfo from './StreakInfo';
import WeekScoreInfo from './WeekScoreInfo';

const firstCardBorderCss = 'rounded-tl-lg rounded-tr-lg lg:rounded-tr-none';
const secondCardBorderCss = 'lg:rounded-tr-lg';
const fifthCardBorderCss = 'lg:rounded-bl-lg';
const sixthCardBorderCss = 'rounded-bl-lg rounded-br-lg lg:rounded-bl-none';

function LeagueInfoContainer(): ReactElement {
  const [winStreaks, setWinStreaks] = useState([] as IStreak[]);
  const [undefeatedStreaks, setUndefeatedStreaks] = useState([] as IStreak[]);
  const [lossStreaks, setLossStreaks] = useState([] as IStreak[]);
  const [scores, setScores] = useState([] as IScoreInfo[]);
  const [weeklyScores, setWeeklyScores] = useState([] as IGameWeekScores[]);
  const { playerNumber } = useParams();

  const { selectedSeason } = useContext(LeagueContext);

  // these function can display more info if I want to do this dynamicly in the future
  const renderXNumberOfStreaks = (streaks: IStreak[], numberOfRenders: number) => {
    const streakComponents = [];
    const maxRenders = Math.min(streaks.length, numberOfRenders);
    for (let i = 0; i < maxRenders; i++) {
      const streak = streaks[i];
      streakComponents.push(<StreakInfo
        streak={streak}
        gameWeek={selectedSeason.draftPlayerForms[0].matchInfo.length}
        key={streak.playerId + streak.streakStart}
      />);
    }

    return streakComponents;
  };

  const renderXNumberOfScores = (numberOfRenders: number, highOrLow: 'high' | 'low') => {
    const scoreComponents = [];
    const maxRenders = Math.min(scores.length, numberOfRenders);
    let startingPosition = highOrLow === 'low' ? scores.length - 1 : 0;
    for (let i = 0; i < maxRenders; i++, highOrLow === 'low' ? startingPosition-- : startingPosition++) {
      const score = scores[startingPosition];
      scoreComponents.push(<ScoreInfo score={score} key={score.playerId + score.opponentId + score.round} />);
    }

    return scoreComponents;
  };

  const renderXNumberOfWeekScores = (numberOfRenders: number, highOrLow: 'high' | 'low') => {
    const weekScoreComponents = [];
    const maxRenders = Math.min(weeklyScores.length, numberOfRenders);
    let startingPosition = highOrLow === 'low' ? scores.length - 1 : 0;
    for (let i = 0; i < maxRenders; i++, highOrLow === 'low' ? startingPosition-- : startingPosition++) {
      const weekScore = weeklyScores[startingPosition];
      weekScoreComponents.push(<WeekScoreInfo weekScore={weekScore} key={weekScore.round} />);
    }

    return weekScoreComponents;
  };

  useEffect(() => {
    const streaks = getAllStreaks(selectedSeason.draftPlayerForms);
    let matchScores = getMatchScores(selectedSeason.draftPlayerForms);
    let weekScores: IGameWeekScores[];

    // filter if player selected...
    if (playerNumber) {
      streaks.winStreaks = streaks.winStreaks.filter((streak) => streak.playerId.toString() === playerNumber);
      streaks.undefeatedStreaks = streaks.undefeatedStreaks.filter((streak) => streak.playerId.toString() === playerNumber);
      streaks.lossStreaks = streaks.lossStreaks.filter((streak) => streak.playerId.toString() === playerNumber);
      matchScores = matchScores.filter((matchScore) => matchScore.playerId.toString() === playerNumber);
      weekScores = getHighestScoringGameWeeks(selectedSeason.matches.filter(
        (match) => match.team1Id.toString() === playerNumber
          || match.team2Id.toString() === playerNumber,
      ));
    }
    else {
      weekScores = getHighestScoringGameWeeks(selectedSeason.matches);
    }
    setScores(matchScores);
    setWinStreaks(streaks.winStreaks);
    setUndefeatedStreaks(streaks.undefeatedStreaks);
    setLossStreaks(streaks.lossStreaks);
    setWeeklyScores(weekScores);
  }, [selectedSeason.draftPlayerForms]);

  return (
    <div>
      <InfoHeader title="Fun stats about " subTitle="Note there is a week where no games were played so everyone got a draw and 0 points, that gameweek has been filtered out for these stats" />

      <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow lg:grid lg:grid-cols-2 lg:gap-px lg:divide-y-0">
        {winStreaks.length > 0 ? (
          <LeagueInfoCard statTitle="Top 5 Longest win streaks" borderCss={firstCardBorderCss}>
            <div>
              {renderXNumberOfStreaks(winStreaks, 5)}
            </div>
          </LeagueInfoCard>
        ) : null}
        <LeagueInfoCard statTitle="Top 5 Highest single week score" borderCss={secondCardBorderCss}>
          {renderXNumberOfScores(5, 'high')}
        </LeagueInfoCard>
        {lossStreaks.length > 0 ? (
          <LeagueInfoCard statTitle="Top 5 Longest loss streaks">
            <div>
              {renderXNumberOfStreaks(lossStreaks, 5)}
            </div>
          </LeagueInfoCard>
        ) : null}
        <LeagueInfoCard statTitle="Top 5 Lowest single week score">
          {renderXNumberOfScores(5, 'low')}
        </LeagueInfoCard>
        {undefeatedStreaks.length > 0 ? (
          <LeagueInfoCard statTitle="Top 5 Longest undefeated streaks" borderCss={fifthCardBorderCss}>
            <div>
              {renderXNumberOfStreaks(undefeatedStreaks, 5)}
            </div>
          </LeagueInfoCard>
        ) : null}
        <LeagueInfoCard statTitle="Top 10 most scoring weeks" borderCss={sixthCardBorderCss}>
          <div>
            {renderXNumberOfWeekScores(10, 'high')}
          </div>
        </LeagueInfoCard>
      </div>

    </div>

  );
}

export default LeagueInfoContainer;
