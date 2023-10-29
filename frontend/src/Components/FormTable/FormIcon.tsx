import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { IMatchInfo, MatchResult } from '../../interfaces/League';
import CheckMark from '../Common/BasicIcons/CheckMark/CheckMark';
import Line from '../Common/BasicIcons/Line/Line';
import XMark from '../Common/BasicIcons/XMark/XMark';

interface IProps {
  matchInfo: IMatchInfo;
  gameWeek: number

}
const winCss = 'rounded-full w-4 h-4 bg-green-500 self-center';
const drawCss = 'rounded-full w-4 h-4 bg-gray-500 self-center';
const lossCss = 'rounded-full w-4 h-4 bg-red-500 self-center';

const resultCSS: Record<MatchResult, string> = {
  win: winCss,
  draw: drawCss,
  loss: lossCss,
};

function FormIcon({ matchInfo, gameWeek }: IProps): ReactElement {
  const getCorrectIcon = () => {
    if (matchInfo.result === 'win') {
      return <CheckMark />;
    }
    if (matchInfo.result === 'draw') {
      return <Line />;
    }
    return <XMark />;
  };

  return (
    <div className="flex flex-col whitespace-nowrap px-3 py-4 text-sm text-black dark:text-white border-b">
      <div className="mb-2 self-center">
        {gameWeek}
      </div>
      <div className={resultCSS[matchInfo.result]}>
        {getCorrectIcon()}
      </div>
    </div>

  );
}

export default FormIcon;
