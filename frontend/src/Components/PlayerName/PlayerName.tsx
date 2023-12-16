import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

interface IProps {
  playerName?: string;
  teamName: string;
}

function PlayerName({ playerName, teamName }: IProps): ReactElement {
  return (
    <div>
      <p className="text-lg font-semibold text-black dark:text-white">{teamName}</p>
      {playerName ? <p className="text-gray-600 dark:text-gray-400">{playerName}</p> : null}
    </div>

  );
}

export default PlayerName;
