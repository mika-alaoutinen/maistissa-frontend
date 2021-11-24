import { Review } from '../features/review/reviewAPI';

export type Sorted = 'asc' | 'desc' | 'unsorted';

/**
 * A generic sorting function for an array of arbitrary objects.
 * @param data array of objects
 * @param key to sort objects by
 * @param direction ASC or DESC
 * @returns new sorted array
 */
const sortArray = <T>(
  data: T[],
  key: keyof T,
  direction: 'ASC' | 'DESC',
): T[] => {
  const compare = (a: T, b: T): number => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) {
      return 0;
    }

    if (valueA > valueB) {
      return direction === 'ASC' ? 1 : -1;
    }

    return direction === 'ASC' ? -1 : 1;
  };

  return data.slice().sort(compare);
};

export const sortAscending = <T>(data: T[], key: keyof T): T[] => sortArray(data, key, 'ASC');
export const sortDescending = <T>(data: T[], key: keyof T): T[] => sortArray(data, key, 'DESC');

export const sortByWineName = (reviews: Review[], direction: 'ASC' | 'DESC'): Review[] => {
  const compare = (a: Review, b: Review): number => {
    const valueA = a.wine?.name ?? '';
    const valueB = b.wine?.name ?? '';

    if (valueA === valueB) {
      return 0;
    }

    if (valueA > valueB) {
      return direction === 'ASC' ? 1 : -1;
    }

    return direction === 'ASC' ? -1 : 1;
  };

  return reviews.slice().sort(compare);
};
