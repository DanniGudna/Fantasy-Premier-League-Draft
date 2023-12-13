import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { IGameWeekScores, IStreak } from '../../interfaces/League';
import { getHighestScoringGameWeeks } from '../../Utils/Utils';
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
  const [weeklyScores, setWeeklyScores] = useState([] as IGameWeekScores[]);
  const { playerId } = useParams();

  const { draftPlayerForms, matches, matchScores, streaks } = useContext(LeagueContext);

  // these function can display more info if I want to do this dynamicly in the future
  const renderXNumberOfStreaks = (selectedStreaks: IStreak[], numberOfRenders: number) => {
    let filteredStreaks = selectedStreaks;
    if (playerId) {
      filteredStreaks = selectedStreaks.filter((streak) => streak.playerId.toString() === playerId);
    }
    const streakComponents = [];
    const maxRenders = Math.min(filteredStreaks.length, numberOfRenders);
    for (let i = 0; i < maxRenders; i++) {
      const streak = filteredStreaks[i];
      streakComponents.push(<StreakInfo
        streak={streak}
        currentGameWeek={draftPlayerForms[0].matchInfo.length}
        key={streak.playerId.toString() + streak.streakStart.toString() + streak.streakEnd.toString()}
      />);
    }

    return streakComponents;
  };

  const renderXNumberOfScores = (numberOfRenders: number, highOrLow: 'high' | 'low') => {
    const scoreComponents = [];
    const maxRenders = Math.min(matchScores.length, numberOfRenders);
    let startingPosition = highOrLow === 'low' ? matchScores.length - 1 : 0;
    for (let i = 0; i < maxRenders; i++, highOrLow === 'low' ? startingPosition-- : startingPosition++) {
      const score = matchScores[startingPosition];
      scoreComponents.push(<ScoreInfo
        score={score}
        key={score.playerId.toString() + score.opponentId.toString() + score.round.toString()}
      />);
    }

    return scoreComponents;
  };

  const renderXNumberOfWeekScores = (numberOfRenders: number, highOrLow: 'high' | 'low') => {
    const weekScoreComponents = [];
    const maxRenders = Math.min(weeklyScores.length, numberOfRenders);
    let startingPosition = highOrLow === 'low' ? matchScores.length - 1 : 0;
    for (let i = 0; i < maxRenders; i++, highOrLow === 'low' ? startingPosition-- : startingPosition++) {
      const weekScore = weeklyScores[startingPosition];
      weekScoreComponents.push(<WeekScoreInfo weekScore={weekScore} key={weekScore.round} />);
    }

    return weekScoreComponents;
  };

  useEffect(() => {
    let weekScores: IGameWeekScores[];

    // filter if player selected...
    if (playerId) {
      weekScores = getHighestScoringGameWeeks(matches.filter(
        (match) => match.team1Id.toString() === playerId
          || match.team2Id.toString() === playerId,
      ));
    }
    else {
      weekScores = getHighestScoringGameWeeks(matches); // TODO maybe dont claclulate this stat, if it should be calculated then move it app.tsx
    }
    setWeeklyScores(weekScores);
  }, [draftPlayerForms]);

  return (
    <div>
      <InfoHeader title="Fun stats about " subTitle="Note there is a week where no games were played so everyone got a draw and 0 points, that gameweek has been filtered out for these stats" />
      <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow lg:grid lg:grid-cols-2 lg:gap-px lg:divide-y-0">
        {streaks.winStreaks.length > 0 ? (
          <LeagueInfoCard statTitle="Top 5 Longest win streaks" borderCss={firstCardBorderCss}>
            <div>
              {renderXNumberOfStreaks(streaks.winStreaks, 5)}
            </div>
          </LeagueInfoCard>
        ) : null}
        <LeagueInfoCard statTitle="Top 5 Highest single week score" borderCss={secondCardBorderCss}>
          {renderXNumberOfScores(5, 'high')}
        </LeagueInfoCard>
        {streaks.lossStreaks.length > 0 ? (
          <LeagueInfoCard statTitle="Top 5 Longest loss streaks">
            <div>
              {renderXNumberOfStreaks(streaks.lossStreaks, 5)}
            </div>
          </LeagueInfoCard>
        ) : null}
        <LeagueInfoCard statTitle="Top 5 Lowest single week score">
          {renderXNumberOfScores(5, 'low')}
        </LeagueInfoCard>
        {streaks.undefeatedStreaks.length > 0 ? (
          <LeagueInfoCard statTitle="Top 5 Longest undefeated streaks" borderCss={fifthCardBorderCss}>
            <div>
              {renderXNumberOfStreaks(streaks.undefeatedStreaks, 5)}
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
