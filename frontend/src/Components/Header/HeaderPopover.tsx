import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, ReactElement, useContext } from 'react';

import { LeagueContext } from '../../App';
import { PageType } from '../../interfaces/Generic';
import { ENTIRE_LEAGUE_NAME_IN_HEADER } from '../../Utils/StaticObjects';
import HeaderFilterItem from './HeaderFilterItem';

interface IProps {
  pageName: string;
  pageType: PageType;
}

function HeaderPopover({ pageName, pageType }: IProps): ReactElement {
  const { draftPlayers, seasonName } = useContext(LeagueContext);

  return (
    <Popover className="self-center">
      <Popover.Button className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-text dark:text-darkmode-text self-center">
        {pageName}
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
          {({ close }) => (
            <div className="mx-auto grid max-w-8xl grid-cols-5 gap-x-2 px-6 py-6 lg:px-8 xl:gap-x-6">
              <HeaderFilterItem name={seasonName} type={pageType} teamName={ENTIRE_LEAGUE_NAME_IN_HEADER} close={close} />
              {draftPlayers.map((draftPlayer) => (
                <HeaderFilterItem
                  draftPlayerId={draftPlayer.id}
                  type={pageType}
                  name={draftPlayer.firstName}
                  teamName={draftPlayer.teamName}
                  key={draftPlayer.id}
                  close={close}
                />
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default HeaderPopover;
