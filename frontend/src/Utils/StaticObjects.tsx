import { PageType } from '../interfaces/Generic';
import { DraftPlayerSubset, IDraftPlayersPerSeason } from '../interfaces/League';

export const pages = [
  {
    name: PageType.Stats,
    playerSpecific: true,
  },
  {
    name: PageType.LeagueTable,
    playerSpecific: false,
  },
  {
    name: PageType.Charts,
    playerSpecific: true,
  },
  {
    name: PageType.Draft,
    playerSpecific: false, // todo
  },
  {
    name: PageType.Transactions,
    playerSpecific: true, // todo
  },
];

export const draftPlayersPerSeason: IDraftPlayersPerSeason =
{
  // 2022/2023 season
  46795: [
    {
      entry_name: "3rd Time's the Charm",
      playerName: 'Daníel Guðnason',
      id: 182079,
    } as DraftPlayerSubset,
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

export const ENTIRE_LEAGUE_NAME_IN_HEADER = 'Entire League';
