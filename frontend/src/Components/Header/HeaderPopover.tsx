import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, ReactElement } from 'react';
import { useParams } from 'react-router';

import { PageType, PageTypeNames } from '../../interfaces/Generic';
import { draftPlayersPerSeason, ENTIRE_LEAGUE_NAME_IN_HEADER } from '../../Utils/StaticObjects';
import HeaderFilterItem from './RadioButtons/HeaderFilterItem';

interface IProps {
  pageName: PageType;
  leagueId: number;
}

function Footer({ pageName, leagueId }: IProps): ReactElement {
  console.log('🚀 ~ file: HeaderPopover.tsx:16 ~ Footer ~ leagueId:', leagueId);
  return (
    <Popover>
      <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-text dark:text-darkmode-text">
        {PageTypeNames[pageName]}
        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-background dark:bg-darkmode-background pt-14 shadow-lg ring-1 ring-gray-900/5">
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
            <HeaderFilterItem name={ENTIRE_LEAGUE_NAME_IN_HEADER} type={pageName} teamName={leagueId.toString()} />
            {draftPlayersPerSeason[leagueId].map((draftPlayer) => (
              <HeaderFilterItem
                draftPlayerId={draftPlayer.id}
                type={pageName}
                name={draftPlayer.playerName}
                teamName={draftPlayer.entry_name}
              />
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Footer;
