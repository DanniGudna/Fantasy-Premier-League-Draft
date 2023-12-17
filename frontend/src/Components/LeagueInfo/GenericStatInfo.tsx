import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

interface IProps {
  text: string;
}

function GenericStatInfo({ text }: IProps): ReactElement {
  return (
    <div className="flex flex-col ">
      <p className="font-bold text-black dark:text-gray-100">{text}</p>
    </div>
  );
}

export default GenericStatInfo;
