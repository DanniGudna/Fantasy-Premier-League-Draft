/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

interface IProps {
  info: string;
}

function NextVersion({ info }: IProps): ReactElement {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750 flex flex-col">
      <p>
        This page does not exist yet, it is scheduled for version 3
      </p>
      <p>{info}</p>
    </div>

  );
}

export default NextVersion;
