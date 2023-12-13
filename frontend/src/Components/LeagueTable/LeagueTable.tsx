import 'tailwindcss/tailwind.css';

import React, { ReactElement, useMemo, useState } from 'react';

import { IStanding } from '../../interfaces/League';
import InfoHeader from '../InfoHeader/InfoHeader';
import LeagueTableRow from './LeagueTableRow';
import SortableTableHeader from './SortableTableHeader';

interface IProps {
  rows: IStanding[];

}

function LeagueTable({ rows }: IProps): ReactElement {
  console.log('🚀 ~ file: LeagueTable.tsx:16 ~ LeagueTable ~ rows:', rows);
  const [sortColumn, setSortColumn] = useState<string>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
      <InfoHeader title="League standings for the league:" subTitle="Click on the headers to sort the table" />
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
                    {/* <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white  lg:table-cell">Played</th> */}
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

                    {/*                     <th onClick={() => handleSort('won')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="Won by 1 point" sortColumn={sortColumn} sortOrder={sortOrder} sortName="averageMatchPoints" />
                    </th>
                    <th onClick={() => handleSort('averageMatchPoints')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="Average points" sortColumn={sortColumn} sortOrder={sortOrder} sortName="averageMatchPoints" />
                    </th>
                    <th onClick={() => handleSort('averageMatchPoints')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="Average points" sortColumn={sortColumn} sortOrder={sortOrder} sortName="averageMatchPoints" />
                    </th>
                    <th onClick={() => handleSort('averageMatchPoints')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell border-r border-gray-200">
                      <SortableTableHeader title="Average points" sortColumn={sortColumn} sortOrder={sortOrder} sortName="averageMatchPoints" />
                    </th>
 */}

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
