/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

function NextVersion(): ReactElement {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750">
      This page does not exist yet, it is scheduled for version 3
    </div>

  );
}

export default NextVersion;
