import { PageType } from '../interfaces/Generic';
import { IDraftSeason } from '../interfaces/League';

export const PAGES = [
  {
    type: PageType.Stats,
    playerSpecific: true,
    name: 'Stats',
  },
  {
    type: PageType.LeagueTable,
    playerSpecific: false,
    name: 'League Table',
  },
  {
    type: PageType.Charts,
    playerSpecific: true,
    name: 'Charts',
  },
  {
    type: PageType.Draft,
    playerSpecific: false, // todo
    name: 'Draft',
  },
  {
    type: PageType.Transactions,
    playerSpecific: true, // todo
    name: 'Transactions',
  },
];

/* export const draftPlayersPerSeason: IDraftPlayersPerSeason =
{
  // 2022/2023 season
  46795: [
    {
      entry_name: "3rd Time's the Charm",
      playerName: 'Daníel Guðnason',
      id: 182079,
    },
    {
      entry_name: 'Respect the Frændi',
      playerName: 'Vésteinn Bjarnason',
      id: 191447,
    } as DraftPlayerSubset,
    {
      entry_name: 'Gömlu Nettustu',
      playerName: 'Hjalmar Egilsson',
      id: 467444,
    } as DraftPlayerSubset,
    {
      entry_name: 'Töfradrengirnir',
      playerName: 'Eggert Ólafur Árnason',
      id: 517156,
    } as DraftPlayerSubset,
  ],
  // 2023/2024 season
  48617: [
    {
      entry_name: 'The Lads',
      playerName: 'Daníel Guðnason',
      id: 183552,
    } as DraftPlayerSubset,
    {
      entry_name: 'Bufft loosers',
      playerName: 'Vésteinn Bjarnason',
      id: 183942,
    } as DraftPlayerSubset,
    {
      entry_name: 'Guð blessi',
      playerName: 'Hjalmar Egilsson',
      id: 188151,
    } as DraftPlayerSubset,
    {
      entry_name: 'Töfradrengirnir',
      playerName: 'Eggert Ólafur Árnason',
      id: 252925,
    } as DraftPlayerSubset,
  ],
};
*/
export const SEASONS: IDraftSeason[] = [
  {
    leagueName: 'BanterLads 3 Return of the Lad',
    leagueId: 46795,
    seasonName: '22/23 Season',
    currentSeason: false,
  },
  {
    leagueName: 'Banter Lad 4: A new Lad',
    leagueId: 48617,
    seasonName: '23/24 Season',
    currentSeason: true,
  },
];

export const ENTIRE_LEAGUE_NAME_IN_HEADER = 'Entire League';
