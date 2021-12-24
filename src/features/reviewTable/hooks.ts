import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReviews } from '../../app/selectors';
import { SortedByKey } from '../../components/datatable/types';
import { Review } from '../../api/reviewAPI';
import { Payload, sortAsc, sortDesc } from '../../app/reviewSlice';

type Key = keyof Review;
type SortingFn = (key: Key) => Payload;

/**
 * Selects a sorting function for an ascending or a descending sort.
 * @param property to sort by.
 * @param current sort.
 * @returns a sorting function.
 */
const selectSortingFn = (
  property: Key,
  { key, direction }: SortedByKey<Review, Key>,
): Payload => (property === key && direction === 'asc'
  ? sortDesc(property)
  : sortAsc(property));

/**
 * A hook for dispatching a sorting action to the Redux store.
 * @returns a sorting function that takes a Key key as an argument.
 */
export const useSorting = (): SortingFn => {
  const dispatch = useAppDispatch();
  const { sorted } = useAppSelector(selectReviews);
  return (key: Key) => dispatch(selectSortingFn(key, sorted));
};

export default { useSorting };
