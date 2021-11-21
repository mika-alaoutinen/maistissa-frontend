import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectWinesSorted } from '../../../app/selectors';
import { SortedByKey } from '../../../components/datatable/types';
import { Sorted } from '../../../utils/sorting';
import { Wine } from '../wineAPI';
import { sortAsc, sortDesc } from '../wineSlice';

type Key = keyof Wine;
type SortingFn = (key: Key) => PayloadAction<Key>;

/**
 * Selects a sorting function for an ascending or a descending sort.
 * @param property to sort by.
 * @param current sort.
 * @returns a sorting function.
 */
const selectSortingFn = (
  property: Key,
  { key, direction }: SortedByKey<Wine, Key>,
): PayloadAction<Key> => (property === key && direction === 'asc'
  ? sortDesc(property)
  : sortAsc(property));

/**
 * A hook for dispatching a sorting action to the Redux store.
 * @returns a sorting function that takes a Key key as an argument.
 */
export const useSorting = (): SortingFn => {
  const dispatch = useAppDispatch();
  const sorted = useAppSelector(selectWinesSorted);
  return (property: Key) => dispatch(selectSortingFn(property, sorted));
};

type SortDirectionFn = (key: Key) => Sorted;

/**
 * A hook for finding out the correct sort direction for a Wine key.
 * @returns function that takes a Key key as an argument and returns a Sorted type.
 */
export const useSortDirection = (): SortDirectionFn => {
  const { direction, key } = useAppSelector(selectWinesSorted);
  return (property: Key) => (key === property ? direction : 'unsorted');
};

export default { useSorting };
