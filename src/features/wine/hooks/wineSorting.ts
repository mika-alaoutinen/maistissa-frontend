import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectWinesSorted } from '../../../app/selectors';
import { WinesSorted } from '../../../utils/sorting';
import { WineProps } from '../wineAPI';
import { sortAsc, sortDesc } from '../wineSlice';

type SortingFn = (key: WineProps) => void;

/**
 * Selects a sorting function for an ascending or a descending sort.
 * @param property to sort by.
 * @param current sort.
 * @returns a sorting function.
 */
const selectSortingFn = (
  property: WineProps, { key, direction }: WinesSorted,
): PayloadAction<WineProps> => {
  if (property === key) {
    return direction === 'asc' ? sortDesc(key) : sortAsc(key);
  }
  // Use ascending sort by default
  return sortAsc(property);
};

/**
 * A hook for dispatching a sorting action to the Redux store.
 * @returns a sorting function that takes a WineProps key as an argument.
 */
export const useSorting = (): SortingFn => {
  const dispatch = useAppDispatch();
  const sorted = useAppSelector(selectWinesSorted);
  return (property: WineProps) => dispatch(selectSortingFn(property, sorted));
};

export default { useSorting };
