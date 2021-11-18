import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectWinesSorted } from '../../../app/selectors';
import { WineProps } from '../wineAPI';
import { sortAsc, sortDesc } from '../wineSlice';

type SortingFn = (key: WineProps) => void;

export const useSortingFn = (): SortingFn => {
  const dispatch = useAppDispatch();
  const { direction } = useAppSelector(selectWinesSorted);

  return direction === 'asc'
    ? (key: WineProps) => dispatch(sortDesc(key))
    : (key: WineProps) => dispatch(sortAsc(key));
};

export default { useSortingFn };
