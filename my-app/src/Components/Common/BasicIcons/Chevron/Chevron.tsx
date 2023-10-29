import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { ChevronDirection } from '../../../../interfaces/Generic';

interface IProps {
  direction: ChevronDirection;

}

function Chevron({ direction }: IProps): ReactElement {
  return (
    <span className="ml-auto h-4 w-4 rounded-full inline-flex items-center justify-center text-black-400 transition duration-150 ease-in-out">
      {direction === 'down' ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      )}
    </span>

  );
}

export default Chevron;
