import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { IStreak } from '../../interfaces/League';
import InfoHeader from '../InfoHeader/InfoHeader';
import LeagueInfoCard from './LeagueInfoCard';
import ScoreInfo from './ScoreInfo';
import StreakInfo from './StreakInfo';

const firstCardBorderCss = 'rounded-tl-lg rounded-tr-lg lg:rounded-tr-none';
const secondCardBorderCss = 'lg:rounded-tr-lg';
const fifthCardBorderCss = 'lg:rounded-bl-lg';
const sixthCardBorderCss = 'rounded-bl-lg rounded-br-lg lg:rounded-bl-none';

function LeagueInfoContainer(): ReactElement {
  const { playerId } = useParams();

  const { draftPlayerStats, matchScores, streaks, leagueName, seasonName } = useContext(LeagueContext);

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
        currentGameWeek={draftPlayerStats[0].matchInfo.length}
        key={streak.playerId.toString() + streak.streakStart.toString() + streak.streakEnd.toString() + streak.type}
      />);
    }

    return streakComponents;
  };

  const renderXNumberOfScores = (numberOfRenders: number, highOrLow: 'high' | 'low') => {
    const scoreComponents = [];
    let filteredMatchScores = matchScores;
    if (playerId) {
      filteredMatchScores = matchScores.filter((matchScore) => matchScore.playerId.toString() === playerId);
    }
    const maxRenders = Math.min(filteredMatchScores.length, numberOfRenders);
    let startingPosition = highOrLow === 'low' ? filteredMatchScores.length - 1 : 0;
    for (let i = 0; i < maxRenders; i++, highOrLow === 'low' ? startingPosition-- : startingPosition++) {
      const score = filteredMatchScores[startingPosition];
      scoreComponents.push(<ScoreInfo
        score={score}
        key={score.playerId.toString() + score.opponentId.toString() + score.round.toString()}
      />);
    }

    return scoreComponents;
  };

  return (
    <div>
      <InfoHeader title={`Fun stats about ${leagueName}`} subTitle={`In ${seasonName}`} />
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
        <LeagueInfoCard statTitle="Idea for another stat welcome" borderCss={sixthCardBorderCss}>
          <div>
            Some cool stat
          </div>
        </LeagueInfoCard>
      </div>

    </div>

  );
}

export default LeagueInfoContainer;
