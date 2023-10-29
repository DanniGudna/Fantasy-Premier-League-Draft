import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IProps {
  playerName: string;
  playerID: number;
  teamName: string
}

function InfoHeader({ playerName, teamName, playerID }: IProps): ReactElement {
  const navigate = useNavigate();
  const { leagueNumber } = useParams();

  const handleClickOnPlayer = () => {
    // todo redirec
    navigate('/' + leagueNumber + '/' + playerID);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClickOnPlayer();
    }
  };

  return (
    <div
      onClick={handleClickOnPlayer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="League Player name"
    >
      <p className="text-lg font-extrabold text-black dark:text-white">{teamName}</p>
      <p className="text-gray-600 dark:text-gray-400">{playerName}</p>
    </div>

  );
}

export default InfoHeader;
