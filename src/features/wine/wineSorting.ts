import { Wine } from './wineAPI';

export type WineProps = 'name' | 'type' | 'country' | 'volume' | 'price';

const sortAsc = (a: Wine, b: Wine, key: WineProps): number => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

export const sortAscending = (wines: Wine[], sortBy: WineProps): Wine[] => wines
  .slice()
  .sort((w1, w2) => sortAsc(w1, w2, sortBy));

const sortDesc = (a: Wine, b: Wine, key: WineProps): number => {
  if (a[key] < b[key]) return 1;
  if (a[key] > b[key]) return -1;
  return 0;
};

export const sortDescending = (wines: Wine[], sortBy: WineProps): Wine[] => wines
  .slice()
  .sort((w1, w2) => sortDesc(w1, w2, sortBy));

export default { sortAscending, sortDescending };
