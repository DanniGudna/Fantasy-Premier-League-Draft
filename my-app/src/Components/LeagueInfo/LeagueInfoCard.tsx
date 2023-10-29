import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

const css = 'group relative bg-white dark:bg-slate-600 p-6';

interface IProps {
  borderCss?: string;
  statTitle: string;
  children: React.ReactNode;

}

function LeagueInfoCard({ borderCss, statTitle, children }: IProps): ReactElement {
  return (

    <div className={css + ' ' + (borderCss || '')}>
      <h3 className="font-bold leading-6 text-lg text-gray-900">
        <p className="text-black dark:text-gray-100">
          {statTitle}
        </p>
      </h3>
      <div className="p-2">
        {children}
      </div>
    </div>

  );
}

export default LeagueInfoCard;
