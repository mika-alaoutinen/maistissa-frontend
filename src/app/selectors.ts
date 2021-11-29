import { SortedByKey } from '../components/datatable/types';
import { Review } from '../features/review/reviewAPI';
import { Wine } from '../features/wine/wineAPI';
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
const selectWineCountries = (state: RootState): string[] => state.wineInfo.countries;
const selectWineDescriptions = (state: RootState): string[] => state.wineInfo.descriptions;
const selectWineFoorPairings = (state: RootState): string[] => state.wineInfo.foodPairings;

export {
  selectReviews,
  selectReviewsSorted,
  selectWines,
  selectWinesSorted,
  selectWineCountries,
  selectWineDescriptions,
  selectWineFoorPairings,
};
