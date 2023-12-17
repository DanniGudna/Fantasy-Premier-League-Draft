export type TextFieldType = 'email' | 'text' | 'tel' | 'number';

export type LeagueMovementDirections = 'up' | 'down' | 'noChange';

export type ChevronDirection = 'up' | 'down';

// export type PageType = 'leagueTable' | 'stats' | 'charts' | 'draft' | 'transactions'; // TODO confirm this is correct
// todo cleanup these types and add it to static objects
export enum PageType {
  LeagueTable = 'leagueTable',
  Stats = 'stats',
  Charts = 'charts',
  Draft = 'draft',
  Transactions = 'transactions',
  Form = 'form',
  H2H = 'H2H'
  // tbd
}

// this is currently no used
export const PageTypeNames: Record<PageType, string> = {
  [PageType.LeagueTable]: 'Tables',
  [PageType.Stats]: 'Stat Page',
  [PageType.Charts]: 'Charts',
  [PageType.Draft]: 'Draft Page',
  [PageType.Transactions]: 'Transaction Page',
  [PageType.Form]: 'Form Page',
  [PageType.H2H]: 'Head 2 Head',
};

// export default TextFieldType;
