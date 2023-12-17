import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { IDraftPlayer, IStreak } from '../../interfaces/League';

interface IProps {
  winPercentage: number;
  opponent: IDraftPlayer;
}

function WinRateInfo({ streak, currentGameWeek }: IProps): ReactElement {
  return (
    <div className="p-2 grid grid-cols-2 border-b h-24">
      <div className="flex flex-col ">
        <p className="font-semibold text-black dark:text-gray-100">{streak.teamName}</p>
        <p className="text-black dark:text-gray-300">{streak.playerName}</p>
      </div>
      <div className="place-center">
        <div className="flex flex-col text-black dark:text-gray-100">
          <p>{streak.length + ' game ' + streak.type + ' streak'}</p>
          <p>{'- GW: ' + streak.streakStart + ' to GW: ' + streak.streakEnd + (streak.streakEnd === currentGameWeek ? '+' : '')}</p>
        </div>
      </div>
    </div>

  );
}

export default WinRateInfo;
