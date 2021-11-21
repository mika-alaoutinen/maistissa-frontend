import { RootState } from '../../app/store';
import { WineData } from '../../features/wine/wineAPI';
import { Sorted } from '../../utils/sorting';

export type Data = WineData;
export type Key = keyof Data;

interface SortedByKey {
  direction: Sorted,
  key?: Key
}

export type Selector = (state: RootState) => SortedByKey;

export interface Header {
  key: Key;
  text: string
}
