import 'tailwindcss/tailwind.css';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, ReactElement, useContext } from 'react';

import { LeagueContext } from '../../App';
import { SEASONS } from '../../Utils/StaticObjects';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function LeaguePicker(): ReactElement {
  const { changeSeason, leagueName, leagueId, seasonName } = useContext(LeagueContext);

  const newSeasonSelected = (selectedLeagueId: number) => {
    changeSeason(selectedLeagueId);
  };

  return (
    <Listbox value={leagueId} onChange={newSeasonSelected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative self-center text-lg font-semibold w-full cursor-default rounded-md bg-background dark:bg-darkmode-background py-1.5 pl-3 pr-10 text-left text-gray-900 dark:text-darkmode-text shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <span className="block truncate">{`${leagueName} - ${seasonName}`}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background dark:bg-darkmode-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {SEASONS.map((season) => (
                <Listbox.Option
                  key={season.leagueId}
                  className={({ active }) => classNames(
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  )}
                  value={season.leagueId}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {`${season.leagueName} - ${season.seasonName}`}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>

  );
}

export default LeaguePicker;
