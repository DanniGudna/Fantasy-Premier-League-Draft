import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext } from 'react';

import { LeagueContext } from '../../App';
import { IDraftPlayerStats } from '../../interfaces/League';
import InfoHeader from '../InfoHeader/InfoHeader';
import FormTableRow from './FormTableRow';

interface IProps {
  rows: IDraftPlayerStats[];

}

function FormTable({ rows }: IProps): ReactElement {
  const { leagueName } = useContext(LeagueContext);

  return (
    <div className="p-2">
      <InfoHeader title={`Player form for players in league: ${leagueName}`} subTitle="Hover over the icons to see match info TODO" />
      {' '}
      <div className="mt-2 flow-root">
        <ul className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg min-w-full divide-y divide-gray-300">
          <li>
            {rows.map((row) => (
              <FormTableRow row={row} key={row.playerId + 'Form'} />
            ))}
          </li>
        </ul>
      </div>
    </div>

  );
}

export default FormTable;
