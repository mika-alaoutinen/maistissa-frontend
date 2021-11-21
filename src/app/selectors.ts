import { SortedByKey } from '../components/datatable/types';
import { Review } from '../features/review/reviewAPI';
import { Wine } from '../features/wine/wineAPI';
import { RootState } from './store';

const selectReviews = (state: RootState): Review[] => state.reviews.reviews;
const selectWines = (state: RootState): Wine[] => state.wines.wines;
const selectWinesSorted = (state: RootState): SortedByKey => state.wines.sorted;

export { selectReviews, selectWines, selectWinesSorted };
