import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { IDraftPlayer, IStreak } from '../../interfaces/League';
import { getPlayerById } from '../../Utils/Utils';
import InfoHeader from '../InfoHeader/InfoHeader';
import LeagueInfoCard from '../LeagueInfo/LeagueInfoCard';
import ScoreInfo from '../LeagueInfo/ScoreInfo';
import StreakInfo from '../LeagueInfo/StreakInfo';

const firstCardBorderCss = 'rounded-tl-lg rounded-tr-lg lg:rounded-tr-none';
const secondCardBorderCss = 'lg:rounded-tr-lg';
const fifthCardBorderCss = 'lg:rounded-bl-lg';
const sixthCardBorderCss = 'rounded-bl-lg rounded-br-lg lg:rounded-bl-none';

function LeagueInfoContainer(): ReactElement {
  const { playerId } = useParams();
  const [player, setPlayer] = useState<IDraftPlayer>();

  const { draftPlayerStats, matchScores, streaks, draftPlayers, seasonName } = useContext(LeagueContext);

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
        key={streak.playerId.toString() + streak.streakStart.toString() + streak.streakEnd.toString()}
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

  useEffect(() => {
    console.warn('PLAYER CHANGE');
    if (playerId) {
      console.error('PLAYER CHANGE');
      setPlayer(getPlayerById(parseInt(playerId, 10), draftPlayers));
    }
  }, [playerId]);

  return (
    <div>
      <InfoHeader title={`Head 2 Head stats for  ${player?.firstName} -  ${player?.teamName}`} subTitle={`In ${seasonName}`} />
      <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow lg:grid lg:grid-cols-2 lg:gap-px lg:divide-y-0">
        <LeagueInfoCard statTitle="Win rate vs other players" borderCss={firstCardBorderCss}>
          <div>
            {renderXNumberOfStreaks(streaks.winStreaks, 5)}
          </div>
        </LeagueInfoCard>
        <LeagueInfoCard statTitle="Top 5 Highest single week score" borderCss={secondCardBorderCss}>
          {renderXNumberOfScores(5, 'high')}
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
