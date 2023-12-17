import {
  TrophyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React, { ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LeagueContext } from '../../App';
import { PageType } from '../../interfaces/Generic';
import ClickableDiv from '../Common/ClickableDIv/ClickableDiv';
import PlayerName from '../PlayerName/PlayerName';

interface IProps {
  draftPlayerId?: number;
  name: string;
  teamName: string;
  type: PageType;
  close: () => void;
}

function HeaderFilterItem({ draftPlayerId, name, type, teamName, close }: IProps): ReactElement {
  const navigate = useNavigate();
  const { leagueId } = useContext(LeagueContext);

  const handleClickOnPlayer = () => {
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
      className="group relative rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-indigo-600 flex items-center"
      onClick={handleClickOnPlayer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="League Player name"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-background group-hover:bg-white">
        {draftPlayerId ?
          <UserIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> :
          <TrophyIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />}
      </div>
      <ClickableDiv draftPlayerId={draftPlayerId} close={close} type={type}>
        <PlayerName playerName={name} teamName={teamName} />
      </ClickableDiv>
    </div >

  );
}

export default HeaderFilterItem;
