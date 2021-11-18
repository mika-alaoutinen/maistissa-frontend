import { Review } from '../features/review/reviewAPI';
import { Wine } from '../features/wine/wineAPI';
import { WinesSorted } from '../utils/sorting';
import { RootState } from './store';

const selectReviews = (state: RootState): Review[] => state.reviews.reviews;
const selectWines = (state: RootState): Wine[] => state.wines.wines;
const selectWinesSorted = (state: RootState): WinesSorted => state.wines.sorted;

export { selectReviews, selectWines, selectWinesSorted };
