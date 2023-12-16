import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext } from 'react';

import { LeagueContext } from '../../App';

interface IProps {
  title: string;
  subTitle: string
}

function InfoHeader({ title, subTitle }: IProps): ReactElement {
  return (
    <div className="px-2 ">
      <h1 className="text-bold font-bold text-lg leading-6 text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 ml-2 text-sm text-gray-700 dark:text-gray-300">{subTitle}</p>
    </div>

  );
}

export default InfoHeader;
