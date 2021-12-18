import { SortedByKey } from '../components/datatable/types';
import { Review } from '../features/review/reviewAPI';
import { Wine } from '../features/wine/wineAPI';
import { WineInfoState } from '../features/wineInfo/wineInfoSlice';
import { RootState } from './store';

// Reviews
const selectReviews = (state: RootState): Review[] => state.reviews.reviews;
const selectReviewsSorted = (
  state: RootState,
): SortedByKey<Review, keyof Review> => state.reviews.sorted;

// Wines
const selectWines = (state: RootState): Wine[] => state.wines.wines;
const selectWinesSorted = (state: RootState): SortedByKey<Wine, keyof Wine> => state.wines.sorted;

// Wine info
const selectWineInfo = (state: RootState): WineInfoState => state.wineInfo;

export {
  selectReviews,
  selectReviewsSorted,
  selectWines,
  selectWinesSorted,
  selectWineInfo,
};
