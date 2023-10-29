import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

function CheckMark(): ReactElement {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default CheckMark;
