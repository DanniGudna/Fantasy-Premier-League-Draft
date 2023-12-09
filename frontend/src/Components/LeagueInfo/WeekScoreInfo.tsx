import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { IGameWeekScores } from '../../interfaces/League';

interface IProps {
  weekScore: IGameWeekScores;
}

function WeekScoreInfo({ weekScore }: IProps): ReactElement {
  return (
    <div className="p-2 border-b h-12">
      <div className="place-center text-black dark:text-gray-100">
        <p>
          {weekScore.score + ' points in GW: ' + weekScore.round}
        </p>
      </div>
    </div>

  );
}

export default WeekScoreInfo;
