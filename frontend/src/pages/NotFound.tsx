/* eslint-disable no-nested-ternary */
import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

function NotFound(): ReactElement {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 dark:bg-slate-750">
      You are lost! Page not found!
    </div>

  );
}

export default NotFound;
