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
  const [draftPlayer, setDraftPlayer] = useState<IDraftPlayer>({} as IDraftPlayer);
  const { draftPlayers } = useContext(LeagueContext);

  useEffect(() => {
    // This should never return undefined but safeties just in case
    setDraftPlayer(getPlayerById(row.playerId, draftPlayers) || {} as IDraftPlayer);
  }, []);

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 border-b">
        <div className="flex flex-row justify-between">
          <p>{row.currentRank}</p>
          <LeagueMovementIdicator lastRank={row.rankLastWeek} currentRank={row.currentRank} />
        </div>

      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm border-b border-r border-gray-200">
        <PlayerName
          playerName={draftPlayer.fullName}
          teamName={draftPlayer.teamName}
          playerId={draftPlayer.id}
          type={PageType.LeagueTable}
        />
      </td>
      {/* <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b lg:table-cell">{(row.matches_won + row.matches_drawn + row.matches_lost) + ' / 38'}</td> */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b">{row.matchesWon}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b">{row.matchesDrawn}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b border-r border-gray-200">{row.matchesLost}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b">{row.matchPointsFor}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell">{row.matchPointsAgainst}</td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell ">
        {row.matchPointsDiff > 0 ? `+${row.matchPointsDiff}` : row.matchPointsDiff}
      </td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell border-r border-gray-200">{row.averageMatchPoints}</td>
      {/*       <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b md:table-cell">FORM TODO</td> */}

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200  border-b">{row.leaguePoints}</td>
    </tr>

  );
}

export default LeagueTableRow;
