import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { UserContext } from '../../App';
import { IPlayer, IStanding } from '../../interfaces/League';
import { getPlayerById } from '../../Utils/Utils';
import PlayerName from '../PlayerName/PlayerName';
import LeagueMovementIdicator from './LeagueMovementIndicator';

interface IProps {
  row: IStanding;
  h2h: boolean;

}

function LeagueTableRow({ row, h2h }: IProps): ReactElement {
  const [player, setPlayer] = useState<IPlayer>({} as IPlayer);
  const { players } = useContext(UserContext);

  useEffect(() => {
    // This should never return undefined but safeties just in case
    setPlayer(getPlayerById(row.league_entry, players) || {} as IPlayer);
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
        <PlayerName playerName={player.player_first_name + ' ' + player.player_last_name} teamName={player.entry_name} playerID={player.id} />
      </td>
      {h2h ? (
        <>
          {/* <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b lg:table-cell">{(row.matches_won + row.matches_drawn + row.matches_lost) + ' / 38'}</td> */}
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.matches_won}</td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.matches_drawn}</td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.matches_lost}</td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.points_for}</td>
          <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b sm:table-cell">{row.points_against}</td>
          <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b sm:table-cell">{row.points_diff}</td>
          {/*       <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b md:table-cell">FORM TODO</td> */}
        </>
      )
        : (
          <>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.event_total}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{Math.round(row.total / 35)}</td>
            {' '}
            {/* there is no way to get number of weeks played so hard coded for now */}
          </>
        )}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.total}</td>
    </tr>

  );
}

export default LeagueTableRow;
