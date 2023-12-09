import {
  TrophyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { PageType } from '../../interfaces/Generic';
import PlayerName from '../PlayerName/PlayerName';

interface IProps {
  draftPlayerId?: number;
  name: string;
  teamName: string;
  type: PageType;
}

function HeaderFilterItem({ draftPlayerId, name, type, teamName }: IProps): ReactElement {
  const { leagueNumber } = useParams();

  return (
    <div key={draftPlayerId + type + 'headerOption' || leagueNumber + type + 'headerOption'} className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-indigo-600">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-background group-hover:bg-white">
        {draftPlayerId ?
          <UserIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> :
          <TrophyIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />}
      </div>
      <PlayerName playerName={name} playerId={draftPlayerId} teamName={teamName} type={type} />
      {/*       <a href={item.href} className="mt-6 block font-semibold text-gray-900">
        {name}
        <span className="absolute inset-0" />
      </a> */}
    </div>

  );
}

export default HeaderFilterItem;
