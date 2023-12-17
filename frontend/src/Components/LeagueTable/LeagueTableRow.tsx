import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { LeagueContext } from '../../App';
import { IDraftPlayerStats, ILeagueTableDetails } from '../../interfaces/League';
import { getPlayerStatsById, getTooltipText } from '../../Utils/Utils';
import FormIcon from '../FormTable/FormIcon';
import PlayerName from '../PlayerName/PlayerName';
import LeagueMovementIdicator from './LeagueMovementIndicator';

interface IProps {
  row: ILeagueTableDetails;
}

function LeagueTableRow({ row }: IProps): ReactElement {
  const [draftPlayer, setDraftPlayer] = useState<IDraftPlayerStats>({} as IDraftPlayerStats);
  const { draftPlayerStats, draftPlayers } = useContext(LeagueContext);

  useEffect(() => {
    // This should never return undefined but safeties just in case
    setDraftPlayer(getPlayerStatsById(row.playerId, draftPlayerStats) || {} as IDraftPlayerStats);
  }, []);

  const renderLast5Gmaes = () => draftPlayer?.matchInfo.slice(-5).map((matchInfo) => (
    <FormIcon
      matchInfo={matchInfo}
      gameWeek={matchInfo.round}
      key={matchInfo.round + row.playerId}
      toolTipText={getTooltipText(matchInfo, draftPlayer.playerName, draftPlayers)}
    />
  ));

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
          playerName={draftPlayer.playerName}
          teamName={draftPlayer.teamName}
        />
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b">{row.matchesWon}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b">{row.matchesDrawn}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b border-r border-gray-200">{row.matchesLost}</td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b">{row.matchPointsFor}</td>
      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell">{row.matchPointsAgainst}</td>
      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell ">
        {row.matchPointsDiff > 0 ? `+${row.matchPointsDiff}` : row.matchPointsDiff}
      </td>
      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell border-r border-gray-200">{row.averageMatchPoints}</td>

      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell">{row.wonByOnePoint}</td>
      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell border-r border-gray-200">{row.lostByOnePoint}</td>

      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell">{row.wonWithThirdMostPoints}</td>
      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell border-r border-gray-200">{row.lostWithSecondMostPoints}</td>

      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b sm:table-cell border-r border-gray-200">
        {
          draftPlayer.playerId ? (
            <div className="flex flex-row">
              {renderLast5Gmaes()}
            </div>
          )
            : null
        }
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-200 border-b ">{row.leaguePoints}</td>
    </tr>

  );
}

export default LeagueTableRow;
