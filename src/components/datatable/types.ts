import { WineData } from '../../features/wine/wineAPI';
import { Sorted } from '../../utils/sorting';

export type Data = WineData;
export type Key = keyof Data;

export interface SortedByKey {
  direction: Sorted,
  key?: Key
}

export interface Header {
  key: Key;
  text: string
}
