/* eslint-disable jsx-a11y/label-has-associated-control */
import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

type IProps = {
  changeToggle(): void,
  checked?: boolean
};

function Toggle({ changeToggle, checked }: IProps): ReactElement {
  return (
    <div>
      <label htmlFor="darkmode-toggle" className="flex items-center cursor-pointer relative">
        <input type="checkbox" id="darkmode-toggle" className="sr-only" checked={checked} onChange={changeToggle} />
        <button
          type="button"
          id="darkmode-toggle"
          onClick={changeToggle}
          className="toggle-bg bg-white dark:bg-black border-blueBash border-2 h-7 w-14 rounded-full"
        >
          <div className="flex flex-row flex-between justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

          </div>

        </button>
      </label>
    </div>
  );
}
export default Toggle;
