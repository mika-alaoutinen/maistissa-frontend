import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectWinesSorted } from '../../../app/selectors';
import { SortedByKey } from '../../../components/datatable/types';
import { Sorted } from '../../../utils/sorting';
import { WineProps } from '../wineAPI';
import { sortAsc, sortDesc } from '../wineSlice';

type SortingFn = (key: WineProps) => PayloadAction<WineProps>;

/**
 * Selects a sorting function for an ascending or a descending sort.
 * @param property to sort by.
 * @param current sort.
 * @returns a sorting function.
 */
const selectSortingFn = (
  property: WineProps, { key, direction }: SortedByKey,
): PayloadAction<WineProps> => (property === key && direction === 'asc'
  ? sortDesc(property)
  : sortAsc(property));

/**
 * A hook for dispatching a sorting action to the Redux store.
 * @returns a sorting function that takes a WineProps key as an argument.
 */
export const useSorting = (): SortingFn => {
  const dispatch = useAppDispatch();
  const sorted = useAppSelector(selectWinesSorted);
  return (property: WineProps) => dispatch(selectSortingFn(property, sorted));
};

type SortDirectionFn = (key: WineProps) => Sorted;

/**
 * A hook for finding out the correct sort direction for a Wine key.
 * @returns function that takes a WineProps key as an argument and returns a Sorted type.
 */
export const useSortDirection = (): SortDirectionFn => {
  const { direction, key } = useAppSelector(selectWinesSorted);
  return (property: WineProps) => (key === property ? direction : 'unsorted');
};

export default { useSorting };
