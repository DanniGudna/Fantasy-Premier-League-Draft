import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { PageType } from '../../interfaces/Generic';

interface IProps {
  playerName?: string;
  playerId?: number;
  teamName: string;
  type: PageType;
}

function InfoHeader({ playerName, teamName, playerId, type }: IProps): ReactElement {
  const navigate = useNavigate();
  const { leagueId } = useContext(LeagueContext);

  const handleClickOnPlayer = () => {
    navigate('/' + leagueId + '/' + type + (playerId ? '/' + playerId : ''));
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
      <p className="text-lg font-semibold text-black dark:text-white">{teamName}</p>
      {playerName ? <p className="text-gray-600 dark:text-gray-400">{playerName}</p> : null}
    </div>

  );
}

export default InfoHeader;
