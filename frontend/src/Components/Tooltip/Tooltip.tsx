import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

interface IProps {
  message: string;
  children: React.ReactNode;
}

function Tooltip({ message, children }: IProps): ReactElement {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-10 scale-0 group-hover:scale-100 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-1000 hover:z-50">
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
