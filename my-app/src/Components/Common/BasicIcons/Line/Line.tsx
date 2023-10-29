import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

function Line(): ReactElement {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
    </svg>

  );
}

export default Line;
