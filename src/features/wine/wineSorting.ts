import { Wine } from './wineAPI';

export type WineProps = 'name' | 'type' | 'country' | 'volume' | 'price';
export type SortType = 'ASC' | 'DESC';

const sortAsc = (a: Wine, b: Wine, key: WineProps): number => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

const sortAscending = (key: WineProps, wines: Wine[]): Wine[] => wines
  .slice()
  .sort((w1, w2) => sortAsc(w1, w2, key));

const sortDesc = (a: Wine, b: Wine, key: WineProps): number => {
  if (a[key] < b[key]) return 1;
  if (a[key] > b[key]) return -1;
  return 0;
};

const sortDescending = (key: WineProps, wines: Wine[]): Wine[] => wines
  .slice()
  .sort((w1, w2) => sortDesc(w1, w2, key));

export const sortWines = (wines: Wine[], key: WineProps, sortType: SortType): Wine[] => (sortType === 'ASC'
  ? sortAscending(key, wines)
  : sortDescending(key, wines));

export default { sortWines };
