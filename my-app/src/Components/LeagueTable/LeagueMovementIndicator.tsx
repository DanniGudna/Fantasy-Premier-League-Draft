import 'tailwindcss/tailwind.css';

import React, { ReactElement, useEffect, useState } from 'react';

import { LeagueMovementDirections } from '../../interfaces/Generic';
import Chevron from '../Common/BasicIcons/Chevron/Chevron';
import Line from '../Common/BasicIcons/Line/Line';

interface IProps {
  lastRank: number;
  currentRank: number

}
const noChangeCss = 'rounded-full w-4 h-4 bg-gray-500 self-center';
const movedUpCss = 'rounded-full w-4 h-4 bg-green-500 self-center';
const movedDownCss = 'rounded-full w-4 h-4 bg-red-500 self-center';

const directionCSS: Record<LeagueMovementDirections, string> = {
  up: movedUpCss,
  down: movedDownCss,
  noChange: noChangeCss,
};

function LeagueMovementIdicator({ lastRank, currentRank }: IProps): ReactElement {
  const [leagueChange, setLeagueChange] = useState<LeagueMovementDirections>('noChange');

  useEffect(() => {
    if (lastRank < currentRank) {
      // the lower the rank the better
      setLeagueChange('down');
    }
    else if (lastRank > currentRank) {
      setLeagueChange('up');
    }
  }, []);

  return (
    <div className={directionCSS[leagueChange]}>
      {leagueChange !== 'noChange' ? <Chevron direction={leagueChange} /> : <Line />}
    </div>

  );
}

export default LeagueMovementIdicator;
