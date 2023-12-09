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
                    <th scope="col" onClick={() => handleSort('rank')} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      <SortableTableHeader title="Rank" sortColumn={sortColumn} sortOrder={sortOrder} sortName="rank" />
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">Team & Manager</th>
                    {rows[0].matches_played ? (
                      <>
                        {/* <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white  lg:table-cell">Played</th> */}
                        <th onClick={() => handleSort('matches_won')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                          <SortableTableHeader title="W" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matches_won" />
                        </th>
                        <th onClick={() => handleSort('matches_drawn')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                          <SortableTableHeader title="D" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matches_drawn" />
                        </th>
                        <th onClick={() => handleSort('matches_lost')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                          <SortableTableHeader title="L" sortColumn={sortColumn} sortOrder={sortOrder} sortName="matches_lost" />
                        </th>
                        <th onClick={() => handleSort('points_for')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                          <SortableTableHeader title="Points for" sortColumn={sortColumn} sortOrder={sortOrder} sortName="points_for" />
                        </th>
                        <th onClick={() => handleSort('points_against')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white  sm:table-cell">
                          <SortableTableHeader title="Points against" sortColumn={sortColumn} sortOrder={sortOrder} sortName="points_against" />
                        </th>
                        <th onClick={() => handleSort('points_diff')} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white  sm:table-cell">
                          <SortableTableHeader title="Points diff" sortColumn={sortColumn} sortOrder={sortOrder} sortName="points_diff" />
                        </th>
                      </>
                    )
                      : (
                        <>
                          <th onClick={() => handleSort('event_total')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                            <SortableTableHeader title="Points this week" sortColumn={sortColumn} sortOrder={sortOrder} sortName="event_total" />
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                            Avereage Points per week
                          </th>
                        </>
                      )}
                    <th onClick={() => handleSort('total')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                      <SortableTableHeader title="League Points" sortColumn={sortColumn} sortOrder={sortOrder} sortName="total" />
                    </th>
                    {/*                     <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white  md:table-cell">Form TODO</th> */}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row) => (
                    <LeagueTableRow row={row} key={row.league_entry} />
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
