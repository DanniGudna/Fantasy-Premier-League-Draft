import 'tailwindcss/tailwind.css';

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { UserContext } from '../../App';
import useDarkMode from '../../Hooks/UseDarkMode';
import Toggle from '../Common/Toggle/Toggle';

function Header(): ReactElement {
  const [headerText, setHeaderText] = useState('');
  const { leagueName } = useContext(UserContext);
  const [colorTheme, setTheme] = useDarkMode();

  const changeDarkMode = () => {
    setTheme(colorTheme);
  };

  useEffect(() => {
    // check if cart items should be available
    setHeaderText(leagueName);
  }, [leagueName]);
  return (
    <header className="bg-gray-800 min-h-[6vh] flex flex-row items-center justify-center text-white text-xl px-4 w-full">
      <div className="flex flex-start w-14">
        <Toggle changeToggle={changeDarkMode} checked={colorTheme === 'light'} />
      </div>
      <p className="text-center flex-1 mr-14">
        {'Information for league: '}
        {' '}
        <span className="font-extrabold">{headerText}</span>
      </p>
    </header>

  );
}

export default Header;
