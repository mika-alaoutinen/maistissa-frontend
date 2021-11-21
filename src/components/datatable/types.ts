import { Sorted } from '../../utils/sorting';

export interface Identifiable {
  id: number | string;
}

export type Column<T, K extends keyof T> = {
  key: K;
  header: string;
};

export interface SortedByKey<T, K extends keyof T> {
  direction: Sorted,
  key?: K
}
