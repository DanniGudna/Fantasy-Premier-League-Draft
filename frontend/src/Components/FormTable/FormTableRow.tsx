/* eslint-disable react/no-array-index-key */
import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { PageType } from '../../interfaces/Generic';
import { IDraftPlayerStats } from '../../interfaces/League';
import PlayerName from '../PlayerName/PlayerName';
import FormIcon from './FormIcon';

interface IProps {
  row: IDraftPlayerStats;

}

function FormTableRow({ row }: IProps): ReactElement {
  const renderFormIcons = () => row.matchInfo.map((matchInfo, index) => (<div className="whitespace-nowrap px-3 py-4 border-b" key={index}><FormIcon matchInfo={matchInfo} gameWeek={index + 1} /></div>));

  return (
    <div className="border-b-2 border-black">
      <div className="whitespace-nowrap px-3 py-4 text-sm  border-b ">
        <PlayerName playerName={row.playerName} teamName={row.teamName} playerId={row.playerId} type={PageType.Form} />
        <p className="mt-2 text-sm dark:text-gray-100">All match result for this player</p>
      </div>
      <div className="overflow-x-scroll flex flex-row scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">

        {renderFormIcons()}
      </div>
    </div>

  );
}

export default FormTableRow;
