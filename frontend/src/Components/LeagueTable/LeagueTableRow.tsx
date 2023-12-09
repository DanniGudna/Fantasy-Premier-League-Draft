import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { LeagueContext } from '../../App';
import { PageType } from '../../interfaces/Generic';
import { IDraftPlayer, IStanding } from '../../interfaces/League';
import { getPlayerById } from '../../Utils/Utils';
import PlayerName from '../PlayerName/PlayerName';
import LeagueMovementIdicator from './LeagueMovementIndicator';

interface IProps {
  row: IStanding;
}

function LeagueTableRow({ row }: IProps): ReactElement {
  console.log('🚀 ~ file: LeagueTableRow.tsx:19 ~ LeagueTableRow ~ row:', row);
  const [draftPlayer, setDraftPlayer] = useState<IDraftPlayer>({} as IDraftPlayer);
  const { selectedSeason } = useContext(LeagueContext);

  useEffect(() => {
    // This should never return undefined but safeties just in case
    setDraftPlayer(getPlayerById(row.league_entry, selectedSeason.draftPlayers) || {} as IDraftPlayer);
  }, []);

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 border-b">
        <div className="flex flex-row justify-between">
          <p>{row.rank}</p>
          <LeagueMovementIdicator lastRank={row.last_rank} currentRank={row.rank} />
        </div>

      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm border-b">
        <PlayerName
          playerName={draftPlayer.fullName}
          teamName={draftPlayer.teamName}
          playerId={draftPlayer.id}
          type={PageType.LeagueTable}
        />
      </td>
      {/* <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b lg:table-cell">{(row.matches_won + row.matches_drawn + row.matches_lost) + ' / 38'}</td> */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.matches_won}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.matches_drawn}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.matches_lost}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.points_for}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b sm:table-cell">{row.points_against}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b sm:table-cell">{row.points_diff}</td>
      {/*       <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b md:table-cell">FORM TODO</td> */}

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.total}</td>
    </tr>

  );
}

export default LeagueTableRow;
