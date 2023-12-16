import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext } from 'react';

import { LeagueContext } from '../../App';
import { PageType } from '../../interfaces/Generic';
import { IDraftPlayerStats } from '../../interfaces/League';
import { getTooltipText } from '../../Utils/Utils';
import PlayerName from '../PlayerName/PlayerName';
import FormIcon from './FormIcon';

interface IProps {
  row: IDraftPlayerStats;

}

function FormTableRow({ row }: IProps): ReactElement {
  const { draftPlayers } = useContext(LeagueContext);

  const renderFormIcons = () => row.matchInfo.map((matchInfo) => (
    <FormIcon
      matchInfo={matchInfo}
      gameWeek={matchInfo.round}
      key={matchInfo.round + row.playerId}
      toolTipText={getTooltipText(matchInfo, row.playerName, draftPlayers)}
    />
  ));

  return (
    <div className="relative border-b-2 border-black">
      <div className="whitespace-nowrap px-3 py-4 text-sm  border-b ">
        <PlayerName playerName={row.playerName} teamName={row.teamName} />
        <p className="mt-2 text-sm dark:text-gray-100">All match result for this player</p>
      </div>
      <div className="overflow-x-scroll flex flex-row scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">

        {renderFormIcons()}
      </div>
    </div>

  );
}

export default FormTableRow;
