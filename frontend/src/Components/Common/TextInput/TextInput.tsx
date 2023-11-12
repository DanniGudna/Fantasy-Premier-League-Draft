import 'tailwindcss/tailwind.css';

import React, { ReactElement } from 'react';

import { TextFieldType } from '../../../interfaces/Generic';

interface IProps {
  title: string;
  placeholder: string;
  helpText: string;
  textInputValue: string;
  updateValue(value: string): void;
  inputType: TextFieldType;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function TextInput({ title, placeholder, helpText, textInputValue, updateValue, inputType, onKeyDown }: IProps): ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="league number" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400">{title}</label>
      <div className="mt-2">
        <input
          type={inputType}
          name="league number"
          id="leagueNumber"
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          aria-describedby="leagueNumber-description"
          value={textInputValue}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="leagueNumber-description">{helpText}</p>
    </div>

  );
}

export default TextInput;
