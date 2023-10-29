import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

function XMark(): ReactElement {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default XMark;
