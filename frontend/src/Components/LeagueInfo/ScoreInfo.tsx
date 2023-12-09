import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { IScoreInfo } from '../../interfaces/League';

interface IProps {
  score: IScoreInfo;
}

function ScoreInfo({ score }: IProps): ReactElement {
  return (
    <div className="p-2 grid grid-cols-2 border-b h-24">
      <div className="flex flex-col">
        <p className="font-semibold text-black dark:text-gray-100">{score.playerTeamName}</p>
        <p className="text-black dark:text-gray-300">{score.playerName}</p>
      </div>
      <div className="place-center text-black dark:text-gray-100">
        <p>
          {score.points + ' points vs '}
          <span className="font-bold ">{score.opponentTeamName}</span>
          {' in GW: ' + score.round}
        </p>
      </div>
    </div>

  );
}

export default ScoreInfo;
