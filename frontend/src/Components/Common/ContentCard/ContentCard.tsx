import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

interface IProps {
  children: React.ReactNode;
}

function ContentCard({ children }: IProps): ReactElement {
  return (
    <div className="p-4 overflow-auto rounded-sm border m-2 shadow-lg dark:bg-darkmode-main">
      {children}
    </div>

  );
}

export default ContentCard;
