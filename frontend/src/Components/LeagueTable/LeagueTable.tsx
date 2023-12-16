import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useMemo, useState } from 'react';

import { LeagueContext } from '../../App';
import { ILeagueTableDetails, IStanding } from '../../interfaces/League';
import InfoHeader from '../InfoHeader/InfoHeader';
import Tooltip from '../Tooltip/Tooltip';
import LeagueTableRow from './LeagueTableRow';
import SortableTableHeader from './SortableTableHeader';

interface IProps {
  rows: ILeagueTableDetails[];

}

function LeagueTable({ rows }: IProps): ReactElement {
  const [sortColumn, setSortColumn] = useState<string>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { leagueName } = useContext(LeagueContext);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedRows = useMemo(() => {
    const comparator = (standingA: IStanding, standingB: IStanding) => {
      if (sortOrder === 'asc') {
        return standingA[sortColumn] - standingB[sortColumn];
      }
      return standingB[sortColumn] - standingA[sortColumn];
    };
    return [...rows].sort(comparator);
  }, [rows, sortColumn, sortOrder]);

  return (
    <div data-cy="leagueTable">
      <InfoHeader title={`League standings for ${leagueName}`} subTitle="Click on the headers to sort the table" />
      <div className="mt-8 flow-root">
        <div className="overflow-hidden">
          <div className="inline-block px-2 py-2 align-middle sm:px-4 lg:px-6">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className=" divide-y divide-gray-300">
                <thead className="bg-gray-50 dark:bg-slate-600">
                  <tr>
                    <th scope="col" onClick={() => handleSort('currentRank')} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      <SortableTableHeader title="Rank" sortColumn={sortColumn} sortOrder={sortOrder} sortName="currentRank" />
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white border-r border-gray-200">Team & Manager</th>

                    <th onClick={() => handleSort('matchesWon')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                      <SortableTableHeader title="W" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matchesWon" />
                    </th>
                    <th onClick={() => handleSort('matchesDrawn')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                      <SortableTableHeader title="D" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matchesDrawn" />
                    </th>
                    <th onClick={() => handleSort('matchesLost')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white border-r border-gray-200">
                      <SortableTableHeader title="L" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matchesLost" />
                    </th>

                    <th onClick={() => handleSort('matchPointsFor')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      <SortableTableHeader title="Points for" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matchPointsFor" />
                    </th>
                    <th onClick={() => handleSort('matchPointsAgainst')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell">
                      <SortableTableHeader title="Points against" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matchPointsAgainst" />
                    </th>
                    <th onClick={() => handleSort('matchPointsDiff')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell">
                      <SortableTableHeader title="Points diff" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matchPointsDiff" />
                    </th>
                    <th onClick={() => handleSort('averageMatchPoints')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="Average points" sortColumn={sortColumn} sortOrder={sortOrder} sortName="averageMatchPoints" />
                    </th>

                    <th onClick={() => handleSort('wonByOnePoint')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell">
                      <SortableTableHeader title="W by 1" sortColumn={sortColumn} sortOrder={sortOrder} sortName="wonByOnePoint" />
                    </th>
                    <th onClick={() => handleSort('lostByOnePoint')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="L by 1" sortColumn={sortColumn} sortOrder={sortOrder} sortName="lostByOnePoint" />
                    </th>

                    <th onClick={() => handleSort('wonWithThirdMostPoints')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell">
                      <SortableTableHeader title="W in 3rd" sortColumn={sortColumn} sortOrder={sortOrder} sortName="wonWithThirdMostPoints" />
                    </th>
                    <th onClick={() => handleSort('lostWithSecondMostPoints')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <Tooltip message="Lost with 2nd most points">
                        <SortableTableHeader title="L in 2nd" sortColumn={sortColumn} sortOrder={sortOrder} sortName="lostWithSecondMostPoints" />
                      </Tooltip>
                    </th>

                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="Form" sortColumn={sortColumn} sortOrder={sortOrder} />
                    </th>

                    <th onClick={() => handleSort('leaguePoints')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                      <SortableTableHeader title="League Points" sortColumn={sortColumn} sortOrder={sortOrder} sortName="leaguePoints" />
                    </th>
                    {/*                     <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white  md:table-cell">Form TODO</th> */}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row) => (
                    <LeagueTableRow row={row} key={row.playerId} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LeagueTable;
