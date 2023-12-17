import React, { ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LeagueContext } from '../../../App';
import { PageType } from '../../../interfaces/Generic';

interface IProps {
  draftPlayerId?: number;
  type: PageType;
  children: React.ReactNode;
  close?: () => void;

}

function HeaderFilterItem({ draftPlayerId, children, type, close }: IProps): ReactElement {
  const navigate = useNavigate();
  const { leagueId } = useContext(LeagueContext);

  const handleClickOnPlayer = () => {
    if (close) {
      close();
    }
    navigate('/' + leagueId + '/' + type + (draftPlayerId ? '/' + draftPlayerId : ''));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClickOnPlayer();
    }
  };

  return (
    <div
      key={draftPlayerId + type + 'headerOption' || leagueId + type + 'headerOption'}
      className="group relative rounded-lg px-6 py-2 text-sm leading-6"
      onClick={handleClickOnPlayer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="League Player name"
    >
      {children}
    </div>

  );
}

export default HeaderFilterItem;
