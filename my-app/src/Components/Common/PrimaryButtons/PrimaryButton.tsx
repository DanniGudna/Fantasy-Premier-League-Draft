import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

interface IProps {
  buttonText: string;
  handleClick(): void;
  isButtonDisabled: boolean;
}

function PrimaryButton({ buttonText, handleClick, isButtonDisabled }: IProps): ReactElement {
  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => {
        handleClick();
      }}
      disabled={isButtonDisabled}
    >
      {buttonText}

    </button>

  );
}

export default PrimaryButton;
