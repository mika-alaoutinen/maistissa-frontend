import { SortedByKey } from '../components/datatable/types';
import { Review } from '../features/review/reviewAPI';
import { Wine } from '../features/wine/wineAPI';
import { RootState } from './store';

const selectReviews = (state: RootState): Review[] => state.reviews.reviews;
const selectWines = (state: RootState): Wine[] => state.wines.wines;
const selectReviewsSorted = (
  state: RootState,
): SortedByKey<Review, keyof Review> => state.reviews.sorted;
const selectWinesSorted = (state: RootState): SortedByKey<Wine, keyof Wine> => state.wines.sorted;

export {
  selectReviews, selectReviewsSorted, selectWines, selectWinesSorted,
};
